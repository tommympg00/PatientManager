import { BoltIcon } from '@heroicons/react/24/solid';

import { Title } from './Title';

export const Header = () => {
  return (
    <header className="flex gap-1 justify-center items-center h-16 bg-primary">
      <BoltIcon className="ml-4 w-8 h-8 text-primary-foreground" />
      <Title className="text-primary-foreground">Patient Manager</Title>
    </header>
  );
};
