import { HiOutlineBell } from 'react-icons/hi2';

import UserMenu from '../../../components/user-menu';
import { Button } from '../../../components/ui/button';

const NavbarProjects = () => {
  return (
    <nav className='flex items-center justify-end gap-3 p-3'>
      <Button
        variant='ghost'
        size='icon'
      >
        <HiOutlineBell size={24} />
      </Button>
      <UserMenu withText={false} />
    </nav>
  );
};

export default NavbarProjects;
