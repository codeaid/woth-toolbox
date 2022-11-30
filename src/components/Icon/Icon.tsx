import classnames from 'classnames';
import {
  ForwardedRef,
  forwardRef,
  FunctionComponent,
  SVGProps,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { isZoneMarker } from 'lib/markers';
import { NeedZoneMarkerType } from 'types/markers';
import DefaultIcon from './assets/Default.svg';
import { iconMap, zoneMap } from './config';
import { IconProps } from './types';
import styles from './Icon.module.css';

export const Icon = forwardRef(
  (props: IconProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      className,
      highlighted = false,
      size = 128,
      style,
      title,
      type,
      onClick,
      onLongPress,
    } = props;

    // Long press timeout handle
    const longPressHandle = useRef<NodeJS.Timeout>();

    // Generate component class name
    const classNames = useMemo(
      () =>
        classnames(
          styles.Icon,
          {
            [styles.IconHighlighted]: highlighted,
          },
          className,
        ),
      [className, highlighted],
    );

    // Retrieve image source file for the current type
    const image = useMemo(() => {
      // Use static image assets
      if (isZoneMarker(type)) {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt=""
            height={size}
            src={zoneMap[type as NeedZoneMarkerType]}
            width={size}
          />
        );
      }

      // Use SVG icons when available
      const Component: FunctionComponent<SVGProps<SVGElement>> =
        iconMap[type] ?? DefaultIcon;

      return <Component height={size} width={size} />;
    }, [size, type]);

    /**
     * Cancel long press timer if set
     */
    const handleTouchEnd = useCallback(
      () => clearTimeout(longPressHandle.current),
      [],
    );

    /**
     * Start timer to detect long presses on the icon
     */
    const handleTouchStart = useCallback(() => {
      if (!onLongPress) {
        return;
      }

      longPressHandle.current = setTimeout(onLongPress, 500);
    }, [onLongPress]);

    return (
      <div
        className={classNames}
        ref={ref}
        style={style}
        title={title}
        onClick={onClick}
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
      >
        {image}
      </div>
    );
  },
);

Icon.displayName = 'Icon';
