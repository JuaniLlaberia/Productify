import UserMenu from '@/components/UserMenu';
import UserSettingsCards from '@/components/UserSettingsCards';
import { Button } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { HiOutlineBell } from 'react-icons/hi2';

const AccountSettingsPage = async () => {
  const session = await getServerSession();

  return (
    <main>
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
      <header className='p-2 px-3'>
        <h1 className='text-text-1 text-xl'>Account Settings</h1>
      </header>
      <UserSettingsCards email={session?.user?.email!} />
    </main>
  );
};

export default AccountSettingsPage;
