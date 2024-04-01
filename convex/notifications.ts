import { query } from './_generated/server';
import { isAuth } from './projects';

export const getNotificaions = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await isAuth(ctx);
    if (!user) return [];

    const notificationsObject = await ctx.db
      .query('notifications')
      .withIndex('by_user', q => q.eq('userId', user._id))
      .order('desc')
      .take(5);

    const notifications = await Promise.all(
      notificationsObject.map(async notification => {
        const projectData = await ctx.db.get(notification.projectId);
        return {
          ...notification,
          projectName: projectData?.name,
        };
      })
    );

    return notifications;
  },
});
