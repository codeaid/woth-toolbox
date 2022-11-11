import type { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

export type ActiveLinkProps = PropsWithChildren<LinkProps> & {
  activeClassName?: string;
  className?: string;
};
