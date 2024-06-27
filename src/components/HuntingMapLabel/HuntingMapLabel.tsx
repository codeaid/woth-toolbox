import clsx from 'clsx';
import { useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';
import { Transition } from 'react-transition-group';
import { useTranslator } from 'hooks';
import type { HuntingMapLabelProps } from './types';
import styles from './HuntingMapLabel.module.css';

export const HuntingMapLabel = (props: HuntingMapLabelProps) => {
  const {
    coords,
    name,
    habitat,
    mapScale,
    maxMapScale,
    minMapScale,
    visible = true,
  } = props;

  // Reference to the parent label element
  const ref = useRef<HTMLDivElement>(null);

  // Retrieve application translator
  const translate = useTranslator();

  // Generate CSS styles to apply to the parent element
  const style = useMemo<CSSProperties>(() => {
    const [left, top] = coords;

    return {
      left: `${left * 100}%`,
      top: `${top * 100}%`,
    };
  }, [coords]);

  // Determine if the label is visible at current map scale
  const visibleAtScale = useMemo(
    () => mapScale >= minMapScale && mapScale <= maxMapScale,
    [mapScale, maxMapScale, minMapScale],
  );

  return (
    <Transition
      in={visible && visibleAtScale}
      mountOnEnter
      nodeRef={ref}
      timeout={100}
      unmountOnExit
    >
      {state => (
        <div
          className={clsx(styles.HuntingMapLabel, {
            [styles.HuntingMapLabelStateEntering]: state === 'entering',
            [styles.HuntingMapLabelStateEntered]: state === 'entered',
            [styles.HuntingMapLabelStateExiting]: state === 'exiting',
            [styles.HuntingMapLabelStateExited]: state === 'exited',
          })}
          ref={ref}
          style={style}
        >
          <div className={styles.HuntingMapLabelTitle}>{translate(name)}</div>
          <hr className={styles.HuntingMapLabelSeparator} />
          <div className={styles.HuntingMapLabelSubtitle}>
            {translate(habitat)}
          </div>
          <div className={styles.HuntingMapLabelBlur}>&#8203;</div>
        </div>
      )}
    </Transition>
  );
};
