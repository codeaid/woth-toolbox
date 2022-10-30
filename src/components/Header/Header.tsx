import Image from 'next/image';
import { baseUrl } from 'config/app';
import styles from './Header.module.css';
import { HeaderProps } from './types';

export const Header = (props: HeaderProps) => {
  const { children } = props;

  return (
    <div className={styles.Header}>
      <Image
        alt="logo"
        draggable={false}
        height={35}
        priority={false}
        src={`${baseUrl}/img/logo.png`}
        width={150}
      />
      <div className={styles.HeaderText}>{children}</div>
    </div>
  );
};
