import { useCallback } from 'react';
import type { ChangeEvent } from 'react';
import { Textarea } from 'components/Textarea';
import type { AnimalEditorDescriptionProps } from './types';

export const AnimalEditorDescription = (
  props: AnimalEditorDescriptionProps,
) => {
  const { data, disabled, onChange } = props;

  /**
   * Handle changes to the comment text
   */
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) =>
      onChange({ comment: event.target.value }),
    [onChange],
  );

  return (
    <Textarea
      disabled={disabled}
      maxLength={10000}
      rows={3}
      value={data?.comment ?? ''}
      onChange={handleChange}
    />
  );
};
