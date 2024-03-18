import GithubAuthBtn from '@/components/auth/GithubAuthBtn';
import GitlabAuthBtn from '@/components/auth/GitlabAuthBtn';
import GoogleAuthBtn from '@/components/auth/GoogleAuthBtn';
import SignOutBtn from '@/components/auth/SignOutBtn';
import { authConfig } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';

const SignUpPage = async () => {
  const session = await getServerSession(authConfig);

  return (
    <div>
      SignUp
      <br />
      <GoogleAuthBtn />
      <br />
      <GitlabAuthBtn />
      <br />
      <GithubAuthBtn />
      <h3>{session?.user?.name}</h3>
      <SignOutBtn />
    </div>
  );
};

export default SignUpPage;
