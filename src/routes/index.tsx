import { RouterProvider } from '@tanstack/react-router';
import { useAuthStore } from '@/stores';
import { useEffect } from 'react';
import { router } from './router';

export const AppRoutes = () => {
  const { checkLoggedAction } = useAuthStore();

  useEffect(() => {
    checkLoggedAction();
  }, [checkLoggedAction]);

  return (
    <div className="flex min-h-screen flex-col">
      <RouterProvider router={router} />
    </div>
  );
};
