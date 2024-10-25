import { Title } from './Title';

export const Header = () => {
  return (
    <header className="flex justify-center items-center h-16 bg-primary">
      <Title className="text-primary-foreground">Lightit Challenge</Title>
    </header>
  );
};
