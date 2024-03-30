import { ConvexError, v } from 'convex/values';
import { internalMutation, query } from './_generated/server';
import { isAuth } from './projects';

export const getAuthUser = query({
  args: {},
  handler: async ctx => {
    const user = await isAuth(ctx);

    if (!user) null;

    return user;
  },
});

export const createUser = internalMutation({
  args: {
    name: v.string(),
    email: v.string(),
    defaultImg: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const newUserId = await ctx.db.insert('users', {
      name: args.name,
      email: args.email,
      profileImg: args.defaultImg,
      clerkIdentifier: args.clerkId,
    });

    return newUserId;
  },
});

export const updateUser = internalMutation({
  args: {
    name: v.string(),
    email: v.string(),
    defaultImg: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', q => q.eq('clerkIdentifier', args.clerkId))
      .first();

    if (!user) throw new ConvexError('User not found');

    await ctx.db.patch(user._id, {
      name: args.name,
      email: args.email,
      profileImg: args.defaultImg,
    });
  },
});

export const deleteUser = internalMutation({
  args: { clerkId: v.string() },
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
