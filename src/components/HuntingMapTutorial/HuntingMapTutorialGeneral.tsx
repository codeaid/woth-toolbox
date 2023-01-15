import { Emphasis } from 'components/Emphasis';
import { Heading } from 'components/Heading';
import { HuntingMapTutorialImage } from './HuntingMapTutorialImage';
import imgGeneralMarkers from './assets/general-markers.jpg';
import imgGeneralTools from './assets/general-tools.jpg';

export const HuntingMapTutorialGeneral = () => (
  <>
    <Heading size={2}>Basics</Heading>
    <p>
      <Emphasis>Way Of The Hunter Toolbox</Emphasis> maps reveal locations of
      points of interest (such as camps, hunting stands, echoes, and
      viewpoints), as well as animal groups and their need zones (areas where
      they drink, feed, or rest). Furthermore, in a manner similar to the game
      itself, you can place custom markers on the map to identify and mark areas
      of particular interest to you.
    </p>
    <HuntingMapTutorialImage
      alt="Markers"
      height={imgGeneralMarkers.height}
      src={imgGeneralMarkers.src}
      width={imgGeneralMarkers.width}
    />

    <p>Items displayed on the map include:</p>
    <ul>
      <li>
        <Emphasis>General markers</Emphasis>, which indicate lodges, campsites,
        hunting stands, scenic views, and other non-animal related locations.
      </li>
      <li>
        <Emphasis>Animal markers</Emphasis> that reveal the general habitation
        areas of various animal groups (herds, flocks, packs, etc.).
      </li>
      <li>
        By clicking or tapping on animal markers, you will see{' '}
        <Emphasis>need zone markers</Emphasis>, which reveal locations of
        specific need zones associated with those animal groups.
      </li>
      <li>
        <Emphasis>Custom markers</Emphasis> that can be placed by the user
        anywhere on the map.
      </li>
      <li>
        <Emphasis>Labels</Emphasis> which display the names of map areas and the
        types of habitat they represent.
      </li>
    </ul>
    <p>
      The visibility and size of the various map items can be adjusted through
      the use of map-specific filters and global settings, which are detailed in
      the latter sections of this guide.
    </p>

    <Heading size={4}>Zooming and panning</Heading>
    <p>
      Just like other popular online maps from providers such as Google and
      Apple, the <Emphasis>Toolbox</Emphasis> maps can be navigated by panning
      and zooming using your pointing device, providing a familiar and intuitive
      user experience.
    </p>

    <Heading size={6}>Zoom</Heading>
    <p>
      To manipulate the zoom level of the map using your mouse, simply scroll
      the mouse wheel upward or downward (depending on your system settings)
      while positioning the cursor over the desired map area. When using a
      trackpad, utilize the same scrolling gestures that you would use when
      navigating through websites.
    </p>
    <p>
      Currently, the feature of pinch-to-zoom is not available on touch-enabled
      devices. To adjust the zoom level of the map on such, please use the
      toolbar buttons located in the upper right corner of the page. These
      buttons enable you to zoom in, zoom out, or reset the map to its default
      zoom level and position:
    </p>
    <HuntingMapTutorialImage
      alt="Filter button"
      height={imgGeneralTools.height}
      src={imgGeneralTools.src}
      width={imgGeneralTools.width}
    />

    <Heading size={6}>Pan</Heading>
    <p>
      To reposition the map, simply hold down the left mouse button (or your
      finger on touch-enabled devices) and move it in any direction.
    </p>
  </>
);
