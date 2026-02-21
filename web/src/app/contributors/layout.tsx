import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contribuidores',
  description:
    'Conheça as pessoas incríveis que contribuem para o Benevolus: desenvolvedores, designers e entusiastas de open-source.',
};

const ContributorsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return children;
};

export default ContributorsLayout;
