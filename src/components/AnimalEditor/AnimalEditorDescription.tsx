import { ChangeEvent, useCallback } from 'react';
import { Textarea } from 'components/Textarea';
import { AnimalEditorDescriptionProps } from './types';

export const AnimalEditorDescription = (
  props: AnimalEditorDescriptionProps,
) => {
  const { data, onChange } = props;

  /**
   * Handle changes to the comment text
   */
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange({
        ...data,
        comment: event.target.value,
      });
    },
    [data, onChange],
  );

  return <Textarea rows={3} value={data.comment} onChange={handleChange} />;
};
