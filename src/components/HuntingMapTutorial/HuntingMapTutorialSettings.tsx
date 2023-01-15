import { Emphasis } from 'components/Emphasis';
import { Heading } from 'components/Heading';
import { HuntingMapTutorialImage } from './HuntingMapTutorialImage';
import imgSettingsLanguage from './assets/settings-language.jpg';
import imgSettingsMarkers from './assets/settings-markers.jpg';

export const HuntingMapTutorialSettings = () => (
  <>
    <Heading size={2}>Settings</Heading>
    <p>
      The application features a <Emphasis>Settings</Emphasis> menu that allows
      users to customize various aspects of the application, including display
      language, marker sizes as well as migrate application data to another
      device.
    </p>
    <p>
      <Emphasis>Settings</Emphasis> can be accessed by clicking on the button in
      the top-right corner of the application. Menu can subsequently be closed
      by clicking the button again or clicking the close button in the menu
      itself.
    </p>

    <Heading size={4}>Language and internationalization</Heading>
    <p>
      The application allows users to change the language used in the interface.
      This also includes localization and internationalization of numbers and
      dates, ensuring that they are properly formatted according to the selected
      language.
    </p>
    <HuntingMapTutorialImage
      alt="Language"
      height={imgSettingsLanguage.height}
      src={imgSettingsLanguage.src}
      width={imgSettingsLanguage.width}
    />

    <p>To change the language:</p>
    <ol>
      <li>
        Access the <Emphasis>Settings</Emphasis> menu.
      </li>
      <li>
        Locate the language dropdown menu and select the desired language.
      </li>
      <li>
        Once a language has been selected, the application will automatically
        update to the chosen language. All text and menus will be displayed in
        the new language, numbers and dates will be localized and
        internationalized.
      </li>
    </ol>
    <p>
      Please note that not all the texts in the application may be translated to
      the selected language and some parts may remain in English.
    </p>

    <Heading size={4}>Marker size</Heading>
    <p>
      The application allows users to customize the size of general, animal, and
      need zone markers by adjusting the corresponding sliders in the settings
      menu.
    </p>
    <HuntingMapTutorialImage
      alt="Markers"
      height={imgSettingsMarkers.height}
      src={imgSettingsMarkers.src}
      width={imgSettingsMarkers.width}
    />

    <p>Perform the following steps to change marker sizes:</p>
    <ol>
      <li>
        Access the <Emphasis>Settings</Emphasis> menu.
      </li>
      <li>
        In the <Emphasis>Markers</Emphasis> section, you will find three sliders
        each one representing a different type of markers: general markers,
        animal markers, and need zone markers.
      </li>
      <li>
        To adjust the size of each type of marker, drag the corresponding slider
        to the left or right to decrease or increase the size of the markers
        respectively. As you adjust the slider the changes will be applied
        immediately.
      </li>
      <li>
        Once you are satisfied with the marker sizes, close the settings panel
        and continue using the map as usual.
      </li>
    </ol>

    <Heading size={4}>Exporting and Importing Data</Heading>
    <p>
      Perform the following steps to transfer all your personalized marker
      information, including comments, colors, and noteworthy specimens, as well
      as application settings to another device:
    </p>
    <ol>
      <li>
        Access the <Emphasis>Settings</Emphasis> menu.
      </li>
      <li>
        Click on the <Emphasis>Copy</Emphasis> button to generate a block of
        text, known as code, which will be automatically copied to your
        device&apos;s clipboard.
      </li>
      <li>
        Paste the code into an email, instant message or document, and send it
        to the target device.
      </li>
      <li>
        On the target device, open the received message, document or email and
        copy the code.
      </li>
      <li>
        Open the <Emphasis>Toolbox</Emphasis>, expand the{' '}
        <Emphasis>Settings</Emphasis> panel, and click on the{' '}
        <Emphasis>Paste</Emphasis> button.
      </li>
      <li>
        After you paste the code the page will automatically reload and you
        should see all your customizations applied.
      </li>
    </ol>

    <p>
      Please note that existing marker data will be overwritten. However, if you
      had customized markers on the target device that you had not customized on
      your source device, those markers will not be affected, and your
      customizations will be preserved.
    </p>

    <p>
      Also be aware that there are currently no confirmations indicating that
      the data has been successfully applied, however, if the code has been
      copied correctly, everything should function as intended.
    </p>

    <Heading size={4}>Reverting settings</Heading>
    <p>
      Use the <Emphasis>Reset</Emphasis> button that is located at the bottom of
      the <Emphasis>Settings</Emphasis> menu to revert both the language and
      marker size settings to their default values.
    </p>
  </>
);
