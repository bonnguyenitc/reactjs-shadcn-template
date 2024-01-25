import { Spinner } from '@/components/spinner';
import { lazyImport, storage } from '@/utils';
import { Outlet, RootRoute, Route, Router, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Suspense } from 'react';

const { LoginPage } = lazyImport(() => import('@/features/auth/pages/login'), 'LoginPage');
const { RegisterPage } = lazyImport(() => import('@/features/auth/pages/register'), 'RegisterPage');
const { ResetPasswordPage } = lazyImport(
  () => import('@/features/auth/pages/reset-password'),
  'ResetPasswordPage',
);
const { VerifyEmailPage } = lazyImport(
  () => import('@/features/auth/pages/verify-email'),
  'VerifyEmailPage',
);
const { ForgotPasswordPage } = lazyImport(
  () => import('@/features/auth/pages/forgot-password'),
  'ForgotPasswordPage',
);

const { ProfilePage } = lazyImport(() => import('@/features/profile'), 'ProfilePage');

const { DashboardPage } = lazyImport(() => import('@/features/dashboard'), 'DashboardPage');

const { LandingPage } = lazyImport(() => import('@/features/landing'), 'LandingPage');

export const rootRoute = new RootRoute({
  component: () => (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <Outlet />
      <TanStackRouterDevtools />
    </Suspense>
  ),
});

const handleBeforeLoadUnAuthorize = () => {
  if (storage.getToken()) {
    throw redirect({
      to: '/',
    });
  }
};

const handleBeforeLoadAuthorize = () => {
  if (!storage.getToken()) {
    throw redirect({
      to: '/login',
    });
  }
};

const routeTree = rootRoute.addChildren([
  // public routes
  new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: LandingPage,
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: LoginPage,
    beforeLoad: handleBeforeLoadUnAuthorize,
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: '/register',
    component: RegisterPage,
    beforeLoad: handleBeforeLoadUnAuthorize,
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: '/reset-password/$token',
    component: ResetPasswordPage,
    beforeLoad: handleBeforeLoadUnAuthorize,
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: '/verify-email/$token',
    component: VerifyEmailPage,
    beforeLoad: handleBeforeLoadUnAuthorize,
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: '/forgot-password',
    component: ForgotPasswordPage,
    beforeLoad: handleBeforeLoadUnAuthorize,
  }),
  // protected routes
  new Route({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: DashboardPage,
    beforeLoad: handleBeforeLoadAuthorize,
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: '/profile',
    component: ProfilePage,
    beforeLoad: handleBeforeLoadAuthorize,
  }),
]);

export const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
