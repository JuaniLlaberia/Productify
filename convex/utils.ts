import { ConvexError, v } from 'convex/values';
import { mutation } from './_generated/server';

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
