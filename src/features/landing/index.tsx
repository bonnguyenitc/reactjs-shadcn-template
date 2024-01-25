import { MainNav } from '@/components/main-nav';

export function LandingPage() {
  return (
    <div className="flex flex-col flex-1">
      <MainNav />
      <div className="flex self-center p-8 max-w-md">
        <p className="text-slate-800 text-[48px]  text-center font-bold dark:text-slate-50">
          Landing Page
        </p>
      </div>
    </div>
  );
}
