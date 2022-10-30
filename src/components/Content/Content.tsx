import styles from './Content.module.css';
import { ContentProps } from './types';

export const Content = (props: ContentProps) => {
  const { children } = props;

  return (
    <div className={styles.Content}>
      <div className={styles.ContentBody}>{children}</div>
    </div>
  );
};
