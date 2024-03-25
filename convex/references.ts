import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { accessToProject } from './projects';

export const getReferences = query({
  args: { projectId: v.id('projects') },
  handler: async (ctx, args) => {
    const hasAccess = await accessToProject(
      ctx,
      args.projectId,
      'juanillaberia2002@gmail.com'
    );

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
    referenceData: v.object({
      name: v.string(),
      reference: v.string(),
      type: v.union(
        v.literal('github'),
        v.literal('gitlab'),
        v.literal('stackoverflow'),
        v.literal('documentation'),
        v.literal('other')
      ),
    }),
  },
  handler: async (ctx, args) => {
    const hasAccess = await accessToProject(
      ctx,
      args.projectId,
      'juanillaberia2002@gmail.com'
    );

    if (!hasAccess) throw new ConvexError('You can not perform this action');

    await ctx.db.insert('references', {
      ...args.referenceData,
      projectId: args.projectId,
      isPinned: false,
    });
  },
});

export const deleteReference = mutation({
  args: { referenceId: v.id('references'), projectId: v.id('projects') },
  handler: async (ctx, args) => {
    const hasAccess = await accessToProject(
      ctx,
      args.projectId,
      'juanillaberia2002@gmail.com'
    );

    if (!hasAccess) throw new ConvexError('You can not perform this action');

    await ctx.db.delete(args.referenceId);
  },
});
