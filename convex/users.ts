import { ConvexError } from 'convex/values';

import { internalMutation, query } from './_generated/server';
import { isAuth } from './projects';
import { Users } from './schema';

export const getAuthUser = query({
  args: {},
  handler: async ctx => {
    const user = await isAuth(ctx);

    if (!user) null;

    return user;
  },
});

export const createUser = internalMutation({
  args: Users.withoutSystemFields,
  handler: async (ctx, args) => {
    const newUserId = await ctx.db.insert('users', {
      name: args.name,
      email: args.email,
      profileImg: args.profileImg,
      clerkIdentifier: args.clerkIdentifier,
    });

    return newUserId;
  },
});

export const updateUser = internalMutation({
  args: Users.withoutSystemFields,
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', q =>
        q.eq('clerkIdentifier', args.clerkIdentifier)
      )
      .first();

    if (!user) throw new ConvexError('User not found');

    await ctx.db.patch(user._id, {
      name: args.name,
      email: args.email,
      profileImg: args.profileImg,
    });
  },
});

export const deleteUser = internalMutation({
  args: { clerkId: Users.withoutSystemFields.clerkIdentifier },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', q => q.eq('clerkIdentifier', args.clerkId))
      .first();

    if (!user) throw new ConvexError('User not found');

    //Delete user from DB
    await ctx.db.delete(user._id);

    //Debe user from projects
    const memberProjectToDelete = await ctx.db
      .query('project_members')
      .withIndex('by_userId', q => q.eq('userId', user._id))
      .collect();

    await Promise.all(memberProjectToDelete.map(doc => ctx.db.delete(doc._id)));
  },
});
