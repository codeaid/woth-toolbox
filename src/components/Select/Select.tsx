import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RiArrowDropDownFill } from 'react-icons/ri';
import { zeroWidthSpace } from 'config/html';
import type { SelectOption, SelectProps } from './types';
import styles from './Select.module.css';

export const Select = <TValue extends string | number>(
  props: SelectProps<TValue>,
) => {
  const { disabled = false, options, placeholder, value, onChange } = props;

  // Option list state
  const [expanded, setExpanded] = useState(false);

  // References to both, input and list elements
  const inputRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Currently selected option (based on the component value)
  const selectedOption = useMemo(
    () => options.find(o => o.value === value),
    [options, value],
  );

  /**
   * Handle clicking outside the input and list elements
   *
   * @param event Mouse event
   */
  const handleCloseOnDocumentClick = useCallback((event: MouseEvent) => {
    const isInputNode = inputRef.current
      ? inputRef.current.contains(event.target as Node)
      : false;
    const isListNode = listRef.current
      ? listRef.current.contains(event.target as Node)
      : false;

    if (!isInputNode && !isListNode) {
      setExpanded(false);
    }
  }, []);

  /**
   * Handle pressing keyboard keys
   *
   * @param event Mouse event
   */
  const handleCloseOnEscape = useCallback((event: KeyboardEvent) => {
    if (event.code === 'Escape') {
      setExpanded(false);
    }
  }, []);

  /**
   * Handle clicking on the input element
   */
  const handleInputClick = useCallback(() => {
    if (disabled) {
      return;
    }

    // Toggle expansion state
    setExpanded(!expanded);
  }, [disabled, expanded]);

  /**
   * Handle selecting an option in the list
   *
   * @param option Selected option
   */
  const handleOptionSelect = useCallback(
    (option: SelectOption<TValue>) => {
      onChange && onChange(option.value);
      setExpanded(false);
    },
    [onChange],
  );

  /**
   * Render individual option items
   *
   * @param option Option properties
   * @param index Option index
   */
  const renderOptionItem = useCallback(
    (option: SelectOption<TValue>, index: number) => (
      <div
        className={clsx(styles.SelectOptionItem, {
          [styles.SelectOptionItemSelected]: option.value === value,
        })}
        key={option.value ?? `idx:${index}`}
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
          handleOptionSelect(option);
        }}
      >
        {option.content || '\u200b'}
      </div>
    ),
    [handleOptionSelect, value],
  );

  /**
   * Render option list
   */
  const renderOptionList = useCallback(
    () => (
      <div className={styles.SelectOptionList} ref={listRef}>
        {options.map(renderOptionItem)}
      </div>
    ),
    [options, renderOptionItem],
  );

  // Attach and detach global event listeners
  useEffect(() => {
    document.body.addEventListener('click', handleCloseOnDocumentClick);
    document.body.addEventListener('keydown', handleCloseOnEscape);

    return () => {
      document.body.removeEventListener('click', handleCloseOnDocumentClick);
      document.body.removeEventListener('keydown', handleCloseOnEscape);
    };
  }, [handleCloseOnDocumentClick, handleCloseOnEscape]);

  return (
    <div
      className={clsx(styles.Select, {
        [styles.SelectExpanded]: expanded,
      })}
    >
      <div
        className={clsx(styles.SelectInput, {
          [styles.SelectDisabled]: disabled,
          [styles.SelectInputExpanded]: expanded,
        })}
        ref={inputRef}
        onClick={handleInputClick}
      >
        {selectedOption ? (
          <div className={styles.SelectInputText}>
            {selectedOption.content || zeroWidthSpace}
          </div>
        ) : (
          <div className={styles.SelectPlaceholder}>
            {placeholder || zeroWidthSpace}
          </div>
        )}

        <RiArrowDropDownFill className={styles.SelectInputIcon} />
      </div>
      {expanded && renderOptionList()}
    </div>
  );
};
