import { useRouter } from 'next/router';

/**
 * Retrieve currently used locale
 */
export const useLocale = () => {
  const { locale } = useRouter();

  return locale ?? 'en';
};
