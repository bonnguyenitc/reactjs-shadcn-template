import { MainNav } from '@/components/main-nav';

type Props = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: Props) => {
  return (
    <>
      <MainNav />
      {children}
    </>
  );
};
