import type { HTMLAttributes } from 'react';

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  size: 1 | 2 | 3 | 4 | 5 | 6;
};
