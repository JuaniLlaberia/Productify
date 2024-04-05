import UserMenu from '../../../components/user-menu';

const SidebarFooter = () => {
  return (
    <section className='flex flex-col gap-2 p-3 border-t border-border-1'>
      <UserMenu />
    </section>
  );
};

export default SidebarFooter;
