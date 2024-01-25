import { AuthNav } from '@/components/auth-nav';

type PageProps = {
  searchParams: { error?: string };
};

export function DashboardPage(props: PageProps) {
  return (
    <>
      <AuthNav />
      <div className="container flex flex-col flex-1 p-6">
        <p className="text-[32px] font-mono font-bold italic text-justify">Dashboard Page</p>
      </div>
    </>
  );
}
