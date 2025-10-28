import { Heading } from 'components/Heading';
import { HuntingMapTutorialImage } from './HuntingMapTutorialImage';
import imgOtherCoords from './assets/other-coords.jpg';
import imgOtherScale from './assets/other-scale.jpg';

export const HuntingMapTutorialOther = () => (
  <>
    <Heading size={2}>Other</Heading>

    <Heading size={4}>Coordinate indicator</Heading>
    <p>
      The maps feature a coordinate indicator located in the bottom-left corner
      of the page. It displays the current mouse coordinates in relation to the
      map. These coordinates can be used in personal animal marker notes or
      shared with other players online to identify specific locations on the
      map:
    </p>
    <HuntingMapTutorialImage
      alt="Coordinates"
      height={imgOtherCoords.height}
      src={imgOtherCoords.src}
      width={imgOtherCoords.width}
    />

    <p>
      Coordinates are not shown on devices where primary input mechanism does
      not include an accurate pointing device (e.g. a mouse).
    </p>

    <Heading size={4}>Map scale</Heading>
    <p>
      Maps also feature a scale indicator that is found in the bottom right
      corner of the map and acts as a representation of the relationship between
      the distance on the map and the corresponding distance in the game.
    </p>
    <p>
      The scale is split into 3 or 4 even sections, depending on the current
      distance. The full length of the scale represents the total distance that
      is displayed above it, and each section indicates one third or one fourth
      of the full length of the scale:
    </p>
    <HuntingMapTutorialImage
      alt="Scale"
      height={imgOtherScale.height}
      src={imgOtherScale.src}
      width={imgOtherScale.width}
    />

    <p>
      The indicator is used to help you estimate the distance between two points
      on the map, which can be useful for navigation and planning.
    </p>
  </>
);
