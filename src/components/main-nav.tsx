import { Link } from '@tanstack/react-router';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import { useAuthStore } from '@/stores';

export function MainNav() {
  const isLogged = useAuthStore((state) => state.isLogged);

  return (
    <ul className="w-full flex justify-between items-center h-[60px] p-[16px] shadow-md bg-white dark:bg-black dark:text-white">
      <li>
        <Link to="/">
          <img src="/vite.svg" alt="Vite Logo" className="dark:invert" />
        </Link>
      </li>
      <li className="flex items-center">
        {isLogged ? (
          <Link to="/trackings">
            <Button className="mr-4">Ứng dụng</Button>
          </Link>
        ) : (
          <Link to="/register">
            <Button className="mr-4">Dùng thử ngay</Button>
          </Link>
        )}
        <ModeToggle />
      </li>
    </ul>
  );
}
