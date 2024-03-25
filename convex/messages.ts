import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { accessToProject } from './projects';

export const getMessages = query({
  args: { projectId: v.id('projects') },
  handler: async (ctx, args) => {
    const hasAccess = await accessToProject(
      ctx,
      args.projectId,
      'juanillaberia2002@gmail.com'
    );

    if (!hasAccess) return [];

    const messages = await ctx.db
      .query('messages')
      .withIndex('by_projectId', q => q.eq('projectId', args.projectId))
      .order('asc')
      .collect();

    const messageWithUser = Promise.all(
      messages.map(async msg => {
        const userData = await ctx.db.get(msg.sendBy);
        return {
          ...msg,
          sendBy: {
            ...userData,
          },
        };
      })
    );

    return messageWithUser;
  },
});

export const sendMessage = mutation({
  args: {
    data: v.string(),
    projectId: v.id('projects'),
    parentMessageId: v.optional(v.id('messages')),
    // type: v.union(
    //   v.literal('message'),
    //   v.literal('image'),
    //   v.literal('reference')
    // ),
  },
  handler: async (ctx, args) => {
    const hasAccess = await accessToProject(
      ctx,
      args.projectId,
      'juanillaberia2002@gmail.com'
    );

    if (!hasAccess) throw new ConvexError('You can not perform this action');

    await ctx.db.insert('messages', {
      ...args,
      type: 'message',
      sendBy: hasAccess._id,
      edited: false,
    });
  },
});
