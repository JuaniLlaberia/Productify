import { ConvexError, v } from 'convex/values';
import { paginationOptsValidator } from 'convex/server';

import { mutation, query } from './_generated/server';
import { accessToProject } from './projects';

export const getReports = query({
  args: {
    projectId: v.id('projects'),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const hasAccess = await accessToProject(ctx, args.projectId);
    if (!hasAccess)
      throw new ConvexError('You do not have access to this data');

    const reports = await ctx.db
      .query('reports')
      .withIndex('by_projectId', q => q.eq('projectId', args.projectId))
      .paginate(args.paginationOpts);

    return reports;
  },
});

export const createReport = mutation({
  args: {
    projectId: v.id('projects'),
    reportData: v.object({
      name: v.string(),
      description: v.string(),
      importance: v.union(
        v.literal('urgent'),
        v.literal('important'),
        v.literal('moderate')
      ),
      type: v.union(
        v.literal('ui/ux'),
        v.literal('functional'),
        v.literal('performance'),
        v.literal('security'),
        v.literal('other')
      ),
    }),
  },
  handler: async (ctx, args) => {
    const hasAccess = await accessToProject(ctx, args.projectId);
    if (!hasAccess) throw new ConvexError('You can not do this action');

    await ctx.db.insert('reports', {
      ...args.reportData,
      projectId: args.projectId,
    });
  },
});

export const updateReport = mutation({
  args: {
    projectId: v.id('projects'),
    reportData: v.object({
      _id: v.id('reports'),
      name: v.string(),
      description: v.string(),
      importance: v.union(
        v.literal('urgent'),
        v.literal('important'),
        v.literal('moderate')
      ),
      type: v.union(
        v.literal('ui/ux'),
        v.literal('functional'),
        v.literal('performance'),
        v.literal('security'),
        v.literal('other')
      ),
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
      importance: report?.importance || 'important',
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
