import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Missão e Valores',
  description:
    'Conheça a missão e os objetivos do Benevolus: ecossistema baseado no altruísmo, plataforma de campanhas de caridade e open-source.',
};

const MissionLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return children;
};

export default MissionLayout;
