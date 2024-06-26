import { ConvexError, v } from 'convex/values';
import { omit } from 'convex-helpers';

import { mutation, query } from './_generated/server';
import { accessToProject } from './projects';
import { Doc } from './_generated/dataModel';
import { Tasks } from './schema';

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
    v.literal('p-0'),
    v.literal('p-1'),
    v.literal('p-2'),
    v.literal('p-3'),
    v.literal('p-4')
  ),
  assignedTo: v.id('users'),
};

export const getTasks = query({
  args: { projectId: v.id('projects') },
  handler: async (ctx, args) => {
    const access = await accessToProject(ctx, args.projectId);

    if (!access) return [];

    const tasks = await ctx.db
      .query('tasks')
      .withIndex('by_projectId', q => q.eq('projectId', args.projectId))
      .collect();

    const groupedTasks = tasks.reduce((groupedTasks, crrTask) => {
      const status = crrTask.status;

      if (!groupedTasks[status]) {
        groupedTasks[status] = [];
      }

      groupedTasks[status].push(crrTask);
      return groupedTasks;
    }, {} as { [status: string]: Doc<'tasks'>[] });

    return groupedTasks;
  },
});

export const createTask = mutation({
  args: Tasks.withoutSystemFields,
  handler: async (ctx, args) => {
    const access = await accessToProject(ctx, args.projectId);

    if (!access) throw new ConvexError('You do not have access');

    const taskId = await ctx.db.insert('tasks', {
      ...args,
    });

    return taskId;
  },
});

export const updateTask = mutation({
  args: { ...omit(Tasks.withSystemFields, ['_creationTime']) },
  handler: async (ctx, args) => {
    const access = await accessToProject(ctx, args.projectId);

    if (!access) throw new ConvexError('You do not have access');

    await ctx.db.patch(args._id, args);
  },
});

export const deleteTask = mutation({
  args: {
    taskId: v.id('tasks'),
    projectId: v.id('projects'),
  },
  handler: async (ctx, args) => {
    const access = await accessToProject(ctx, args.projectId);

    if (!access) throw new ConvexError('You do not have access');

    await ctx.db.delete(args.taskId);
  },
});
