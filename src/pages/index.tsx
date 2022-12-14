import { useRouter } from 'next/router';
import { useEffect } from 'react';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    router.push('/animals');
  }, [router]);

  return null;
};

export default HomePage;
