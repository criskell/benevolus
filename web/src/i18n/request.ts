import { getRequestConfig } from 'next-intl/server';

import { detectLocale } from '@/lib/utils/locale';

export default getRequestConfig(async () => {
  const locale = await detectLocale();

  return {
    locale,
    messages: (await import(`../../i18n/${locale}.json`)).default,
  };
});
