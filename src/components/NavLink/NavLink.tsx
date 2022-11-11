import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { NavLinkProps } from './types';

export const NavLink = (props: NavLinkProps) => {
  const {
    active = false,
    activeClassName = 'active',
    children,
    className,
    ...linkProps
  } = props;

  const { asPath, isReady } = useRouter();

  // Flag indicating that link's href matches the current path
  const [hasPathMatch, setHasPathMatch] = useState(false);

  // Update path match status
  useEffect(() => {
    // Ensure that the router has been initialized
    if (!isReady) {
      return;
    }

    // Dynamic routes are matched via props.as and static ones via props.href
    const targetPath = new URL(
      (linkProps.as || linkProps.href) as string,
      location.href,
    ).pathname;

    // Only keep the actual path part
    const currentPath = new URL(asPath, location.href).pathname;

    setHasPathMatch(currentPath === targetPath);
  }, [asPath, isReady, linkProps.as, linkProps.href]);

  // Generate component's class name
  const componentClassName = useMemo(
    () =>
      classnames(className, {
        [activeClassName]: active || hasPathMatch,
      }),
    [active, activeClassName, className, hasPathMatch],
  );

  return (
    <Link {...linkProps} className={componentClassName}>
      {children}
    </Link>
  );
};
