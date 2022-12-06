import { NavLinkProps } from 'components/NavLink';

export interface ToolbarProps {
  actions: Array<NavLinkProps>;
  subtitle: string;
  title: string;
}
