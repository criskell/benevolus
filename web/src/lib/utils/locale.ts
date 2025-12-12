import { supportedLanguages } from '@/config/locale';
import { headers } from 'next/headers';

export const detectLocale = async () => {
  const headersStore = await headers();

  const accept = headersStore.get('accept-language') || '';
  const preferred = accept.split(',')[0]?.split('-')[0];

  return supportedLanguages.includes(preferred) ? preferred : 'en';
};
