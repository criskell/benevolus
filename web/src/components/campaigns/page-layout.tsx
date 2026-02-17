import { ReactNode } from 'react';

type PageLayoutProps = {
  sidebar: ReactNode;
  main: ReactNode;
}

export const PageLayout = ({ sidebar, main }: PageLayoutProps) => {
  return (
    <div className="flex relative">
      <aside className="hidden lg:block w-80 bg-background border-r border-divider">
        {sidebar}
      </aside>

      <main className="flex-1">{main}</main>
    </div>
  );
};
