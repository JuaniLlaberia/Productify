import { HiOutlineBell } from 'react-icons/hi2';
import { getServerSession } from 'next-auth';

import UserMenu from '../../../components/user-menu';
import { Button } from '../../../components/ui/button';

const NavbarProjects = async () => {
  const session = await getServerSession();

  return (
    <nav className='flex items-center justify-end gap-3 p-3'>
      <Button
        variant='ghost'
        size='icon'
      >
        <HiOutlineBell size={24} />
      </Button>
      <UserMenu
        email={session?.user?.email!}
        withText={false}
      />
    </nav>
  );
};

export default NavbarProjects;
