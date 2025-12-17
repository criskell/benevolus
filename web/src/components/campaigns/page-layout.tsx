import { ReactNode } from 'react';

interface PageLayoutProps {
  sidebar: ReactNode;
  main: ReactNode;
}

export const PageLayout = ({ sidebar, main }: PageLayoutProps) => {
  return (
    <div className="flex h-screen">
      <aside className="hidden lg:block w-80 bg-background border-r border-divider overflow-y-auto">
        {sidebar}
      </aside>

      <main className="flex-1 overflow-y-auto">
        {main}
      </main>
    </div>
  );
};