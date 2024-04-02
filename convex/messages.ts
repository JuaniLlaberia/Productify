import { ConvexError, v } from 'convex/values';
import { paginationOptsValidator } from 'convex/server';
import { omit } from 'convex-helpers';

import { mutation, query } from './_generated/server';
import { accessToProject } from './projects';
import { Messages } from './schema';

export const getMessages = query({
  args: {
    projectId: v.id('projects'),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const hasAccess = await accessToProject(ctx, args.projectId);

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
  // args: Messages.withoutSystemFields,
  args: omit(Messages.withoutSystemFields, ['sendBy']),
  handler: async (ctx, args) => {
    const hasAccess = await accessToProject(ctx, args.projectId);

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
    const hasAccess = await accessToProject(ctx, args.projectId);

    if (!hasAccess) throw new ConvexError('You can not perform this action');

    //If message contains image => delete image from bucket

    await ctx.db.delete(args.messageId);
  },
});
