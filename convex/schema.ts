import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    profileImg: v.optional(v.string()),
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
    members: v.array(v.id('users')),
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
    dueDate: v.number(),
  })
    .index('by_projectId', ['projectId'])
    .index('by_user_due', ['assignedTo', 'dueDate']),

  messages: defineTable({
    type: v.union(
      v.literal('message'), //For sending regular messages
      v.literal('image'), //For sending images
      v.literal('reference') //For sending task refs or snippets
    ),
    data: v.string(),
    sendBy: v.id('users'),
    projectId: v.id('projects'),
    parentMessageId: v.optional(v.id('messages')),
    edited: v.boolean(),
  }).index('by_projectId', ['projectId']),

  references: defineTable({
    projectId: v.id('projects'),
    type: v.union(
      //Used for displaying custom icons
      v.literal('github'),
      v.literal('gitlab'),
      v.literal('stackoverflow'),
      v.literal('figma'),
      v.literal('documentation'),
      v.literal('article'),
      v.literal('other')
    ),
    reference: v.string(),
    isPinned: v.boolean(),
  }).index('by_projectId_pinned', ['projectId', 'isPinned']),
});
