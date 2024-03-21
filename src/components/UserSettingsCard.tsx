import type { ReactElement } from 'react';

type SettingsCardType = {
  title: string;
  description: string;
  danger?: boolean;
  formChild: ReactElement;
  action: any;
};

const UserSettingsCard = ({
  title,
  description,
  danger = false,
  formChild,
  action,
}: SettingsCardType) => {
  return (
    <li
      className={`w-full bg-background-1 rounded-lg border ${
        danger ? 'border-background-danger' : 'border-border-1'
      } p-4`}
    >
      <h3 className='text-text-1 text-lg font-semibold'>{title}</h3>
      <p className='text-text-2 text-sm mb-5'>{description}</p>
      <form action={action}>{formChild}</form>
    </li>
  );
};

export default UserSettingsCard;
