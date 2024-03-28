import { HiOutlineBell } from 'react-icons/hi2';

import UserMenu from '../../../components/user-menu';
import NavLink from '../../../components/nav-link';

const SidebarFooter = () => {
  return (
    <section className='flex flex-col gap-2 p-3 border-t border-border-1'>
      <NavLink
        to='/notifications'
        icon={<HiOutlineBell />}
      >
        Notifications
      </NavLink>
      <UserMenu />
    </section>
  );
};

export default SidebarFooter;
