import LandingHeader from './(landing-components)/landing-header';
import LandingCards from './(landing-components)/landing-cards';
import LandingFooter from './(landing-components)/landing-footer';

const LandingPage = () => {
  return (
    <main>
      <LandingHeader />
      <LandingCards />
      <LandingFooter />
    </main>
  );
};

export default LandingPage;
