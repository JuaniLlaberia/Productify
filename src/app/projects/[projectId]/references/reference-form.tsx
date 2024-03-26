import FormBtn from '@/components/form-btn';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  createReference,
  updateReference,
} from '@/lib/actions/references-actions';

type ReferenceFormType = {
  projectId: string;
  isEditMode?: boolean;
  prevData?: any;
};

const ReferenceForm = ({
  projectId,
  isEditMode = false,
  prevData,
}: ReferenceFormType) => {
  const createRefWithId = createReference.bind(null, projectId);
  const updatetRefWithId = updateReference.bind(null, {
    projectId,
    refId: prevData?._id,
    isPinned: prevData?.isPinned || false,
  });

  return (
    <form action={isEditMode ? updatetRefWithId : createRefWithId}>
      <Label htmlFor='name'>Name</Label>
      <Input
        id='name'
        name='name'
        placeholder='Reference name'
        defaultValue={prevData?.name}
      />
      <Label htmlFor='type'>Type</Label>
      <Select
        defaultValue={prevData?.type}
        name='type'
      >
        <SelectTrigger id='type'>
          <SelectValue placeholder='Select type' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='github'>Github</SelectItem>
          <SelectItem value='gitlab'>Gitlab</SelectItem>
          <SelectItem value='stackoverflow'>StackOverflow</SelectItem>
          <SelectItem value='documentation'>Documentation</SelectItem>
          <SelectItem value='other'>Other</SelectItem>
        </SelectContent>
      </Select>
      <Label htmlFor='reference'>Link</Label>
      <Input
        defaultValue={prevData?.reference}
        id='reference'
        name='reference'
        placeholder='Reference link'
      />
      <FormBtn className='w-full mt-3'>{isEditMode ? 'Edit' : 'Add'}</FormBtn>
    </form>
  );
};

export default ReferenceForm;
