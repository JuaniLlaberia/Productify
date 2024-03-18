import { fetchMutation, fetchQuery } from 'convex/nextjs';
import { NextAuthOptions } from 'next-auth';
import Github from 'next-auth/providers/github';
import GitLab from 'next-auth/providers/gitlab';
import Google from 'next-auth/providers/google';

import { api } from '../../convex/_generated/api';

export const authConfig: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GitLab({
      clientId: process.env.GITLAB_CLIENT_ID as string,
      clientSecret: process.env.GITLAB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      const userExists = await fetchQuery(api.users.getUserByEmail, {
        email: user.email,
      });

      if (!userExists) {
        await fetchMutation(api.users.createUser, {
          name: user.name as string,
          email: user.email,
          defaultImg: user.image as string,
        });
      }

      return true;
    },
  },
};
