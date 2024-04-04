'use client';

import {
  HiOutlineBars3,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog6Tooth,
  HiOutlineExclamationTriangle,
  HiOutlineLink,
  HiOutlineListBullet,
  HiOutlineSquares2X2,
  HiOutlineUsers,
} from 'react-icons/hi2';
import { useState } from 'react';

import SidebarFooter from './sidebar-footer';
import NavLink from '../../../components/nav-link';
import { Button } from '@/components/ui/button';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { useParams } from 'next/navigation';

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
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const hasMsg = useQuery(api.messages.hasUnreadMsgs, {
    projectId: params.projectId as Id<'projects'>,
  });

  return (
    <>
      <Button
        variant='ghost'
        size='sm'
        onClick={() => setIsOpen(true)}
        className='absolute top-3.5 px-3 left-2 md:hidden'
      >
        <HiOutlineBars3 size={25} />
      </Button>
      <aside
        className={`${
          isOpen ? '' : '-translate-x-[250px] md:translate-x-0'
        } transition-transform duration-300 fixed h-full top-0 left-0 z-40 md:relative bg-background-3 dark:bg-background-2 border-r border-border-1 w-[250px]`}
      >
        <nav className='h-full flex flex-col'>
          <section className='flex-1 p-3'>
            <ul className='flex flex-col gap-1'>
              {links.map(link => (
                <NavLink
                  closeFn={() => setIsOpen(false)}
                  key={link.link}
                  to={link.link}
                  icon={link.icon}
                  hasNotification={Boolean(hasMsg) && link.text === 'Chat'}
                >
                  {link.text}
                </NavLink>
              ))}
            </ul>
          </section>
          <SidebarFooter />
        </nav>
      </aside>
      {isOpen && (
        <div
          className='w-full h-full absolute md:hidden top-0 left-0 z-30 bg-background-overlay backdrop-blur-[1.5px]'
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
