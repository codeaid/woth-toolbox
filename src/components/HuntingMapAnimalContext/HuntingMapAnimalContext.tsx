import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { MdOutlineMyLocation } from 'react-icons/md';
import {
  RiChat4Line,
  RiEdit2Fill,
  RiInformationLine,
  RiPaletteLine,
} from 'react-icons/ri';
import { ContextMenu } from 'components/ContextMenu';
import type { ContextMenuOption } from 'components/ContextMenu';
import { useTranslator } from 'hooks';
import { setClipboardValue } from 'lib/clipboard';
import { getCoordinateRatio } from 'lib/markers';
import { redirectToAnimalPage } from 'lib/routing';
import { sendGoogleEvent } from 'lib/tracking';
import { showNotification } from 'lib/utils';
import type { HuntingMapAnimalContextProps } from './types';

export const HuntingMapAnimalContext = (
  props: HuntingMapAnimalContextProps,
) => {
  const { enabled, marker, markerData, markerElement, onToggleEditor } = props;

  // Retrieve application router
  const router = useRouter();

  // Retrieve application translator
  const translate = useTranslator();

  // List of context menu options
  const options = useMemo<Array<ContextMenuOption>>(
    () => [
      {
        icon: RiEdit2Fill,
        label: translate('TOOLBOX:MARKER_CONTEXT_EDIT'),
        onClick: () => onToggleEditor(marker, true, 'context'),
      },
      {
        disabled: !markerData?.color,
        icon: RiPaletteLine,
        label: translate('TOOLBOX:MARKER_CONTEXT_COLOR'),
        separator: true,
        onClick: async () => {
          const success = await setClipboardValue(markerData?.color ?? '');

          if (success) {
            showNotification(translate('TOOLBOX:COPY_SUCCESS'), 'info');
            sendGoogleEvent('marker_context_color');
          } else {
            showNotification(translate('TOOLBOX:COPY_ERROR'), 'error');
          }
        },
      },
      {
        icon: MdOutlineMyLocation,
        label: translate('TOOLBOX:MARKER_CONTEXT_COORDS'),
        onClick: async () => {
          const [valueX, valueY] = getCoordinateRatio(marker.coords, 1000);
          const success = await setClipboardValue(`${valueX},${valueY}`);

          if (success) {
            showNotification(translate('TOOLBOX:COPY_SUCCESS'), 'info');
            sendGoogleEvent('marker_context_coords');
          } else {
            showNotification(translate('TOOLBOX:COPY_ERROR'), 'error');
          }
        },
      },
      {
        disabled: !markerData?.comment,
        icon: RiChat4Line,
        label: translate('TOOLBOX:MARKER_CONTEXT_DESCRIPTION'),
        onClick: async () => {
          const success = await setClipboardValue(markerData?.comment ?? '');

          if (success) {
            showNotification(translate('TOOLBOX:COPY_SUCCESS'), 'info');
            sendGoogleEvent('marker_context_desc');
          } else {
            showNotification(translate('TOOLBOX:COPY_ERROR'), 'error');
          }
        },
      },
      {
        icon: RiInformationLine,
        label: translate('UI:ENCYCLOPEDIA'),
        separator: true,
        onClick: () => redirectToAnimalPage(marker.type, router),
      },
    ],
    [
      marker,
      markerData?.color,
      markerData?.comment,
      onToggleEditor,
      router,
      translate,
    ],
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
