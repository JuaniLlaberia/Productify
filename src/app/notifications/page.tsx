import NavbarProjects from '../projects/[projectId]/navbar-projects';
import NotificationsList from './notifications-list';

const NotficationsPage = () => {
  return (
    <main>
      <NavbarProjects />
      <header className='p-2 px-3 lg:px-24 my-3'>
        <h1 className='text-2xl text-text-1 font-semibold'>Notifications</h1>
      </header>
      <NotificationsList />
    </main>
  );
};

export default NotficationsPage;
