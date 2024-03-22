import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog6Tooth,
  HiOutlineExclamationTriangle,
  HiOutlineLink,
  HiOutlineListBullet,
  HiOutlineSquares2X2,
  HiOutlineUsers,
} from 'react-icons/hi2';

import SidebarFooter from './sidebar-footer';
import NavLink from '../../../components/nav-link';

const links = [
  {
    link: 'dashboard',
    icon: <HiOutlineSquares2X2 />,
    text: 'Dashboard',
  },
  {
    link: 'tasks',
    icon: <HiOutlineListBullet />,
    text: 'Tasks',
  },
  {
    link: 'chat',
    icon: <HiOutlineChatBubbleLeftRight />,
    text: 'Chat',
  },
  {
    link: 'references',
    icon: <HiOutlineLink />,
    text: 'References',
  },
  {
    link: 'bugs-report',
    icon: <HiOutlineExclamationTriangle />,
    text: 'Bugs report',
  },
  {
    link: 'members',
    icon: <HiOutlineUsers />,
    text: 'Members',
  },
  {
    link: 'settings',
    icon: <HiOutlineCog6Tooth />,
    text: 'Settings',
  },
];

const Sidebar = () => {
  return (
    <aside className='relative bg-background-3 dark:bg-background-2 border-r border-border-1 w-[250px]'>
      <button className='absolute top-0 -right-10'>Open</button>
      <nav className='h-full flex flex-col'>
        <section className='flex-1 p-3'>
          <ul className='flex flex-col gap-1'>
            {links.map(link => (
              <NavLink
                key={link.link}
                to={link.link}
                icon={link.icon}
              >
                {link.text}
              </NavLink>
            ))}
          </ul>
        </section>
        <SidebarFooter />
      </nav>
    </aside>
  );
};

export default Sidebar;
