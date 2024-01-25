import { AuthNav } from '@/components/auth-nav';
import { LoginForm } from '@/components/login-form';

type PageProps = {
  searchParams: { error?: string };
};

export function ProfilePage({ searchParams }: PageProps) {
  return (
    <>
      <AuthNav />
      <div className="container flex flex-col flex-1 pt-6">
        <p>Profile Page</p>
      </div>
    </>
  );
}
