'use client';

import {
  HiOutlineComputerDesktop,
  HiOutlineMoon,
  HiOutlinePaintBrush,
  HiOutlineSun,
} from 'react-icons/hi2';
import { useTheme } from 'next-themes';

import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from './ui/dropdown-menu';

const ThemeMenu = () => {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <HiOutlinePaintBrush className='mr-2 h-4 w-4' />
        <span>Theme</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem
          className={`${theme === 'light' ? 'bg-background-hover-2' : ''}`}
          onClick={() => setTheme('light')}
        >
          <HiOutlineSun className='mr-2 h-4 w-4' />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${theme === 'dark' ? 'bg-background-hover-2' : ''}`}
          onClick={() => setTheme('dark')}
        >
          <HiOutlineMoon className='mr-2 h-4 w-4' />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${theme === 'system' ? 'bg-background-hover-2' : ''}`}
          onClick={() => setTheme('system')}
        >
          <HiOutlineComputerDesktop className='mr-2 h-4 w-4' />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};

export default ThemeMenu;
