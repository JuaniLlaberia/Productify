import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { isAuth } from './projects';

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

export const generateUploadUrl = mutation(async ctx => {
  return await ctx.storage.generateUploadUrl();
});

export const generateDownloadUrl = mutation({
  args: { storageId: v.id('_storage') },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    if (!url) throw new ConvexError('Failed to get download url');

    return url;
  },
});

export const updateUser = mutation({
  args: {
    userEmail: v.string(),
    data: v.object({
      name: v.optional(v.string()),
      profileImg: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const user = await isAuth(ctx, args.userEmail);

    if (!user) throw new ConvexError('Must be logged in');

    const data = args.data.name
      ? { name: args.data.name }
      : { profileImg: args.data.profileImg };

    await ctx.db.patch(user._id, data);
  },
});

export const deleteUser = mutation({
  args: { userEmail: v.string() },
  handler: async (ctx, args) => {
    const user = await isAuth(ctx, args.userEmail);

    if (!user) throw new ConvexError('Must be logged in');

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
