import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { adminOnly, isAuth } from './projects';

export const getUserInvitations = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await isAuth(ctx);

    if (!user) return [];

    const invitations = await ctx.db
      .query('invitations')
      .withIndex('by_user', q => q.eq('userId', user?._id))
      .collect();

    const invitationsWithData = await Promise.all(
      invitations.map(async invitation => {
        const projectData = await ctx.db.get(invitation.projectId);
        return {
          invitationId: invitation._id,
          userId: invitation.userId,
          projectId: invitation.projectId,
          projectName: projectData?.name,
          projectImg: projectData?.image,
        };
      })
    );

    return invitationsWithData;
  },
});

export const createInvitation = mutation({
  args: { projectId: v.id('projects'), userEmail: v.string() },
  handler: async (ctx, args) => {
    const hasAccess = await adminOnly(ctx, args.projectId);
    if (!hasAccess) throw new ConvexError('You can not perform this action');

    const userToInvite = await ctx.db
      .query('users')
      .withIndex('by_email', q => q.eq('email', args.userEmail))
      .first();

    if (!userToInvite) throw new ConvexError('User not found');

    const hasPrevInvitation = await ctx.db
      .query('invitations')
      .withIndex('by_userId_projectId', q =>
        q.eq('projectId', args.projectId).eq('userId', userToInvite._id)
      )
      .first();

    if (Boolean(hasPrevInvitation))
      throw new ConvexError('You have already invited this user');

    const isMember = await ctx.db
      .query('project_members')
      .withIndex('by_projectId_and_userId', q =>
        q.eq('projectId', args.projectId).eq('userId', userToInvite._id)
      )
      .first();

    if (Boolean(isMember))
      throw new ConvexError('This user is alerady a member');

    await ctx.db.insert('invitations', {
      projectId: args.projectId,
      userId: userToInvite._id,
    });
  },
});

export const acceptInvitation = mutation({
  args: { invitationId: v.id('invitations') },
  handler: async (ctx, args) => {
    const user = await isAuth(ctx);

    if (!user)
      throw new ConvexError('You must be authenticated to perform this action');

    const invitation = await ctx.db
      .query('invitations')
      .filter(q => q.eq(q.field('_id'), args.invitationId))
      .first();

    if (!invitation) throw new ConvexError('Invitation not found or expired');

    await ctx.db.insert('project_members', {
      projectId: invitation.projectId,
      userId: invitation.userId,
      role: 'member',
      lastChatRead: Date.now(),
    });

    await ctx.db.delete(invitation._id);

    return invitation.projectId;
  },
});

export const rejectInvitation = mutation({
  args: { invitationId: v.id('invitations') },
  handler: async (ctx, args) => {
    const user = await isAuth(ctx);

    if (!user)
      throw new ConvexError('You must be authenticated to perform this action');

    const invitation = await ctx.db
      .query('invitations')
      .filter(q => q.eq(q.field('_id'), args.invitationId))
      .first();

    if (!invitation) throw new ConvexError('Invitation not found or expired');
    if (invitation.userId !== user._id)
      throw new ConvexError('This invitation does not belong to you');

    await ctx.db.delete(invitation._id);
  },
});
