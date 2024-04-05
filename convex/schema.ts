import { defineSchema } from 'convex/server';
import { v } from 'convex/values';
import { Table } from 'convex-helpers/server';

const importanceSchema = v.union(
  v.literal('p-0'),
  v.literal('p-1'),
  v.literal('p-2'),
  v.literal('p-3'),
  v.literal('p-4')
);

export const Users = Table('users', {
  name: v.string(),
  email: v.string(),
  profileImg: v.optional(v.string()),
  clerkIdentifier: v.string(),
});

export const Projects = Table('projects', {
  name: v.string(),
  status: v.union(
    v.literal('active'),
    v.literal('inactive'),
    v.literal('mantainance')
  ),
  image: v.optional(v.string()),
  createdBy: v.id('users'),
  updatedAt: v.number(),
});

export const Tasks = Table('tasks', {
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
  importance: importanceSchema,
  assignedTo: v.id('users'),
});

export const Messages = Table('messages', {
  type: v.union(v.literal('message'), v.literal('image')),
  data: v.string(),
  image: v.optional(v.string()),
  sendBy: v.id('users'),
  projectId: v.id('projects'),
});

export const References = Table('references', {
  name: v.string(),
  projectId: v.id('projects'),
  type: v.union(
    v.literal('github'),
    v.literal('gitlab'),
    v.literal('stackoverflow'),
    v.literal('documentation'),
    v.literal('other')
  ),
  reference: v.string(),
  isPinned: v.boolean(),
});

export const ProjectMembers = Table('project_members', {
  projectId: v.id('projects'),
  userId: v.id('users'),
  role: v.union(v.literal('owner'), v.literal('admin'), v.literal('member')),
  lastChatRead: v.number(),
});

export const Reports = Table('reports', {
  name: v.string(),
  projectId: v.id('projects'),
  description: v.string(),
  type: v.union(
    v.literal('ui/ux'),
    v.literal('functional'),
    v.literal('performance'),
    v.literal('security'),
    v.literal('other')
  ),
  importance: importanceSchema,
});

export const Invitations = Table('invitations', {
  userId: v.id('users'),
  projectId: v.id('projects'),
});

export default defineSchema({
  users: Users.table
    .index('by_email', ['email'])
    .index('by_clerkId', ['clerkIdentifier']),
  projects: Projects.table,
  tasks: Tasks.table
    .index('by_projectId', ['projectId'])
    .index('by_user_due', ['assignedTo', 'importance']),
  messages: Messages.table.index('by_projectId', ['projectId']),
  references: References.table.index('by_projectId_pinned', [
    'projectId',
    'isPinned',
  ]),
  project_members: ProjectMembers.table
    .index('by_projectId_and_userId', ['projectId', 'userId'])
    .index('by_projectId', ['projectId'])
    .index('by_userId', ['userId']),
  reports: Reports.table.index('by_projectId', ['projectId']),
  invitations: Invitations.table
    .index('by_user', ['userId'])
    .index('by_userId_projectId', ['projectId', 'userId']),
});
