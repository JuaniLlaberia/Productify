import { ConvexError, v } from 'convex/values';
import { paginationOptsValidator } from 'convex/server';

import { mutation, query } from './_generated/server';
import { accessToProject } from './projects';
import { Reports } from './schema';

export const getReports = query({
  args: {
    projectId: v.id('projects'),
    filters: v.object({
      type: v.optional(v.string()),
      priority: v.optional(v.string()),
    }),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const hasAccess = await accessToProject(ctx, args.projectId);
    if (!hasAccess)
      throw new ConvexError('You do not have access to this data');

    let query = ctx.db
      .query('reports')
      .withIndex('by_projectId', q => q.eq('projectId', args.projectId));

    if (args.filters.type !== 'all')
      query = query.filter(q => q.eq(q.field('type'), args.filters.type));

    if (args.filters.priority !== 'all')
      query = query.filter(q =>
        q.eq(q.field('importance'), args.filters.priority)
      );

    const reports = await query.paginate(args.paginationOpts);

    return reports;
  },
});

export const createReport = mutation({
  args: Reports.withoutSystemFields,
  handler: async (ctx, args) => {
    const hasAccess = await accessToProject(ctx, args.projectId);
    if (!hasAccess) throw new ConvexError('You can not do this action');

    await ctx.db.insert('reports', {
      ...args,
      projectId: args.projectId,
    });
  },
});

export const updateReport = mutation({
  args: {
    projectId: v.id('projects'),
    reportData: v.object({
      ...Reports.withoutSystemFields,
      _id: v.id('reports'),
    }),
  },
  handler: async (ctx, args) => {
    const hasAccess = await accessToProject(ctx, args.projectId);
    if (!hasAccess) throw new ConvexError('You can not do this action');

    await ctx.db.patch(args.reportData._id, {
      ...args.reportData,
    });
  },
});

export const reportToTask = mutation({
  args: { projectId: v.id('projects'), reportId: v.id('reports') },
  handler: async (ctx, args) => {
    const hasAccess = await accessToProject(ctx, args.projectId);
    if (!hasAccess) throw new ConvexError('You can not do this action');

    const report = await ctx.db.get(args.reportId);

    await ctx.db.insert('tasks', {
      title: report?.name || 'Untitled',
      status: 'pending',
      description: report?.description || '',
      importance: report?.importance || 'p-2',
      tag: 'fix',
      assignedTo: hasAccess._id,
      projectId: args.projectId,
    });

    await ctx.db.delete(args.reportId);
  },
});

export const deleteReport = mutation({
  args: { projectId: v.id('projects'), reportId: v.id('reports') },
  handler: async (ctx, args) => {
    const hasAccess = await accessToProject(ctx, args.projectId);
    if (!hasAccess) throw new ConvexError('You can not do this action');

    await ctx.db.delete(args.reportId);
  },
});
