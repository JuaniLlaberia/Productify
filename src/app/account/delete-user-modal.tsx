import FormBtn from '@/components/form-btn';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteUser } from '@/lib/actions/user-actions';

const DeleteUserModal = ({ userEmail }: { userEmail: string }) => {
  return (
    <AlertDialog>
      <div className='flex items-center justify-end mt-5'>
        <AlertDialogTrigger asChild>
          <Button
            variant='destructive'
            size='sm'
          >
            Delete Account
          </Button>
        </AlertDialogTrigger>
      </div>
      <AlertDialogContent>
        <AlertDialogTitle>Delete Account</AlertDialogTitle>
        <AlertDialogDescription className='text-text-2'>
          This will permanently remove your account and all of its data from
          Profuctify.{' '}
          <span className='text-text-1 font-semibold'>
            This action is not reversible.
          </span>
        </AlertDialogDescription>
        <AlertDialogFooter className='flex flex-row justify-between'>
          <AlertDialogCancel asChild>
            <Button
              variant='ghost'
              size='sm'
            >
              Cancel
            </Button>
          </AlertDialogCancel>
          <form action={() => deleteUser(userEmail)}>
            <FormBtn
              dangerMode
              size='sm'
            >
              Confirm
            </FormBtn>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserModal;
