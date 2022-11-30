import classnames from 'classnames';
import {
  ForwardedRef,
  forwardRef,
  FunctionComponent,
  SVGProps,
  useMemo,
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
    } = props;

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

    return (
      <div
        className={classNames}
        ref={ref}
        style={style}
        title={title}
        onClick={onClick}
      >
        {image}
      </div>
    );
  },
);

Icon.displayName = 'Marker';
