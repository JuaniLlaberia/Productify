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
      userProjects.map(project => ctx.db.get(project.projectId))
    );

    return projects;
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

export const getTasks = query({
  args: { projectId: v.id('projects'), userEmail: v.string() },
  handler: async (ctx, args) => {
    const access = await accessToProject(ctx, args.projectId, args.userEmail);

    if (!access) return [];

    const tasks = await ctx.db
      .query('tasks')
      .withIndex('by_projectId', q => q.eq('projectId', args.projectId))
      .collect();

    return tasks;
  },
});

export const createTask = mutation({
  args: {
    projectId: v.id('projects'),
    title: v.string(),
    description: v.string(),
    tag: v.union(
      v.literal('feature'),
      v.literal('fix'),
      v.literal('test'),
      v.literal('refactor'),
      v.literal('deploy')
    ),
    status: v.union(
      v.literal('pending'),
      v.literal('progress'),
      v.literal('finished')
    ),
    importance: v.union(
      v.literal('urgent'),
      v.literal('important'),
      v.literal('moderate')
    ),
    assignedTo: v.id('users'),
    dueDate: v.number(),
  },
  handler: async (ctx, args) => {
    const access = await accessToProject(
      ctx,
      args.projectId,
      'juanillaberia2002@gmail.com'
    );

    if (!access) throw new ConvexError('You do not have access');

    const taskId = await ctx.db.insert('tasks', {
      ...args,
    });

    return taskId;
  },
});
