import { LoginForm } from '@/components/login-form';
import { AuthLayout } from '../../components/layout';

export function LoginPage() {
  return (
    <AuthLayout>
      <div className="container flex flex-col flex-1 pt-6">
        <LoginForm />
      </div>
    </AuthLayout>
  );
}
