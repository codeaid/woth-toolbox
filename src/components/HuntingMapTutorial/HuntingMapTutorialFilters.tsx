import { Emphasis } from 'components/Emphasis';
import { Heading } from 'components/Heading';
import { HuntingMapTutorialImage } from './HuntingMapTutorialImage';
import imgFiltersButtonActive from './assets/filters-button-active.jpg';
import imgFiltersButton from './assets/filters-button.jpg';
import imgFiltersCustom from './assets/filters-custom.jpg';
import imgFiltersGroupToggle from './assets/filters-groups-toggle.gif';
import imgFiltersItemToggle from './assets/filters-items-toggle.gif';
import imgFiltersOther from './assets/filters-other.jpg';

export const HuntingMapTutorialFilters = () => (
  <>
    <Heading size={2}>Filters</Heading>
    <p>
      Maps feature filtering functionality that allows you to choose which
      general markers, animal species, labels, or custom markers are displayed
      and which are hidden.
    </p>
    <p>
      To access the filter panel, click on the button located in the top-left
      corner of the page:
    </p>
    <HuntingMapTutorialImage
      alt="Filter button"
      height={imgFiltersButton.height}
      src={imgFiltersButton.src}
      width={imgFiltersButton.width}
    />

    <p>
      Upon opening the filter panel, you will be presented with various filter
      options that are organized into the following categories:
    </p>
    <ol>
      <li>
        <Emphasis>General</Emphasis>
      </li>
      <li>
        <Emphasis>Animals</Emphasis>
      </li>
      <li>
        <Emphasis>Other</Emphasis>
      </li>
      <li>
        <Emphasis>Custom</Emphasis>
      </li>
    </ol>

    <Heading size={6}>Toggling options</Heading>
    <p>
      Each filter option can be independently enabled or disabled by clicking or
      tapping on it, which will subsequently hide or reveal markers of the
      corresponding type.
    </p>
    <p>
      All <Emphasis>General</Emphasis> and <Emphasis>Animals</Emphasis> filter
      options can be toggled at once by clicking on their respective category
      headers:
    </p>
    <HuntingMapTutorialImage
      alt="Filter groups"
      height={imgFiltersGroupToggle.height}
      src={imgFiltersGroupToggle.src}
      width={imgFiltersGroupToggle.width}
    />

    <p>
      If the category contains enabled options, the first click will deactivate
      all options within that group. The following click will enable all options
      in the category.
    </p>

    <p>
      Filter button will be highlighted if at least one of the filter options
      has been changed:
    </p>
    <HuntingMapTutorialImage
      alt="Filter button (active)"
      height={imgFiltersButtonActive.height}
      src={imgFiltersButtonActive.src}
      width={imgFiltersButtonActive.width}
    />

    <Heading size={6}>Closing filter panel</Heading>
    <p>
      Filter panel can be closed by using the button in its top-right corner, by
      clicking anywhere outside of the panel or by pressing the <code>Esc</code>{' '}
      key on your keyboard.
    </p>

    <Heading size={4}>General &amp; animals</Heading>
    <p>
      By default, all general and animal markers are displayed when none of the
      filter options in these two categories are enabled. However, once a filter
      option is enabled, all other options are considered to be disabled and
      markers of corresponding types are removed from the map:
    </p>
    <HuntingMapTutorialImage
      alt="Filter groups"
      height={imgFiltersItemToggle.height}
      src={imgFiltersItemToggle.src}
      width={imgFiltersItemToggle.width}
    />

    <Heading size={6}>Note</Heading>
    <p>
      If only one type of generic or animal markers is selected they will be
      visible even when the map is fully zoomed out. This can be useful if you
      want to see all locations of one specific animal at once without having to
      pan the map.
    </p>

    <Heading size={4}>Other</Heading>
    <p>
      Options in this category allow you to turn the visibility of map labels ,
      as well as custom tracking and exploration markers on or off.
    </p>
    <HuntingMapTutorialImage
      alt="Other filters"
      height={imgFiltersOther.height}
      src={imgFiltersOther.src}
      width={imgFiltersOther.width}
    />

    <Heading size={4}>Custom</Heading>
    <p>
      Enabling the <Emphasis>Hide unedited</Emphasis> option will remove all
      animal markers that have not been modified by the user, while the
      remaining markers (those that have been edited) will remain visible{' '}
      <Emphasis>at all zoom levels</Emphasis>.
    </p>
    <HuntingMapTutorialImage
      alt="Custom filters"
      height={imgFiltersCustom.height}
      src={imgFiltersCustom.src}
      width={imgFiltersCustom.width}
    />

    <p>
      If at the time of hiding unedited markers any options within the{' '}
      <Emphasis>Animals</Emphasis> category are enabled then only the markers of
      the corresponding types that have been edited by the user will be visible
      on the map. This allows users to focus on the animal markers they have
      edited, while keeping the map uncluttered.
    </p>
  </>
);
