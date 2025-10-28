import { Emphasis } from 'components/Emphasis';
import { Heading } from 'components/Heading';
import { HuntingMapTutorialImage } from './HuntingMapTutorialImage';
import imgEditorActions from './assets/editor-actions.jpg';
import imgEditorAnimals from './assets/editor-animals.gif';
import imgEditorColors from './assets/editor-colors.gif';
import imgEditorContext from './assets/editor-context.jpg';
import imgEditorDescription from './assets/editor-description.jpg';
import imgSettingsMarkersRatings from './assets/editor-markers-ratings.jpg';
import imgEditorMarkers from './assets/editor-markers.jpg';

export const HuntingMapTutorialEditor = () => (
  <>
    <Heading size={2}>Marker editor</Heading>
    <p>
      In addition to revealing need zones of individual animal groups, animal
      markers can also be customized to contain personal notes, lists of
      noteworthy specimens, or have a different appearance on the map by
      assigning them custom colors.
    </p>
    <p>
      This feature allows you to track and highlight animal groups that you want
      to remember for personal reasons or contain specimens that you are
      planning on harvesting at a later date.
    </p>
    <HuntingMapTutorialImage
      alt="Markers"
      height={imgEditorMarkers.height}
      src={imgEditorMarkers.src}
      width={imgEditorMarkers.width}
    />

    <p>
      To access the editor, press and hold the <code>Shift</code> key on your
      keyboard while left-clicking on the animal marker you want to customize.
      Alternatively, right-click on the marker and choosing the{' '}
      <Emphasis>Edit Marker</Emphasis> option from the contextual menu:
    </p>
    <HuntingMapTutorialImage
      alt="Context menu"
      height={imgEditorContext.height}
      src={imgEditorContext.src}
      width={imgEditorContext.width}
    />

    <p>
      On touch-enabled devices, such as phones or tablets, simply{' '}
      <Emphasis>press and hold</Emphasis> your finger on the animal marker you
      wish to customize.
    </p>

    <Heading size={4}>Description</Heading>
    <p>
      This field allows you to input personalized notes related to the animal
      group. You can include details about the observation of this group, its
      individual specimens, or any other information that would assist you in
      recognizing the group when revisiting this data.
    </p>
    <HuntingMapTutorialImage
      alt="Description"
      height={imgEditorDescription.height}
      src={imgEditorDescription.src}
      width={imgEditorDescription.width}
    />

    <p>
      Input field can be resized vertically by dragging its bottom-right corner
      up or down using your mouse.
    </p>

    <Heading size={4}>Animals</Heading>
    <p>
      This section allows you to create a list of noteworthy specimens that you
      have observed in the current animal group. You can include animals with
      high trophy ratings that you plan to harvest at a later date, individuals
      with low trophy ratings that you intend to cull, or simply all animals in
      the group to monitor their development cycles.
    </p>
    <p>
      To add a new animal to the group, first select its age, and then its
      rating:
    </p>
    <ul>
      <li>
        <Emphasis>M1</Emphasis> for 1-star males
      </li>
      <li>
        <Emphasis>M2</Emphasis> for 2-star males
      </li>
      <li>
        <Emphasis>M3</Emphasis> for 3-star males
      </li>
      <li>
        <Emphasis>M4</Emphasis> for 4-star males
      </li>
      <li>
        <Emphasis>M5</Emphasis> for 5-star males
      </li>
      <li>
        <Emphasis>F</Emphasis> for females
      </li>
    </ul>
    <p>
      Complete the action by clicking on the <Emphasis>Confirm</Emphasis>{' '}
      button.
    </p>
    <p>
      To remove an entry, simply hover over it and click the left mouse button.
    </p>
    <HuntingMapTutorialImage
      alt="Animals"
      height={imgEditorAnimals.height}
      src={imgEditorAnimals.src}
      width={imgEditorAnimals.width}
    />

    <p>
      If you add any male specimens to the marker using the method outlined
      above, after saving the changes, the trophy rating of the highest-rated
      animal will be displayed as a number of stars below the marker:
    </p>
    <HuntingMapTutorialImage
      alt="Trophy ratings"
      height={imgSettingsMarkersRatings.height}
      src={imgSettingsMarkersRatings.src}
      width={imgSettingsMarkersRatings.width}
    />

    <p>
      Please see the <Emphasis>Settings</Emphasis> section for more information
      on how to disable this feature.
    </p>

    <Heading size={4}>Highlighting color</Heading>
    <p>
      Use the color picker to change the color that is used to display the
      current marker on the map.
    </p>
    <p>
      To select a color, first use the <Emphasis>hue selector</Emphasis> to
      choose the desired hue, such as red, blue, or yellow. As you change the
      hue, the <Emphasis>color selector</Emphasis> above it will update to
      display the range of colors that correspond to the selected hue. Then, use
      the <Emphasis>color selector</Emphasis> to choose a specific color.
    </p>
    <HuntingMapTutorialImage
      alt="Colors"
      height={imgEditorColors.height}
      src={imgEditorColors.src}
      width={imgEditorColors.width}
    />
    <p>
      If you want to use a specific <Emphasis>HEX value</Emphasis>, you can
      enter it into the provided field. HEX value is a six-digit code that
      represents a color in the RGB color model. The code starts with a pound
      sign (#) followed by six characters (0-9, A-F) that represent the red,
      green, and blue values of the color.
    </p>

    <Heading size={4}>Saving and clearing changes</Heading>
    <p>
      To apply the changes you made and close the editor, click on the{' '}
      <Emphasis>Ok</Emphasis> button at the bottom of the panel:
    </p>
    <HuntingMapTutorialImage
      alt="Actions"
      height={imgEditorActions.height}
      src={imgEditorActions.src}
      width={imgEditorActions.width}
    />
    <p>
      To close the editor without applying any changes, click on the close
      button located in the top-right corner of the panel.
    </p>
    <p>
      If you want to remove any of customizations you previously made to a
      marker, press the <Emphasis>Clear</Emphasis> button.
    </p>

    <Heading size={4}>Where is my data stored?</Heading>
    <p>
      Customizations made to markers are stored in the{' '}
      <Emphasis>local storage</Emphasis> of the device you are using, which is
      browser-specific. This means that if you switch to a different browser,
      even on the same device, the changes you made will not be available. They
      will only be available on the browser where they were made.
    </p>
    <p>
      To apply your customizations on another device or browser, please use the{' '}
      <Emphasis>Copy</Emphasis>/<Emphasis>Paste</Emphasis> functionality
      available in the <Emphasis>Settings</Emphasis> (explained in later
      sections of this guide).
    </p>

    <Heading size={6}>What is local storage?</Heading>
    <p>
      Local storage is a feature of web browsers that allows websites and web
      applications to store data on a user&apos;s device. This data is stored in
      a special location on the device and is only accessible by the website or
      web application that created it. The data is stored in key-value pairs,
      and it can be used to store information such as user preferences, login
      details, or form data.
    </p>
    <p>
      Once data is stored in local storage, it remains there even after you
      close the browser or turn off your device. This means that the next time
      you visit the website or web application, the data will still be there,
      allowing the website or web application to retain information about your
      preferences or activities. Local storage is useful for creating a more
      personalized experience and for allowing web applications to function
      offline.
    </p>
  </>
);
