import { ConvexError, v } from 'convex/values';

import { MutationCtx, QueryCtx, mutation, query } from './_generated/server';
import { Id } from './_generated/dataModel';

//Reusable functionalities
export const isAuth = async (
  ctx: QueryCtx | MutationCtx,
  userEmail: string
) => {
  const user = await ctx.db
    .query('users')
    .withIndex('by_email', q => q.eq('email', userEmail))
    .first();

  if (!user) return null;

  return user;
};

export const accessToProject = async (
  ctx: QueryCtx | MutationCtx,
  projectId: Id<'projects'>,
  userEmail: string
) => {
  //Find and validate user
  const user = await isAuth(ctx, userEmail);

  if (!user) return null;

  //Find and validate project
  const hasAccess = await ctx.db
    .query('project_members')
    .withIndex('by_projectId_and_userId', q =>
      q.eq('projectId', projectId).eq('userId', user._id)
    )
    .first();

  if (!hasAccess) return null;

  return user;
};

export const adminOnly = async (
  ctx: QueryCtx | MutationCtx,
  projectId: Id<'projects'>,
  userEmail: string
) => {
  //Find and validate user
  const user = await isAuth(ctx, userEmail);

  if (!user) return null;

  const userRole = await ctx.db
    .query('project_members')
    .withIndex('by_projectId_and_userId', q =>
      q.eq('projectId', projectId).eq('userId', user._id)
    )
    .first();

  if (userRole?.role === 'member') return null;

  return { ...user, role: userRole?.role };
};

//Convex functions
export const getUserProjects = query({
  args: { userEmail: v.string() },
  handler: async (ctx, args) => {
    const user = await isAuth(ctx, args.userEmail);

    if (!user) return [];

    const userProjects = await ctx.db
      .query('project_members')
      .withIndex('by_userId', q => q.eq('userId', user?._id))
      .collect();

    const projects = await Promise.all(
      userProjects.map(async project => {
        const projectData = await ctx.db.get(project.projectId);
        return {
          ...projectData,
          role: project.role,
        };
      })
    );

    return projects;
  },
});

export const getProject = query({
  args: { projectId: v.id('projects'), userEmail: v.string() },
  handler: async (ctx, args) => {
    const access = await accessToProject(ctx, args.projectId, args.userEmail);
    if (!access) return null;

    const projectData = await ctx.db
      .query('projects')
      .filter(q => q.eq(q.field('_id'), args.projectId))
      .first();

    return projectData;
  },
});

export const createProject = mutation({
  args: { name: v.string(), userEmail: v.string() },
  handler: async (ctx, args) => {
    const user = await isAuth(ctx, args.userEmail);

    if (!user) throw new ConvexError('Must be logged in');

    const projectId = await ctx.db.insert('projects', {
      name: args.name,
      createdBy: user._id,
      status: 'active',
      updatedAt: Date.now(),
    });

    await ctx.db.insert('project_members', {
      projectId,
      userId: user._id,
      role: 'owner',
    });

    return projectId;
  },
});

export const deleteProject = mutation({
  args: { projectId: v.id('projects'), userEmail: v.string() },
  handler: async (ctx, args) => {
    const isAdmin = adminOnly(ctx, args.projectId, args.userEmail);

    if (!isAdmin)
      throw new ConvexError('You have no permission to perform this action');

    await ctx.db.delete(args.projectId);
  },
});

export const leaveProject = mutation({
  args: { projectId: v.id('projects'), userEmail: v.string() },
  handler: async (ctx, args) => {
    const isMember = await accessToProject(ctx, args.projectId, args.userEmail);

    if (!isMember) throw new ConvexError('You can not perform this action');

    const userMember = await ctx.db
      .query('project_members')
      .withIndex('by_projectId_and_userId', q =>
        q.eq('projectId', args.projectId).eq('userId', isMember._id)
      )
      .first();

    if (!userMember)
      throw new ConvexError('You are not a member of this project');

    await ctx.db.delete(userMember?._id);
  },
});

export const getMembers = query({
  args: { projectId: v.id('projects'), userEmail: v.string() },
  handler: async (ctx, args) => {
    const access = await accessToProject(ctx, args.projectId, args.userEmail);

    if (!access) return [];

    const projectMembers = await ctx.db
      .query('project_members')
      .withIndex('by_projectId', q => q.eq('projectId', args.projectId))
      .collect();

    const members = await Promise.all(
      projectMembers.map(async member => {
        const userData = await ctx.db.get(member.userId);
        return {
          ...userData,
          role: member.role,
        };
      })
    );

    return members;
  },
});
