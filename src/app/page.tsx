import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';

const LandingPage = () => {
  return (
    <div>
      <SignedOut>
        <SignInButton mode='modal'>Sign In</SignInButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton>Sign Out</SignOutButton>
      </SignedIn>
    </div>
  );
};

export default LandingPage;
