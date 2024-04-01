import { ConvexError, v } from 'convex/values';
import { paginationOptsValidator } from 'convex/server';

import { MutationCtx, QueryCtx, mutation, query } from './_generated/server';
import { Id } from './_generated/dataModel';

//Reusable functionalities
export const isAuth = async (ctx: QueryCtx | MutationCtx) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) return null;

  const user = await ctx.db
    .query('users')
    .withIndex('by_email', q => q.eq('email', identity.email as string))
    .first();

  if (!user) return null;

  return user;
};

export const accessToProject = async (
  ctx: QueryCtx | MutationCtx,
  projectId: Id<'projects'>
) => {
  //Find and validate user
  const user = await isAuth(ctx);

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
  projectId: Id<'projects'>
) => {
  //Find and validate user
  const user = await isAuth(ctx);

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
  args: {},
  handler: async (ctx, args) => {
    const user = await isAuth(ctx);

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
  args: { projectId: v.id('projects') },
  handler: async (ctx, args) => {
    const access = await accessToProject(ctx, args.projectId);
    if (!access) return null;

    const projectData = await ctx.db
      .query('projects')
      .filter(q => q.eq(q.field('_id'), args.projectId))
      .first();

    return projectData;
  },
});

export const createProject = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const user = await isAuth(ctx);

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

export const updateProject = mutation({
  args: {
    projectId: v.id('projects'),
    projectData: v.object({
      name: v.optional(v.string()),
      status: v.optional(
        v.union(
          v.literal('active'),
          v.literal('inactive'),
          v.literal('mantainance')
        )
      ),
      image: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const isAdmin = adminOnly(ctx, args.projectId);

    if (!isAdmin)
      throw new ConvexError('You have no permission to perform this action');

    await ctx.db.patch(args.projectId, { ...args.projectData });
  },
});

export const deleteProject = mutation({
  args: { projectId: v.id('projects') },
  handler: async (ctx, args) => {
    const isAdmin = adminOnly(ctx, args.projectId);

    if (!isAdmin)
      throw new ConvexError('You have no permission to perform this action');

    //Delete project information
    await ctx.db.delete(args.projectId);

    //Delete all member-project relation
    const userProjects = await ctx.db
      .query('project_members')
      .withIndex('by_projectId', q => q.eq('projectId', args.projectId))
      .collect();

    await Promise.all(
      userProjects.map(async project => await ctx.db.delete(project._id))
    );
  },
});

export const leaveProject = mutation({
  args: { projectId: v.id('projects') },
  handler: async (ctx, args) => {
    const isMember = await accessToProject(ctx, args.projectId);

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

export const getMembersPaginated = query({
  args: {
    paginationOpts: paginationOptsValidator,
    projectId: v.id('projects'),
  },
  handler: async (ctx, args) => {
    const access = await accessToProject(ctx, args.projectId);

    if (!access) throw new ConvexError('You have no access to this');

    const projectMembers = await ctx.db
      .query('project_members')
      .withIndex('by_projectId', q => q.eq('projectId', args.projectId))
      .paginate(args.paginationOpts);

    return {
      ...projectMembers,
      page: await Promise.all(
        projectMembers.page.map(async member => {
          const userData = await ctx.db.get(member.userId);
          return {
            ...userData,
            role: member.role,
          };
        })
      ),
    };
  },
});

export const getMembers = query({
  args: {
    projectId: v.id('projects'),
  },
  handler: async (ctx, args) => {
    const access = await accessToProject(ctx, args.projectId);

    if (!access) return [];

    const projectMembers = await ctx.db
      .query('project_members')
      .withIndex('by_projectId', q => q.eq('projectId', args.projectId))
      .collect();

    return await Promise.all(
      projectMembers.map(async member => {
        const userData = await ctx.db.get(member.userId);
        return {
          ...userData,
          role: member.role,
        };
      })
    );
  },
});

export const getUserRole = query({
  args: {
    projectId: v.id('projects'),
  },
  handler: async (ctx, args) => {
    const access = await accessToProject(ctx, args.projectId);

    if (!access) return null;

    const member = await ctx.db
      .query('project_members')
      .withIndex('by_projectId_and_userId', q =>
        q.eq('projectId', args.projectId).eq('userId', access._id)
      )
      .first();

    return member?.role;
  },
});

export const updateRole = mutation({
  args: {
    projectId: v.id('projects'),
    userId: v.id('users'),
    role: v.union(v.literal('admin'), v.literal('member')),
  },
  handler: async (ctx, args) => {
    const hasAccess = await adminOnly(ctx, args.projectId);

    if (!hasAccess) throw new ConvexError('You can not perform this action');

    const member = await ctx.db
      .query('project_members')
      .withIndex('by_projectId_and_userId', q =>
        q.eq('projectId', args.projectId).eq('userId', args.userId)
      )
      .first();

    if (!member) throw new ConvexError('User not found');

    await ctx.db.patch(member?._id, { role: args.role });
  },
});

export const removeMember = mutation({
  args: { projectId: v.id('projects'), userId: v.id('users') },
  handler: async (ctx, args) => {
    const hasAccess = await adminOnly(ctx, args.projectId);

    if (!hasAccess) throw new ConvexError('You can not perform this action');

    const userMember = await ctx.db
      .query('project_members')
      .withIndex('by_projectId_and_userId', q =>
        q.eq('projectId', args.projectId).eq('userId', args.userId)
      )
      .first();

    if (!userMember)
      throw new ConvexError('This user is not a member of this project');

    await ctx.db.delete(userMember?._id);
  },
});
