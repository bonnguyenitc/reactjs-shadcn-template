import { Link } from '@tanstack/react-router';
import { ModeToggle } from './mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useAuthStore } from '@/stores';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserApi } from '@/features/auth/api/auth';
import { useEffect } from 'react';

export function AuthNav() {
  const setUserInfo = useAuthStore((state) => state.setInfoUserAction);
  // fetch user info
  const { data } = useQuery({
    queryKey: ['get-user-info'],
    queryFn: getUserApi,
  });

  useEffect(() => {
    setUserInfo(data);
  }, []);

  const logout = useAuthStore((state) => state.logoutAction);
  return (
    <ul className="w-full flex justify-between items-center h-[60px] p-[16px]  shadow-md bg-white dark:bg-black dark:text-white">
      <li>
        <Link to="/">
          <img src="/vite.svg" alt="Vite Logo" className="dark:invert" />
        </Link>
      </li>
      <li className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="mr-4">
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/29059779?v=4"
                alt={data?.email}
              />
              <AvatarFallback>{data?.email?.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {data?.email && (
              <DropdownMenuItem>
                <p>
                  Welcome,
                  <strong>{' ' + data?.email}</strong>
                </p>
              </DropdownMenuItem>
            )}
            <Link to="/profile">
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Đăng xuất</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </li>
    </ul>
  );
}
