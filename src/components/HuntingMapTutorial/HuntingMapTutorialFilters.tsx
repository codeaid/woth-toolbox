import { Heading } from 'components/Heading';
import styles from './HuntingMapTutorial.module.css';

export const HuntingMapTutorialFilters = () => (
  <>
    <Heading size={2}>Filters</Heading>
    <p>
      Markers can be toggled on or off by applying custom map filters, which
      allow you to specify which general markers, animal species, labels or
      custom markers should be shown and which should not.
    </p>
    <p>
      To open the filter panel click on the button located in the top left of
      the page. You will be presented with a multitude of filter options grouped
      into the following categories:
    </p>
    <ol>
      <li>General</li>
      <li>Animals</li>
      <li>Custom</li>
      <li>Other</li>
    </ol>
    <p>
      Individual filter options can be toggled on or off by clicking on them (or
      tapping on touch devices), which in turn will show or hide map markers of
      the same type.
    </p>

    <Heading size={4}>General and animal</Heading>
    <p>
      By default all general and animal markers are visible if none of the
      respective filter options are enabled, however,{' '}
      <span className={styles.HuntingMapTutorialHighlight}>as soon as one</span>{' '}
      of the filter options is enabled all other filter options will be
      considered disabled.
    </p>
  </>
);
