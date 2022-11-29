import classnames from 'classnames';
import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { HuntingMapLabelProps } from './types';
import styles from './HuntingMapLabel.module.css';

export const HuntingMapLabel = (props: HuntingMapLabelProps) => {
  const { name, habitat, left, mapScale, maxMapScale, minMapScale, top } =
    props;

  const ref = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState<[number, number]>([0, 0]);

  const style = useMemo<CSSProperties>(() => {
    const [width, height] = size;

    return {
      left: `calc(${left * 100}% - ${width / 2}px)`,
      top: `calc(${top * 100}% - ${height / 2}px)`,
    };
  }, [left, size, top]);

  const visible = useMemo(
    () => mapScale >= minMapScale && mapScale <= maxMapScale,
    [mapScale, maxMapScale, minMapScale],
  );

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const { height, width } = ref.current.getBoundingClientRect();
    setSize([width, height]);
  }, []);

  return (
    <Transition
      in={visible}
      mountOnEnter={true}
      nodeRef={ref}
      timeout={150}
      unmountOnExit={true}
    >
      {state => (
        <div
          className={classnames(styles.HuntingMapLabel, {
            [styles.HuntingMapLabelStateEntering]: state === 'entering',
            [styles.HuntingMapLabelStateEntered]: state === 'entered',
            [styles.HuntingMapLabelStateExiting]: state === 'exiting',
            [styles.HuntingMapLabelStateExited]: state === 'exited',
          })}
          ref={ref}
          style={style}
        >
          <div className={styles.HuntingMapLabelTitle}>{name}</div>
          <hr className={styles.HuntingMapLabelSeparator} />
          <div className={styles.HuntingMapLabelSubtitle}>{habitat}</div>
          <div className={styles.HuntingMapLabelBlur}>&#8203;</div>
        </div>
      )}
    </Transition>
  );
};
