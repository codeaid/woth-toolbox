import { useMemo } from 'react';
import { RiCheckboxBlankCircleFill, RiStarSFill } from 'react-icons/ri';
import { times } from 'lib/utils';
import { AnimalTrophyRatingProps } from './types';
import styles from './AnimalTrophyRating.module.css';

export const AnimalTrophyRating = (props: AnimalTrophyRatingProps) => {
  const { rating } = props;

  // Determine number of stars to render
  const starCount = useMemo(() => Math.max(0, Math.min(5, rating)), [rating]);

  // Number of remaining dots to fill the slots
  const dotCount = useMemo(() => Math.max(0, 5 - starCount), [starCount]);

  // Render list of dots to fill the remaining spaces
  const renderedFillers = useMemo(
    () =>
      times(dotCount, index => (
        <div className={styles.AnimalRatingIcon} key={`d:${index}`}>
          <RiCheckboxBlankCircleFill className={styles.AnimalRatingFiller} />
        </div>
      )),
    [dotCount],
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
    <div className={styles.AnimalRating}>
      {renderedStars}
      {renderedFillers}
    </div>
  );
};
