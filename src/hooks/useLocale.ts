import { useRouter } from 'next/router';

/**
 * Retrieve currently used locale
 */
export const useLocale = () => {
  const { defaultLocale, locale } = useRouter();

  return locale ?? defaultLocale ?? 'en';
};
