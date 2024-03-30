type ErrorType = {
  error: string;
};

const Error = ({ error }: ErrorType) => {
  return (
    <>
      {error ? <p className='text-text-danger mb-2 text-sm'>{error}</p> : null}
    </>
  );
};

export default Error;
