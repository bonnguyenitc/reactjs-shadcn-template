import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { useMutation } from '@tanstack/react-query';
import { sendTokenResetPasswordApi } from '@/features/auth/api/auth';
import { ButtonLoading } from './button-loading';
import { AlertSuccess } from './alert-success';
import { AlertError } from './alert-error';

const formSchema = z.object({
  email: z.string().email({
    message: 'Vui lòng nhập địa chỉ email hợp lệ',
  }),
});

export function ForgotPasswordForm() {
  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationKey: ['forgotPassword'],
    mutationFn: sendTokenResetPasswordApi,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values.email);
  }

  return (
    <Card className="mx-auto w-96">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Quên mật khẩu</CardTitle>
        <CardDescription>Vui lòng thực hiện để tạo lại mật khẩu mới của bạn</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="" type="email" {...field} />
                      </FormControl>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
              <ButtonLoading loading={isPending} type="submit" label="Gởi email xác nhận" />
              {isSuccess && <AlertSuccess message="Đã gởi mail. Vui lòng kiểm tra email của bạn" />}
              {isError && <AlertError message="Đã có lỗi xảy ra. Vui lòng thử lại sau." />}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
