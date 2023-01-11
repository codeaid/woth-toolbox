import { Heading } from 'components/Heading';
import styles from './HuntingMapTutorial.module.css';

export const HuntingMapTutorialGeneral = () => (
  <>
    <Heading size={2}>Basics</Heading>
    <p>
      <span className={styles.HuntingMapTutorialHighlight}>
        Way Of The Hunter Toolbox
      </span>{' '}
      maps reveal locations of all points of interest (such as camps, hunting
      stands, echoes or views) as well as all animal groups and approximate
      locations of their need zones (i.e. spots where they drink, feed or rest).
      Additionally, just like in the game itself, you can place custom markers
      anywhere on the map to mark your own points of interest.
    </p>
    <p>Items displayed on the map include:</p>
    <ul>
      <li>
        <span className={styles.HuntingMapTutorialHighlight}>
          General markers
        </span>{' '}
        that show locations of lodges, camp sites, hunting stands, views and
        other non-animal related points of interest.
      </li>
      <li>
        <span className={styles.HuntingMapTutorialHighlight}>
          Animal markers
        </span>{' '}
        that show general habitation areas of individual animal groups (herds,
        bird flocks, wolf packs, etc.).
      </li>
      <li>
        <span className={styles.HuntingMapTutorialHighlight}>
          Need zone markers
        </span>{' '}
        that become visible after clicking (or tapping on touch devices) on
        animal markers and show locations of need zones associated with those
        animal groups.
      </li>
      <li>
        <span className={styles.HuntingMapTutorialHighlight}>
          Custom markers
        </span>{' '}
        that can be placed by the user anywhere on the map.
      </li>
      <li>
        <span className={styles.HuntingMapTutorialHighlight}>Labels</span> that
        display names of map areas and habitat types that they represent.
      </li>
    </ul>
    <p>
      Map item visibility and size can be customized through the use of map
      specific filters and global settings (explained in the later sections of
      this guide).
    </p>

    <Heading size={4}>Zooming and panning</Heading>
    <p>
      Similarly to other online maps, such as Google Maps or Apple Maps{' '}
      <span className={styles.HuntingMapTutorialHighlight}>Toolbox</span> maps
      can be panned and zoomed using your pointing device.
    </p>
    <p>
      To zoom the map in or out when using a mouse simply scroll your mouse
      wheel up or down (direction depends on your system settings). When using a
      trackpad use the same gestures that you would use to scroll websites.
    </p>
    <p>
      Currently pinch-to-zoom is not supported on touch devices, therefore
      please use the toolbar buttons located in the top right of the page to
      zoom the map in, out, or reset its zoom level and position to default.
    </p>
  </>
);
