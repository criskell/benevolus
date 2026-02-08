import { supportedLanguages } from '@/config/locale';
import { headers, cookies } from 'next/headers';

export const detectLocale = async () => {
  const cookieStore = await cookies();
  const headersStore = await headers();

  // Verificar se há preferência salva em cookie
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  if (savedLocale && supportedLanguages.includes(savedLocale)) {
    return savedLocale;
  }

  // Caso contrário, detectar do header accept-language
  const accept = headersStore.get('accept-language') || '';
  const preferred = accept.split(',')[0]?.split('-')[0];

  return supportedLanguages.includes(preferred) ? preferred : 'en';
};
