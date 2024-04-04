import InvitationsMenu from '@/app/invitations/invitations-menu';
import UserMenu from '../../../components/user-menu';

const NavbarProjects = () => {
  return (
    <nav className='flex items-center justify-end gap-3 py-1.5 px-3'>
      <InvitationsMenu />
      <UserMenu withText={false} />
    </nav>
  );
};

export default NavbarProjects;
