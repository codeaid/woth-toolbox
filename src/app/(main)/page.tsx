import { redirect, RedirectType } from 'next/navigation';
import { baseUrlAnimals } from 'config/routing';

const HomePage = () => redirect(baseUrlAnimals, RedirectType.replace);

export default HomePage;
