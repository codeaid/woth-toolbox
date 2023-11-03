import type { LinkProps } from 'next/link';
import type { PropsWithChildren } from 'react';

export type NavLinkProps = PropsWithChildren<LinkProps> & {
  active?: boolean;
  activeClassName?: string;
  className?: string;
  exact?: boolean;
};
