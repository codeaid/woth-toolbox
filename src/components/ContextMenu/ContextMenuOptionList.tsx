import { ContextMenuOptionItem } from './ContextMenuOptionItem';
import { ContextMenuOptionListProps } from './types';

export const ContextMenuOptionList = (props: ContextMenuOptionListProps) => {
  const { options, onOptionClick } = props;

  return (
    <>
      {options.map((option, index) => (
        <ContextMenuOptionItem
          key={index}
          option={option}
          onOptionClick={onOptionClick}
        />
      ))}
    </>
  );
};
