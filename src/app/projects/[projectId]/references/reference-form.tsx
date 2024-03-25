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
import { createReference } from '@/lib/actions/references-actions';

const ReferenceForm = ({ projectId }: { projectId: string }) => {
  const createRefWithId = createReference.bind(null, projectId);

  return (
    <form action={createRefWithId}>
      <Label htmlFor='name'>Name</Label>
      <Input
        id='name'
        name='name'
        placeholder='Reference name'
      />
      <Label htmlFor='reference'>Link</Label>
      <Input
        id='reference'
        name='reference'
        placeholder='Reference link'
      />
      <Label htmlFor='type'>Type</Label>
      <Select name='type'>
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
      <FormBtn className='w-full mt-3'>Add</FormBtn>
    </form>
  );
};

export default ReferenceForm;
