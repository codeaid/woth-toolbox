import { fauna } from 'config/animals';
import { getCurrentActivityByHour } from 'lib/animals';
import type { AnimalActivity, AnimalActivityData } from 'types/animals';

const activityMap = new Map<AnimalActivity, number>([
  ['feeding', 0],
  ['drinking', 1],
  ['sleeping', 2],
]);

// List of all available hours (0-23)
const hours = Array.from(Array(24).keys());

/**
 * Generate a list of cycle entries from the specified list
 *
 * @param cycles List of source cycles
 */
function* generateCycles(cycles: AnimalActivityData[]) {
  // Build the list of activities associated with each hour
  const activities = hours.map(
    hour =>
      [hour, getCurrentActivityByHour(cycles, hour).activity] as [
        number,
        AnimalActivity,
      ],
  );

  // Initial output
  let output = {
    FROM: 0,
    TO: -1,
    TYPE: -1,
  };

  // Previously processed activity
  let previous: AnimalActivity | undefined;

  for (const [hour, activity] of activities) {
    if (typeof previous !== 'undefined' && activity !== previous) {
      // Return previously generated output if the current activity is different from the previous
      yield output;

      // Update output to contain the current hour as the start hour
      output = {
        ...output,
        FROM: hour,
      };
    }

    // Update output to contain the current type and ending hour
    output = {
      ...output,
      TO: hour,
      TYPE: activityMap.get(activity) ?? -1,
    };

    previous = activity;
  }

  yield output;
}

export default fauna.map(entry => ({
  ANIMAL: entry.heading,
  CYCLE: [...generateCycles(entry.lifeCycle)],
}));
