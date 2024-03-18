import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .filter(q => q.eq(q.field('email'), args.email))
      .unique();

    return user;
  },
});

export const createUser = mutation({
  args: { name: v.string(), email: v.string(), defaultImg: v.string() },
  handler: async (ctx, args) => {
    const newUserId = await ctx.db.insert('users', {
      name: args.name,
      email: args.email,
      profileImg: args.defaultImg,
    });

    return newUserId;
  },
});
