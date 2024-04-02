import { ConvexError, v } from 'convex/values';
import { omit } from 'convex-helpers';

import { mutation, query } from './_generated/server';
import { accessToProject } from './projects';
import { References } from './schema';

export const getReferences = query({
  args: { projectId: v.id('projects') },
  handler: async (ctx, args) => {
    const hasAccess = await accessToProject(ctx, args.projectId);

    if (!hasAccess) return [];

    const references = await ctx.db
      .query('references')
      .withIndex('by_projectId_pinned', q => q.eq('projectId', args.projectId))
      .collect();

    return references.sort((a, b) => Number(b.isPinned) - Number(a.isPinned));
  },
});

export const createReference = mutation({
  args: {
    projectId: v.id('projects'),
    referenceData: v.object(
      omit(References.withoutSystemFields, ['isPinned', 'projectId'])
    ),
  },
  handler: async (ctx, args) => {
    const hasAccess = await accessToProject(ctx, args.projectId);

    if (!hasAccess) throw new ConvexError('You can not perform this action');

    await ctx.db.insert('references', {
      ...args.referenceData,
      projectId: args.projectId,
      isPinned: false,
    });
  },
});

export const updateReference = mutation({
  args: {
    referenceData: v.object(References.withoutSystemFields),
    projectId: v.id('projects'),
    referenceId: v.id('references'),
  },
  handler: async (ctx, args) => {
    const hasAccess = await accessToProject(ctx, args.projectId);

    if (!hasAccess) throw new ConvexError('You can not perform this action');

    await ctx.db.patch(args.referenceId, { ...args.referenceData });
  },
});

export const togglePin = mutation({
  args: {
    referenceId: v.id('references'),
    projectId: v.id('projects'),
    value: v.boolean(),
  },
  handler: async (ctx, args) => {
    const hasAccess = await accessToProject(ctx, args.projectId);

    if (!hasAccess) throw new ConvexError('You can not perform this action');

    await ctx.db.patch(args.referenceId, { isPinned: args.value });
  },
});

export const deleteReference = mutation({
  args: { referenceId: v.id('references'), projectId: v.id('projects') },
  handler: async (ctx, args) => {
    const hasAccess = await accessToProject(ctx, args.projectId);

    if (!hasAccess) throw new ConvexError('You can not perform this action');

    await ctx.db.delete(args.referenceId);
  },
});
