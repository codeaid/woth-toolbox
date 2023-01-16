import { useMemo } from 'react';
import { MdOutlineMyLocation } from 'react-icons/md';
import { RiChat4Line, RiEdit2Fill, RiPaletteLine } from 'react-icons/ri';
import { ContextMenu, ContextMenuOption } from 'components/ContextMenu';
import { useTranslator } from 'hooks';
import { copyTextToClipboard } from 'lib/debug';
import { getCoordinateRatio } from 'lib/markers';
import { HuntingMapAnimalContextProps } from './types';

export const HuntingMapAnimalContext = (
  props: HuntingMapAnimalContextProps,
) => {
  const { enabled, marker, markerData, markerElement, onToggleEditor } = props;

  // Retrieve application translator
  const translate = useTranslator();

  // List of context menu options
  const options = useMemo<Array<ContextMenuOption>>(
    () => [
      {
        icon: RiEdit2Fill,
        label: translate('TOOLBOX:MARKER_CONTEXT_EDIT'),
        onClick: () => onToggleEditor(marker, true),
      },
      {
        disabled: !markerData?.color,
        icon: RiPaletteLine,
        label: translate('TOOLBOX:MARKER_CONTEXT_COLOR'),
        separator: true,
        onClick: async () => await copyTextToClipboard(markerData?.color ?? ''),
      },
      {
        icon: MdOutlineMyLocation,
        label: translate('TOOLBOX:MARKER_CONTEXT_COORDS'),
        onClick: async () => {
          const [valueX, valueY] = getCoordinateRatio(marker.coords, 1000);
          await copyTextToClipboard(`${valueX},${valueY}`);
        },
      },
      {
        disabled: !markerData?.comment,
        icon: RiChat4Line,
        label: translate('TOOLBOX:MARKER_CONTEXT_DESCRIPTION'),
        onClick: async () =>
          await copyTextToClipboard(markerData?.comment ?? ''),
      },
    ],
    [translate, markerData?.color, markerData?.comment, onToggleEditor, marker],
  );

  return (
    <ContextMenu
      anchor={markerElement}
      enabled={enabled}
      options={options}
      parent={document.body}
    />
  );
};
