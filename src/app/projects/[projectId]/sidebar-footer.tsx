import UserMenu from '../../../components/user-menu';
import NotificationsMenu from '@/app/notifications/notifications-menu';

const SidebarFooter = () => {
  return (
    <section className='flex flex-col gap-2 p-3 border-t border-border-1'>
      <NotificationsMenu withText />
      <UserMenu />
    </section>
  );
};

export default SidebarFooter;
