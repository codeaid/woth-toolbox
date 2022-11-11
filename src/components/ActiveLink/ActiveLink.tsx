import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ActiveLinkProps } from './types';

export const ActiveLink = (props: ActiveLinkProps) => {
  const {
    activeClassName = 'active',
    children,
    className,
    ...linkProps
  } = props;

  const { asPath, isReady } = useRouter();

  const [internalClassName, setInternalClassName] = useState(className);

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

    // Generate and set the new class name
    const newClass = classnames(className, {
      [activeClassName]: currentPath === targetPath,
    });

    setInternalClassName(newClass);
  }, [
    activeClassName,
    asPath,
    className,
    internalClassName,
    isReady,
    linkProps.as,
    linkProps.href,
  ]);

  return (
    <Link {...linkProps} className={internalClassName}>
      {children}
    </Link>
  );
};
