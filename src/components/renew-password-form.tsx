/* eslint-disable react/no-unescaped-entities */

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { EyeIcon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { ButtonLoading } from './button-loading';
import { AlertError } from './alert-error';
import { AlertSuccess } from './alert-success';
import { useState } from 'react';
import { resetPasswordApi } from '@/features/auth/api/auth';
import { Link } from '@tanstack/react-router';

const formSchema = z
  .object({
    password: z.string().min(8, {
      message: 'Vui lòng nhập mật khẩu có ít nhất 8 ký tự.',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Vui lòng nhập mật khẩu có ít nhất 8 ký tự',
    }),
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp. Vui lòng nhập lại.',
    path: ['confirmPassword'],
  });

export function RenewPasswordForm({ token }: { token: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const [visiblePassword, setVisiblePassword] = useState(false);
  const toggleVisiblePassword = () => setVisiblePassword((prev) => !prev);

  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const toggleVisibleConfirmPassword = () => setVisibleConfirmPassword((prev) => !prev);

  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: resetPasswordApi,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      password: values.password,
      token,
    });
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center">
        <AlertSuccess message="Tạo mật khẩu mới thành công." />
        <Button className="mt-4">
          <Link to="/login">Đăng nhập</Link>
        </Button>
      </div>
    );
  }

  return (
    <Card className="mx-auto w-96">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Tạo mới mật khẩu</CardTitle>
        <CardDescription>Hãy thực hiện để tạo mật khẩu mới</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Mật khẩu</Label>
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
                          <EyeIcon className="h-4 w-4" />
                          <span className="sr-only">Toggle password visibility</span>
                        </Button>
                      </div>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Nhập lại mật khẩu</Label>
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="my-6">
                      <FormControl>
                        <div className="relative flex flex-col justify-center">
                          <Input
                            placeholder=""
                            type={visibleConfirmPassword ? 'text' : 'password'}
                            {...field}
                          />
                          <Button
                            onClick={toggleVisibleConfirmPassword}
                            type="button"
                            className="absolute right-1 h-7 w-7"
                            size="icon"
                            variant="ghost"
                          >
                            <EyeIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle password visibility</span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
              <ButtonLoading loading={isPending} label="Tạo mật khẩu mới" type="submit" />
              {isError && <AlertError message="Đã có lỗi xảy ra. Vui lòng thử lại sau." />}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
