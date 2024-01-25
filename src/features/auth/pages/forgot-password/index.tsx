import { ForgotPasswordForm } from '@/components/forgot-password-form';
import { AuthLayout } from '../../components/layout';

export function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="container flex flex-col flex-1 pt-6">
        <ForgotPasswordForm />
      </div>
    </AuthLayout>
  );
}
