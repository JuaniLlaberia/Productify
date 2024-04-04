import Image from 'next/image';

const LandingCards = () => {
  return (
    <section className='px-8 md:px-16 lg:px-64'>
      <div className='flex justify-center '>
        <h5 className='bg-background-1 p-2 px-6 rounded-full'>
          <span className='bg-gradient-to-b from-orange-400 from-40% to-orange-600 bg-clip-text text-transparent'>
            OUR TOOLS
          </span>
        </h5>
      </div>
      <ul className='mt-16 flex flex-col gap-20'>
        <li className='flex flex-col-reverse md:flex-row-reverse items-center justify-center'>
          <div className='w-full flex flex-col space-y-2 md:max-w-sm mt-4 px-4 md:px-0 md:pt-0'>
            <span className='text-2xl text-primary font-semibold bg-gradient-to-b from-orange-400 from-40% to-orange-600 bg-clip-text text-transparent'>
              Tasks Manager
            </span>
            <p className='text-neutral-600 dark:text-neutral-500'>
              Unleash the full potential of your team. Collaborate effortlessly
              as a team, assign and track tasks, and visualize progress in
              real-time.
            </p>
          </div>
          <div className='w-full md:min-w-[500px] md:mr-14'>
            <div className='mx-auto sm:max-w-4xl md:max-w-screen-xl px-2 flex'>
              <div className='mx-auto max-w-6xl px-6 lg:px-8'>
                <div className='mt-4'>
                  <div className='-m-2 rounded-xl border border-border-1 p-2 lg:-m-4 lg:rounded-2xl lg:p-4'>
                    <Image
                      alt='Descriptive alt text'
                      width='1222'
                      height='636'
                      className='rounded-md bg-  shadow-2xl ring-1 ring-neutral-900/10'
                      src='/tasks-screen.png'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className='flex flex-col-reverse md:flex-row items-center justify-center'>
          <div className='w-full flex flex-col space-y-2 md:max-w-sm mt-4 px-4 md:px-0 md:pt-0'>
            <span className='text-2xl text-primary font-semibold bg-gradient-to-b from-orange-400 from-40% to-orange-600 bg-clip-text text-transparent'>
              Real Time Messaging
            </span>
            <p className='text-neutral-600 dark:text-neutral-500'>
              Connect with your team in real-time, fostering collaboration and
              enhancing communication.
            </p>
          </div>
          <div className='w-full md:min-w-[500px] md:mr-14'>
            <div className='mx-auto sm:max-w-4xl md:max-w-screen-xl px-2 flex'>
              <div className='mx-auto max-w-6xl px-6 lg:px-8'>
                <div className='mt-4'>
                  <div className='-m-2 rounded-xl border border-border-1 p-2 lg:-m-4 lg:rounded-2xl lg:p-4'>
                    <Image
                      alt='Descriptive alt text'
                      width='1222'
                      height='636'
                      className='rounded-md bg-  shadow-2xl ring-1 ring-neutral-900/10'
                      src='/chat-screen.png'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className='flex flex-col-reverse md:flex-row-reverse items-center justify-center'>
          <div className='w-full flex flex-col space-y-2 md:max-w-sm mt-4 px-4 md:px-0 md:pt-0'>
            <span className='text-2xl text-primary font-semibold bg-gradient-to-b from-orange-400 from-40% to-orange-600 bg-clip-text text-transparent'>
              Streamlining Bug Reporting
            </span>
            <p className='text-neutral-600 dark:text-neutral-500'>
              Our bug tracking and reporting feature enables members to easily
              track, document, and report bugs within your application. Being
              able to transform them into tasks.
            </p>
          </div>
          <div className='w-full md:min-w-[500px] md:mr-14'>
            <div className='mx-auto sm:max-w-4xl md:max-w-screen-xl px-2 flex'>
              <div className='mx-auto max-w-6xl px-6 lg:px-8'>
                <div className='mt-4'>
                  <div className='-m-2 rounded-xl border border-border-1 p-2 lg:-m-4 lg:rounded-2xl lg:p-4'>
                    <Image
                      alt='Descriptive alt text'
                      width='1222'
                      height='636'
                      className='rounded-md bg-  shadow-2xl ring-1 ring-neutral-900/10'
                      src='/reports-screen.png'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default LandingCards;
