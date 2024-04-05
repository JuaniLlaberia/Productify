import type { ReactElement } from 'react';

type SettingsCardType = {
  title: string;
  description: string;
  footerComment?: string;
  danger?: boolean;
  formChild: ReactElement;
};

const SettingsCard = ({
  title,
  description,
  footerComment,
  danger = false,
  formChild,
}: SettingsCardType) => {
  return (
    <li
      className={`w-full bg-background-1 rounded-lg overflow-hidden border ${
        danger ? 'border-background-danger' : 'border-border-1'
      }`}
    >
      <div className='p-4'>
        <h3 className='text-text-1 text-lg font-semibold'>{title}</h3>
        <p className='text-text-2 text-sm mb-5'>{description}</p>
        <>{formChild}</>
      </div>
      {footerComment && (
        <p className='bg-background-2 text-text-2 text-sm p-2.5 text-center'>
          {footerComment}
        </p>
      )}
    </li>
  );
};

export default SettingsCard;
