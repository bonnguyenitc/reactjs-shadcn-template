import { RegisterForm } from '@/components/registe-form';
import { AuthLayout } from '../../components/layout';

export function RegisterPage() {
  return (
    <AuthLayout>
      <div className="container flex flex-col flex-1 pt-6">
        <RegisterForm />
      </div>
    </AuthLayout>
  );
}
