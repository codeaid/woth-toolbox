import type { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

export type NavLinkProps = PropsWithChildren<LinkProps> & {
  active?: boolean;
  activeClassName?: string;
  className?: string;
  exact?: boolean;
};
