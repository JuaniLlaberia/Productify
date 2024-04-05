import { HiOutlineExclamationCircle } from 'react-icons/hi2';

type ErrorType = {
  error: string;
};

const Error = ({ error }: ErrorType) => {
  return (
    <>
      {error ? (
        <p className='flex items-center gap-1 text-text-danger mb-2 text-sm'>
          <HiOutlineExclamationCircle size={17} />
          {error}
        </p>
      ) : null}
    </>
  );
};

export default Error;
