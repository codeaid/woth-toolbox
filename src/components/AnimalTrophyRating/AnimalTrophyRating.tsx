import clsx from 'clsx';
import { useMemo } from 'react';
import { RiCheckboxBlankCircleFill, RiStarSFill } from 'react-icons/ri';
import { times } from 'lib/utils';
import type { AnimalTrophyRatingProps } from './types';
import styles from './AnimalTrophyRating.module.css';

export const AnimalTrophyRating = (props: AnimalTrophyRatingProps) => {
  const { className, placeholders = true, rating, style } = props;

  // Combine default and custom class names
  const classNames = useMemo(
    () => clsx(styles.AnimalRating, className),
    [className],
  );

  // Determine number of stars to render
  const starCount = useMemo(() => Math.max(0, Math.min(5, rating)), [rating]);

  // Number of remaining placeholders to fill the slots
  const placeholderCount = useMemo(
    () => (placeholders ? Math.max(0, 5 - starCount) : 0),
    [placeholders, starCount],
  );

  // Render list of placeholders to fill the remaining spaces
  const renderedPlaceholders = useMemo(
    () =>
      times(placeholderCount, index => (
        <div className={styles.AnimalRatingIcon} key={`d:${index}`}>
          <RiCheckboxBlankCircleFill
            className={styles.AnimalRatingPlaceholder}
          />
        </div>
      )),
    [placeholderCount],
  );

  // Render list of trophy rating stars
  const renderedStars = useMemo(
    () =>
      times(starCount, index => (
        <div className={styles.AnimalRatingIcon} key={`s:${index}`}>
          <RiStarSFill />
        </div>
      )),
    [starCount],
  );

  return (
    <div className={classNames} style={style}>
      {renderedStars}
      {renderedPlaceholders}
    </div>
  );
};
