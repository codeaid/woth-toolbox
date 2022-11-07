import Image from 'next/image';
import { baseUrl } from 'config/app';
import styles from './Toolbar.module.css';
import { ToolbarProps } from './types';

export const Toolbar = (props: ToolbarProps) => {
  const { children } = props;

  return (
    <div className={styles.Toolbar}>
      <Image
        alt="logo"
        draggable={false}
        height={35}
        priority={false}
        src={`${baseUrl}/img/logo.png`}
        width={150}
      />
      <div className={styles.ToolbarText}>{children}</div>
    </div>
  );
};
