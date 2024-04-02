import UserMenu from '../../../components/user-menu';
import NotificationsMenu from '@/app/notifications/notifications-menu';

const NavbarProjects = () => {
  return (
    <nav className='flex items-center justify-end gap-3 py-1.5 px-3 md:border-b md:border-border-1'>
      <NotificationsMenu withText={false} />
      <UserMenu withText={false} />
    </nav>
  );
};

export default NavbarProjects;
