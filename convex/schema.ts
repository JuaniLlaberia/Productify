import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    profileImg: v.optional(v.string()),
    clerkIdentifier: v.string(),
  }).index('by_email', ['email']),

  projects: defineTable({
    name: v.string(),
    status: v.union(
      v.literal('active'),
      v.literal('inactive'),
      v.literal('mantainance')
    ),
    image: v.optional(v.string()),
    createdBy: v.id('users'),
    updatedAt: v.number(),
  }),

  tasks: defineTable({
    title: v.string(),
    description: v.string(),
    projectId: v.id('projects'),
    status: v.union(
      v.literal('pending'),
      v.literal('progress'),
      v.literal('finished')
    ),
    tag: v.union(
      v.literal('feature'),
      v.literal('fix'),
      v.literal('test'),
      v.literal('refactor'),
      v.literal('deploy')
    ),
    importance: v.union(
      v.literal('urgent'),
      v.literal('important'),
      v.literal('moderate')
    ),
    assignedTo: v.id('users'),
  })
    .index('by_projectId', ['projectId'])
    .index('by_user_due', ['assignedTo', 'importance']),

  messages: defineTable({
    type: v.union(
      v.literal('message'),
      v.literal('image'),
      v.literal('reference')
    ),
    data: v.string(),
    sendBy: v.id('users'),
    projectId: v.id('projects'),
    parentMessageId: v.optional(v.id('messages')),
  }).index('by_projectId', ['projectId']),

  references: defineTable({
    name: v.string(),
    projectId: v.id('projects'),
    type: v.union(
      //Used for displaying custom icons
      v.literal('github'),
      v.literal('gitlab'),
      v.literal('stackoverflow'),
      v.literal('documentation'),
      v.literal('other')
    ),
    reference: v.string(),
    isPinned: v.boolean(),
  }).index('by_projectId_pinned', ['projectId', 'isPinned']),

  project_members: defineTable({
    projectId: v.id('projects'),
    userId: v.id('users'),
    role: v.union(v.literal('owner'), v.literal('admin'), v.literal('member')),
  })
    .index('by_projectId_and_userId', ['projectId', 'userId'])
    .index('by_projectId', ['projectId'])
    .index('by_userId', ['userId']),

  bugs_reports: defineTable({
    name: v.string(),
    projectId: v.id('projects'),
    description: v.string(),
    type: v.union(
      v.literal('ui'),
      v.literal('functional'),
      v.literal('server'),
      v.literal('security'),
      v.literal('other')
    ),
    importance: v.union(
      v.literal('urgent'),
      v.literal('important'),
      v.literal('moderate')
    ),
  }),
});
