import classnames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AnimalTrophyRating } from 'components/AnimalTrophyRating';
import { Button } from 'components/Button';
import {
  AnimalAgeIcon,
  AnimalSexFemaleIcon,
  AnimalSexMaleIcon,
  AnimalTrophyIcon,
} from 'components/Icon';
import {
  getAnimalAgeName,
  getAnimalRatingSexName,
  getAnimalRatingTrophy,
  isAnimalSexMale,
} from 'lib/animals';
import { AnimalAge, AnimalRating, AnimalSpecimen } from 'types/animals';
import { AnimalEditorGroupBuilderProps } from './types';
import styles from './AnimalEditorGroupBuilder.module.css';

export const AnimalEditorGroupBuilder = (
  props: AnimalEditorGroupBuilderProps,
) => {
  const { data, onChange } = props;

  // List of specimen entries
  const group = useMemo(() => data.group ?? [], [data.group]);

  // Currently selected age and rating values
  const [selectedAge, setSelectedAge] = useState<AnimalAge>('young');
  const [selectedRating, setSelectedRating] = useState<AnimalRating>('M1');

  /**
   * Handle changes to notable specimens
   */
  const handleChange = useCallback(
    (group?: Array<AnimalSpecimen>) => {
      onChange({
        ...data,
        group,
      });
    },
    [data, onChange],
  );

  /**
   * Handle adding a new temporary entry
   */
  const handleConfirm = useCallback(
    () =>
      handleChange([...group, { age: selectedAge, rating: selectedRating }]),
    [group, handleChange, selectedAge, selectedRating],
  );

  /**
   * Handle removing a specimen
   *
   * @param index Index of the specimen to remove
   */
  const handleRemove = useCallback(
    (index: number) =>
      onChange({
        ...data,
        group: group.filter((_, i) => i !== index),
      }),
    [data, group, onChange],
  );

  // Rendered age selector
  const renderedAge = useMemo(
    () => (
      <div className={styles.AnimalEditorGroupBuilderSection}>
        <div className={styles.AnimalEditorGroupBuilderLabel}>Age</div>
        <div
          className={classnames(
            styles.AnimalEditorGroupBuilderButtons,
            styles.AnimalEditorGroupBuilderAgeButtons,
          )}
        >
          {(['young', 'adult', 'mature'] as Array<AnimalAge>).map(age => (
            <Button
              className={classnames(
                styles.AnimalEditorGroupBuilderButtonToggle,
                {
                  [styles.AnimalEditorGroupBuilderButtonToggleActive]:
                    selectedAge === age,
                },
              )}
              key={age}
              onClick={() => setSelectedAge(age)}
            >
              {getAnimalAgeName(age)}
            </Button>
          ))}
        </div>
      </div>
    ),
    [selectedAge],
  );

  // Rendered list of animals added to the herd
  const renderedListContent = useMemo(
    () =>
      group.map((entry, index) => (
        <div className={styles.AnimalEditorGroupBuilderListEntry} key={index}>
          <div
            className={styles.AnimalEditorGroupBuilderListEntryOverlay}
            onClick={() => handleRemove(index)}
          >
            <RiDeleteBin6Line />
          </div>

          <AnimalAgeIcon size={18} />
          <div className={styles.AnimalEditorGroupBuilderListEntryValue}>
            {getAnimalAgeName(entry.age)}
          </div>

          {isAnimalSexMale(entry.rating) ? (
            <AnimalSexMaleIcon size={18} />
          ) : (
            <AnimalSexFemaleIcon size={18} />
          )}
          <div className={styles.AnimalEditorGroupBuilderListEntryValue}>
            {getAnimalRatingSexName(entry.rating)}
          </div>

          <AnimalTrophyIcon size={18} />
          <div className={styles.AnimalEditorGroupBuilderListEntryRating}>
            <AnimalTrophyRating rating={getAnimalRatingTrophy(entry.rating)} />
          </div>
        </div>
      )),
    [group, handleRemove],
  );

  // Rendered list of animals added to the herd
  const renderedList = useMemo(
    () => (
      <div className={styles.AnimalEditorGroupBuilderList}>
        {group.length ? (
          renderedListContent
        ) : (
          <div className={styles.AnimalEditorGroupBuilderListPlaceholder}>
            Add a specimen to the list by selecting its age and rating and
            pressing the <strong>Confirm</strong> button below.
          </div>
        )}
      </div>
    ),
    [group.length, renderedListContent],
  );

  // Rendered sex and rating selector
  const renderedRating = useMemo(
    () => (
      <div className={styles.AnimalEditorGroupBuilderSection}>
        <div className={styles.AnimalEditorGroupBuilderLabel}>Rating</div>
        <div
          className={classnames(
            styles.AnimalEditorGroupBuilderButtons,
            styles.AnimalEditorGroupBuilderRatingButtons,
          )}
        >
          {(['M1', 'M2', 'M3', 'M4', 'M5', 'F'] as Array<AnimalRating>).map(
            rating => (
              <Button
                className={classnames(
                  styles.AnimalEditorGroupBuilderButtonToggle,
                  {
                    [styles.AnimalEditorGroupBuilderButtonToggleActive]:
                      selectedRating === rating,
                  },
                )}
                key={rating}
                onClick={() => setSelectedRating(rating)}
              >
                {rating}
              </Button>
            ),
          )}
        </div>
      </div>
    ),
    [selectedRating],
  );

  return (
    <div className={styles.AnimalEditorGroupBuilder}>
      {renderedAge}
      {renderedRating}
      <Button
        className={styles.AnimalEditorGroupBuilderButtonConfirm}
        onClick={handleConfirm}
      >
        Add to group
      </Button>
      {renderedList}
    </div>
  );
};
