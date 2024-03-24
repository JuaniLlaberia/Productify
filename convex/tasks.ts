import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { accessToProject } from './projects';
import { Doc, Id } from './_generated/dataModel';

export const taskSchemaTypes = {
  _id: v.optional(v.string()),
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
};

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
    taskData: v.object(taskSchemaTypes),
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const access = await accessToProject(
      ctx,
      args.taskData.projectId,
      args.userEmail
    );

    if (!access) throw new ConvexError('You do not have access');

    const taskId = await ctx.db.insert('tasks', {
      ...args.taskData,
    });

    return taskId;
  },
});

export const updateTask = mutation({
  args: {
    taskData: v.object(taskSchemaTypes),
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const access = await accessToProject(
      ctx,
      args.taskData.projectId,
      args.userEmail
    );

    if (!access) throw new ConvexError('You do not have access');

    await ctx.db.patch(
      args.taskData._id as Id<'tasks'>,
      args.taskData as Doc<'tasks'>
    );
  },
});

export const deleteTask = mutation({
  args: {
    taskId: v.id('tasks'),
    projectId: v.id('projects'),
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const access = await accessToProject(ctx, args.projectId, args.userEmail);

    if (!access) throw new ConvexError('You do not have access');

    await ctx.db.delete(args.taskId);
  },
});