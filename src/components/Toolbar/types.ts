import { NavLinkProps } from 'components/NavLink';

export interface ToolbarProps {
  actions: Array<NavLinkProps>;
  responsiveTitle: string;
  subtitle: string;
  title: string;
}
