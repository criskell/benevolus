export type Campaign = {
  slug: string;
  category: string;
  title: string;
  image: string;
  daysRemaining: number;
  progressPercent: number;
  raised: number;
  goal: number;
}

export type Filters = {
  categories: string[];
  tags: string[];
}

export type StatusFilter =
  | 'Abertas'
  | 'Recentes'
  | 'Perto de encerrar'
  | 'Encerradas'
  | 'Metas batidas'
  | 'Maiores arrecadações'
  | 'Todas';

export type TimeFilter =
  | 'Desde o início'
  | 'Últimos 7 dias'
  | 'Últimos 14 dias'
  | 'Mês passado'
  | 'Este mês'
  | 'Últimos 3 meses'
  | 'Este ano';