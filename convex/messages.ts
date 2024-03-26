import { ConvexError, v } from 'convex/values';
import { paginationOptsValidator } from 'convex/server';

import { mutation, query } from './_generated/server';
import { accessToProject } from './projects';

export const getMessages = query({
  args: {
    projectId: v.id('projects'),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const hasAccess = await accessToProject(
      ctx,
      args.projectId,
      'juanillaberia2002@gmail.com'
    );

    if (!hasAccess)
      throw new ConvexError('You do not have access to this data');

    const messages = await ctx.db
      .query('messages')
      .withIndex('by_projectId', q => q.eq('projectId', args.projectId))
      .order('desc')
      .paginate(args.paginationOpts);

    return {
      ...messages,
      page: await Promise.all(
        messages.page.map(async msg => {
          const userData = await ctx.db.get(msg.sendBy);
          return {
            ...msg,
            sendBy: {
              ...userData,
            },
          };
        })
      ),
    };
  },
});

export const sendMessage = mutation({
  args: {
    data: v.string(),
    projectId: v.id('projects'),
    parentMessageId: v.optional(v.id('messages')),
    type: v.union(v.literal('message'), v.literal('image')),
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

      sendBy: hasAccess._id,
    });
  },
});

export const deleteMessage = mutation({
  args: {
    projectId: v.id('projects'),
    messageId: v.id('messages'),
  },
  handler: async (ctx, args) => {
    const hasAccess = await accessToProject(
      ctx,
      args.projectId,
      'juanillaberia2002@gmail.com'
    );

    if (!hasAccess) throw new ConvexError('You can not perform this action');

    await ctx.db.delete(args.messageId);
  },
});
