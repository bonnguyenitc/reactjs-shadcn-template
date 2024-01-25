import { MainNav } from '@/components/main-nav';
import { RenewPasswordForm } from '@/components/renew-password-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { verifyTokenResetTokenApi } from '@/features/auth/api/auth';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useMutation } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useEffect } from 'react';

export function ResetPasswordPage() {
  const {
    mutate: verifyTokenResetPasswordMutation,
    isError,
    isSuccess,
  } = useMutation({
    mutationKey: ['verifyTokenResetToken'],
    mutationFn: verifyTokenResetTokenApi,
  });

  const { token } = useParams({ strict: false });

  useEffect(() => {
    if (token) {
      verifyTokenResetPasswordMutation(token);
    }
  }, [token]);

  return (
    <>
      <MainNav />
      <div className="container flex flex-col flex-1 pt-6">
        {isError && (
          <Alert variant="default">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle className="text-red-400">Lỗi</AlertTitle>
            <AlertDescription className="text-red-400">
              Mã xác nhận không hợp lệ. Vui lòng thử lại.
            </AlertDescription>
          </Alert>
        )}
        {isSuccess && token && <RenewPasswordForm token={token} />}
      </div>
    </>
  );
}
