import { Emphasis } from 'components/Emphasis';
import { Heading } from 'components/Heading';
import { maxTrackingMarkerCount } from 'config/markers';
import { HuntingMapTutorialImage } from './HuntingMapTutorialImage';
import imgMarkersExploration from './assets/markers-exploration.gif';
import imgMarkersMulti from './assets/markers-multi.gif';
import imgMarkersNeedZones from './assets/markers-need-zones.gif';
import imgMarkersTracking from './assets/markers-tracking.gif';

export const HuntingMapTutorialMarkers = () => (
  <>
    <Heading size={2}>Markers</Heading>
    <p>
      Main map markers indicate locations of points of interest, as well as
      general habitats of animals and their specific need zones. Users also have
      the ability to place their own tracking and exploration markers to
      identify areas of personal significance.
    </p>
    <p>
      Visibility of these markers is dependent on the current zoom level - each
      marker type has a corresponding value that determines the minimum zoom
      level at which it becomes visible upon zooming in.
    </p>
    <p>
      Lodge marker is displayed by default, while the rest of the markers become
      visible in the following order:
    </p>
    <ol>
      <li>Map labels</li>
      <li>Cabins, camps and shooting ranges</li>
      <li>View, echo and photo locations</li>
      <li>Hunting stands</li>
      <li>Animals and their need zones</li>
    </ol>
    <p>
      Custom tracking and exploration markers are always visible, regardless of
      the current zoom level, unless they have been specifically disabled
      through the use of filters.
    </p>

    <Heading size={4}>Need zones</Heading>
    <Heading size={6}>Single animal group</Heading>
    <p>
      To view need zones associated with an animal group, simply click or tap on
      any of the animal markers on the map. By doing so, the need zone icons of
      that animal group will be revealed, showing approximate locations of areas
      where they drink, feed, or rest. If you click on the same animal marker
      again, its need zones will be hidden.
    </p>
    <HuntingMapTutorialImage
      alt="Need zone markers"
      height={imgMarkersNeedZones.height}
      src={imgMarkersNeedZones.src}
      width={imgMarkersNeedZones.width}
    />

    <p>
      If you click on another animal marker while the original one has its need
      zones expanded, the need zones of the original marker will be hidden and
      the need zones of the newly selected marker will be revealed instead.
    </p>

    <Heading size={6}>Multiple animal groups</Heading>
    <p>
      To show need zones of multiple animal groups at once, hold down the{' '}
      <code>Ctrl</code> key on your keyboard (or <code>Cmd</code> on MacOS)
      while clicking on individual animal markers. To hide the expanded need
      zones simply click on any of the active animal markers again:
    </p>
    <HuntingMapTutorialImage
      alt="Multiple markers"
      height={imgMarkersMulti.height}
      src={imgMarkersMulti.src}
      width={imgMarkersMulti.width}
    />

    <Heading size={4}>Placing custom markers</Heading>
    <p>
      As previously mentioned, users have the ability to place custom tracking
      and exploration markers anywhere on the map (feature is not available on
      touch-enabled devices that do not feature a keyboard).
    </p>

    <Heading size={6}>Exploration markers</Heading>
    <p>
      To place an exploration marker, simply position your cursor over the
      desired location on the map and press the <code>F</code> key on your
      keyboard. To remove the marker, hover over it and press{' '}
      <code>Spacebar</code> or press the <code>F</code> key again:
    </p>
    <HuntingMapTutorialImage
      alt="Exploration markers"
      height={imgMarkersExploration.height}
      src={imgMarkersExploration.src}
      width={imgMarkersExploration.width}
    />

    <p>
      Only <Emphasis>1</Emphasis> exploration marker can exist on the map at any
      given time.
    </p>

    <Heading size={6}>Tracking markers</Heading>
    <p>
      To add a new tracking marker, hover your cursor over the desired location
      on the map and press the <code>C</code> key on your keyboard. To remove an
      individual marker, hover over it and press <code>Spacebar</code>. To
      remove all tracking markers at once, hover over one of them and press{' '}
      <code>T</code>:
    </p>
    <HuntingMapTutorialImage
      alt="Tracking markers"
      height={imgMarkersTracking.height}
      src={imgMarkersTracking.src}
      width={imgMarkersTracking.width}
    />

    <p>
      The number of tracking markers that can be placed on the map at once is
      limited to <Emphasis>{maxTrackingMarkerCount}</Emphasis>. Once an
      additional marker is placed, the earliest placed marker will be
      automatically removed from the map.
    </p>
  </>
);
