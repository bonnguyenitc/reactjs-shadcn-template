import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { AlertError } from './alert-error';
import { Link } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { loginApi } from '@/features/auth/api/auth';
import { ButtonLoading } from './button-loading';
import { useAuthStore } from '@/stores';

const formSchema = z.object({
  email: z.string().email({
    message: 'Vui lòng nhập địa chỉ email hợp lệ',
  }),
  password: z.string().min(8, {
    message: 'Vui lòng nhập mật khẩu có ít nhất 8 ký tự.',
  }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLoginSuccess = useAuthStore((state) => state.loginSuccessAction);

  const { mutate, isError, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginApi,
    onSuccess: (data) => {
      handleLoginSuccess(data.access_token);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      email: values.email,
      password: values.password,
    });
  }

  const [visiblePassword, setVisiblePassword] = useState(false);
  const toggleVisiblePassword = () => setVisiblePassword((prev) => !prev);

  return (
    <Card className="mx-auto w-96">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Đăng nhập</CardTitle>
        <CardDescription>Chúng tôi đang chờ bạn, hãy tham gia ngay</CardDescription>
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
              <div className="relative space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link className="ml-auto inline-block text-sm underline" to="/forgot-password">
                    Quên mật khẩu
                  </Link>
                </div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="my-6">
                      <div className="relative flex flex-col justify-center">
                        <Input
                          placeholder=""
                          type={visiblePassword ? 'text' : 'password'}
                          {...field}
                        />
                        <Button
                          type="button"
                          onClick={toggleVisiblePassword}
                          className="absolute right-1 h-7 w-7"
                          size="icon"
                          variant="ghost"
                        >
                          {visiblePassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <EyeIcon className="h-4 w-4" />
                          )}
                          <span className="sr-only">Toggle password visibility</span>
                        </Button>
                      </div>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
              <ButtonLoading
                loading={isPending}
                className="w-full"
                type="submit"
                label="Đăng nhập"
              />
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Bạn chưa có tài khoản?
          <Link className="underline" to="/register">
            Đăng ký ngay
          </Link>
        </div>
        {isError && (
          <div className="mt-6">
            <AlertError message="Đã có lỗi xảy ra. Vui lòng thử lại sau!" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
