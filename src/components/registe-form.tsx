/* eslint-disable react/no-unescaped-entities */

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { AlertError } from './alert-error';
import { useState } from 'react';
import { AlertSuccess } from './alert-success';
import { useMutation } from '@tanstack/react-query';
import { ReloadIcon } from '@radix-ui/react-icons';
import { registerApi } from '@/features/auth/api/auth';
import { Link } from '@tanstack/react-router';

const formSchema = z
  .object({
    email: z.string().email({
      message: 'Vui lòng nhập địa chỉ email hợp lệ',
    }),
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

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // visible password
  const [visiblePassword, setVisiblePassword] = useState(false);
  const toggleVisiblePassword = () => setVisiblePassword((prev) => !prev);

  // visible confirm password
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const toggleVisibleConfirmPassword = () => setVisibleConfirmPassword((prev) => !prev);

  const { mutate: createUserMutation, isPending } = useMutation({
    mutationKey: ['register'],
    mutationFn: registerApi,
    onMutate: () => {
      setError(null);
      setMessage(null);
    },
    onSuccess: () => {
      setMessage('Đăng ký thành công. Vui lòng kiểm tra email để xác nhận tài khoản.');
    },
    onError: (error: any) => {
      switch (error?.code) {
        case 'EMAIL_EXIST':
          setError('Email đã tồn tại. Vui lòng chọn email khác.');
          break;
        default:
          setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
          break;
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createUserMutation({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <Card className="mx-auto w-96">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Đăng ký</CardTitle>
        <CardDescription>Hãy đăng ký để trải nghiệm những dịch vụ thú vị</CardDescription>
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
                          onClick={toggleVisiblePassword}
                          className="absolute right-1 h-7 w-7"
                          size="icon"
                          variant="ghost"
                          type="button"
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
                            className="absolute right-1 h-7 w-7"
                            size="icon"
                            variant="ghost"
                            type="button"
                          >
                            {visibleConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <EyeIcon className="h-4 w-4" />
                            )}
                            <span className="sr-only">Toggle password visibility</span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={isPending} className="w-full" type="submit">
                {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                Đăng ký
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Bạn đã có tài khoản?
          <Link className="underline" to="/login">
            Đăng nhập
          </Link>
        </div>
        <div className="mt-6">
          {error && <AlertError message={error} />}
          {message && <AlertSuccess message={message} />}
        </div>
      </CardContent>
    </Card>
  );
}
