import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { verifyTokenEmailApi } from '@/features/auth/api/auth';
import { useMutation } from '@tanstack/react-query';
import { Link, useParams } from '@tanstack/react-router';
import { Check } from 'lucide-react';
import { useEffect } from 'react';
import { AuthLayout } from '../../components/layout';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export function VerifyEmailPage() {
  const {
    mutate: verifyEmailMutation,
    isError,
    isSuccess,
  } = useMutation({
    mutationKey: ['verifyEmail'],
    mutationFn: verifyTokenEmailApi,
  });

  const { token } = useParams({ strict: false });

  useEffect(() => {
    if (token) {
      verifyEmailMutation(token);
    }
  }, [token]);

  return (
    <AuthLayout>
      <div className="container flex flex-col flex-1 pt-6">
        <Alert>
          {isError && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle className="text-red-400">Lỗi</AlertTitle>
              <AlertDescription className="text-red-400">
                Xác nhận tài khoản không thành công.
              </AlertDescription>
            </Alert>
          )}
          {isSuccess && (
            <AlertTitle className="text-green-500">Xác nhận tài khoản thành công.</AlertTitle>
          )}
          {isSuccess && (
            <AlertDescription>
              <Button className="mt-4">
                <Link to="/login">Đăng nhập</Link>
              </Button>
            </AlertDescription>
          )}
        </Alert>
      </div>
    </AuthLayout>
  );
}
