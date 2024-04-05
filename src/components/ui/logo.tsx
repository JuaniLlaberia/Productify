import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href='/'>
      <Image
        src='/logo_text_light.png'
        alt='Application logo'
        width={115}
        height={45}
        className='block dark:hidden'
      />
      <Image
        src='/logo_text_dark.png'
        alt='Application logo'
        width={115}
        height={45}
        className='hidden dark:block'
      />
    </Link>
  );
};

export default Logo;
