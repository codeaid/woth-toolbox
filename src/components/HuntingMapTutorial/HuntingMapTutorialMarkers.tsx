import { Heading } from 'components/Heading';
import styles from './HuntingMapTutorial.module.css';

export const HuntingMapTutorialMarkers = () => (
  <>
    <Heading size={2}>Markers</Heading>
    <p>
      Each individual marker type has a minimum zoom level associated with it
      that specifies the point at which it becomes visible. Markers are shown or
      hidden depending on how close or far you have zoomed your map (assuming
      you have not applied any filters).
    </p>
    <p>
      Lodge icon is visible at all times and the rest of the icons become
      visible in the following order:
    </p>
    <ol>
      <li>Map labels.</li>
      <li>Cabin, camp and shooting range markers.</li>
      <li>View and echo/photo locations.</li>
      <li>Hunting stands.</li>
      <li>Animal and need zone markers.</li>
    </ol>
    <p>
      Custom tracking and exploration markers are visible irrespective of the
      current zoom level (unless they are disabled in the filters).
    </p>

    <Heading size={4}>Placing custom markers</Heading>
    <Heading size={5}>Exploration markers</Heading>
    <p>
      As mentioned previously, users can place custom tracking and exploration
      markers anywhere on the map.
    </p>
    <p>
      To place an exploration marker hover over the map and press <code>F</code>{' '}
      on your keyboard. To remove the marker hover over it and press{' '}
      <code>Spacebar</code> (or, alternatively, press <code>F</code> again).
    </p>
    <p className={styles.HuntingMapTutorialInfo}>
      Only one exploration marker can be placed on the map at any given time!
    </p>

    <Heading size={5}>Tracking markers</Heading>
    <p>
      To place a new tracking marker hover over the map and press <code>C</code>{' '}
      on your keyboard. To remove the marker hover over it and press{' '}
      <code>Spacebar</code>. To remove all tracking markers at once hover over
      any of them and press <code>T</code> on your keyboard.
    </p>
    <p className={styles.HuntingMapTutorialInfo}>
      Number of tracking markers that can be placed on the map is limited to
      100!
    </p>
  </>
);
