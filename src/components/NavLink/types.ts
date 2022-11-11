import type { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

export type NavLinkProps = PropsWithChildren<LinkProps> & {
  activeClassName?: string;
  className?: string;
};
