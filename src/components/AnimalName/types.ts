import type { Animal } from 'types/animals';

type AnimalNameResponsiveType = 'mobile' | 'tablet';

export interface AnimalNameProps {
  animal: Animal;
  highlighted?: boolean;
  responsive?: AnimalNameResponsiveType;
}
