import Link from 'next/link';
import GithubAuthBtn from '@/components/auth/GithubAuthBtn';
import GitlabAuthBtn from '@/components/auth/GitlabAuthBtn';
import GoogleAuthBtn from '@/components/auth/GoogleAuthBtn';
import Logo from '@/components/ui/logo';

const SignInPage = async () => {
  return (
    <main className='h-full flex flex-col justify-center items-center bg-background-2 p-3'>
      <header className='absolute top-2 left-6'>
        <Logo />
      </header>
      <section className='w-full md:w-[400px] flex flex-col gap-2 p-5'>
        <h1 className='text-3xl lg:text-4xl font-semibold text-center text-text-1 mb-6 lg:mb-8'>
          Log in to Productify
        </h1>
        <GoogleAuthBtn />
        <GithubAuthBtn />
        <GitlabAuthBtn />
      </section>
      <footer>
        <p className='text-text-2 text-sm mt-1'>
          Don't have an account?{' '}
          <Link
            className='font-semibold underline text-text-1'
            href='/sign-up'
          >
            Sign Up
          </Link>
        </p>
      </footer>
      <p className='text-[0.65rem] text-text-2 absolute bottom-3 text-center px-6'>
        By continuing, you agree to Productify's Terms of Service and Privacy
        Policy.
      </p>
    </main>
  );
};

export default SignInPage;
