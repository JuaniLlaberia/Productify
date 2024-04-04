'use client';

import { useMutation, useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { HiOutlineCodeBracket } from 'react-icons/hi2';
import { toast } from 'sonner';
import { useState } from 'react';

import SettingsCard from '@/components/settings-card';
import Badge from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Id } from '../../../../../convex/_generated/dataModel';
import { api } from '../../../../../convex/_generated/api';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type ProjectSettingsCardsType = {
  projectId: Id<'projects'>;
};

const ProjectSettingsCards = ({ projectId }: ProjectSettingsCardsType) => {
  const [isLoading, setIsLoading] = useState(false);
  const userRole = useQuery(api.projects.getUserRole, { projectId });
  const projectData = useQuery(api.projects.getProject, {
    projectId,
  });

  const router = useRouter();

  const updateProject = useMutation(api.projects.updateProject);
  const getUploadUrl = useMutation(api.utils.generateUploadUrl);
  const getDownloadUrl = useMutation(api.utils.generateDownloadUrl);
  const deleteProject = useMutation(api.projects.deleteProject);
  const leaveProject = useMutation(api.projects.leaveProject);

  const isOwner = userRole === 'owner';

  return (
    <ul className='w-full flex flex-col gap-4'>
      {userRole !== 'member' ? (
        <>
          <SettingsCard
            title='Project Name'
            description='Please enter the project name that all memebers are able to see.'
            footerComment='Min 3 and Max 30 characters'
            formChild={
              <Input
                name='name'
                className='bg-background-2'
                defaultValue={projectData?.name}
                type='text'
                minLength={3}
                maxLength={30}
                placeholder='e.g. Front-End Team'
                onBlur={e =>
                  updateProject({
                    projectId,
                    projectData: { name: e.target.value },
                  })
                }
              />
            }
          />

          <SettingsCard
            title='Project Status'
            description='Set the stage of your project.'
            footerComment={`It helps organize the status of your projects.`}
            formChild={
              <Select
                onValueChange={val =>
                  updateProject({
                    projectId,
                    projectData: {
                      status: val as 'active' | 'inactive' | 'mantainance',
                    },
                  })
                }
                value={projectData?.status}
              >
                <SelectTrigger
                  id='status'
                  className='bg-background-2'
                >
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='active'>
                    <Badge
                      text='Active'
                      color='green'
                      decorated
                    />
                  </SelectItem>
                  <SelectItem value='mantainance'>
                    <Badge
                      text='Mantainance'
                      color='red'
                      decorated
                    />
                  </SelectItem>
                  <SelectItem value='inactive'>
                    <Badge
                      text='Inactive'
                      color='blue'
                      decorated
                    />
                  </SelectItem>
                </SelectContent>
              </Select>
            }
          />

          <SettingsCard
            title='Avatar'
            description='Upload a custom image or emoji from your files.'
            footerComment={`It's recommended to have one.`}
            formChild={
              <form>
                <Label
                  htmlFor='profileImg'
                  className='flex px-3 items-center gap-4 cursor-pointer hover:underline'
                >
                  <Avatar className='size-14 rounded-md'>
                    <AvatarImage src={projectData?.image} />
                    <AvatarFallback className='bg-background-2 border border-border-1 rounded-md text-text-2'>
                      <HiOutlineCodeBracket size={24} />
                    </AvatarFallback>
                  </Avatar>
                  Choose image
                </Label>
                <Input
                  onChange={async e => {
                    if (!e.target.files?.[0]) return;

                    const uploadUrl = await getUploadUrl();
                    const response = await fetch(uploadUrl, {
                      method: 'POST',
                      body: e.target.files?.[0],
                    });

                    const { storageId } = await response.json();
                    const imageUrl = await getDownloadUrl({ storageId });
                    updateProject({
                      projectId,
                      projectData: { image: imageUrl },
                    });
                  }}
                  className='hidden'
                  type='file'
                  accept='image/*'
                  id='profileImg'
                />
              </form>
            }
          />
        </>
      ) : null}

      <SettingsCard
        title={isOwner ? 'Delete Project' : 'Leave Project'}
        description={
          isOwner
            ? `Permanently remove your project and all of its data from Profuctify.
        This action is not reversible.`
            : `Leaving the project will not delete any data realted to you or to the project.`
        }
        danger
        formChild={
          <>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className='flex justify-end'>
                  <Button
                    size='sm'
                    variant='destructive'
                  >
                    {isOwner ? 'Delete project' : 'Leave project'}
                  </Button>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                {isOwner ? (
                  <AlertDialogHeader className='text-start'>
                    <AlertDialogTitle>Delete Project</AlertDialogTitle>
                    <AlertDialogDescription className='text-text-2'>
                      This will permanently remove this project and all of it's
                      information.
                      <span className='text-text-1 font-semibold'>
                        This action is not reversible.
                      </span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                ) : (
                  <AlertDialogHeader className='text-start'>
                    <AlertDialogTitle>Leave Project</AlertDialogTitle>
                    <AlertDialogDescription className='text-text-2'>
                      You are leaving this project.
                      <span className='text-text-1 font-semibold'>
                        You area able to re-join the project.
                      </span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                )}
                <AlertDialogFooter className='flex flex-row justify-between'>
                  <AlertDialogCancel asChild>
                    <Button
                      variant='ghost'
                      size='sm'
                    >
                      Cancel
                    </Button>
                  </AlertDialogCancel>
                  <Button
                    isLoading={isLoading}
                    variant='destructive'
                    size='sm'
                    onClick={async () => {
                      try {
                        setIsLoading(true);
                        if (isOwner) {
                          await deleteProject({ projectId });
                          toast.success('Project deleted successfully');
                        } else {
                          await leaveProject({ projectId });
                          toast.success('You left the project successfully');
                        }
                      } catch (err) {
                        toast.error('Failed to perform this action');
                      } finally {
                        router.push('/projects');
                        setIsLoading(false);
                      }
                    }}
                  >
                    Confirm
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        }
      />
    </ul>
  );
};

export default ProjectSettingsCards;
