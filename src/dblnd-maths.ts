import {PILL} from './enums';
import {Dblnd, ShuffleStep} from './interfaces';

/** Impurely generates a Dblnd, the values used behind the scenes for the double-blinding process
 *
 * @param controlCount number of control capsules
 * @param treatmentCount number of treatment capsules
 * @returns Dblnd based on the input counts.  Involves randomness.
 */
export function generateDblnd(controlCount: number, treatmentCount: number): Dblnd {
  const tempSchedule = Array(controlCount).fill(PILL.CONTROL).concat(
      Array(treatmentCount).fill(PILL.TREATMENT));
  const helperSchedule = fisherYates(tempSchedule);
  const experimenterSteps = createShuffleSteps(controlCount + treatmentCount);

  return {
    controlPileRight: (Math.random() > 0.5) ? true : false,
    helperSchedule: helperSchedule,
    experimenterSteps: experimenterSteps,
    finalSchedule: runShuffleSteps(helperSchedule, experimenterSteps),
  };
}

/** Impurely shuffles an array using the fisher-yates shuffle
 *
 * @param arr input array to shuffle
 * @returns a new output array, shuffled
 */
export function fisherYates(arr: PILL[]): PILL[] {
  const out = arr.slice();
  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    const temp = out[i];
    out[i] = out[j];
    out[j] = temp;
  }
  return out;
}

/** Impurely produces the ShuffleSteps the experimenter must take to perform Fisher-Yates shuffle
 * @param numCaps the number of capsules to be shuffled
 * @returns an array of ShuffleSteps describing the shuffling process
*/
function createShuffleSteps(numCaps: number): ShuffleStep[] {
  const out: ShuffleStep[] = [];
  for (let i = numCaps - 1; i >= 0; i--) {
    out.push({
      from: i,
      to: Math.floor(Math.random() * (i + 1)),
    });
  }
  return out;
}

/** Shuffles an input array following input ShuffleSteps.  Returns a new array
 *
 * This function exists to run the shufflesteps given to the experimenter
 * on the schedule given to the helper.  This is how we know what the final
 * schedule is, at the end of the double-blinding process.
 * @param arr array pre-shuffling
 * @param steps shufflesteps to be performed on arr
 * @returns a new, shuffled array
 */
export function runShuffleSteps(arr: PILL[], steps: ShuffleStep[]): PILL[] {
  const out = arr.slice();
  for (const step of steps) {
    const temp = out[step.to];
    out[step.to] = out[step.from];
    out[step.from] = temp;
  }
  return out;
}

/** Produces a schedule that consists of "runs" of the treatment
 *
 * This method requires the treatment and control have the same number of pills
 * and has a <= runLen period at the beginning and end that consists of control
 * @param runLen length of a run of the same type of pill
 * @param numRuns number of runs of treatment
 * @returns schedule of runs
 */
export function produceAdvancedSchedule(runLen: number, numRuns: number) {
  const short = fisherYates(
      Array(numRuns).fill(PILL.TREATMENT).concat(Array(numRuns - 1).fill(PILL.CONTROL)),
  );
  const temp = short.map((v) => Array(runLen).fill(v)).reduce((x, y) => x.concat(y));
  // distribute runLen control pills randomly across beginning and end
  for (let i=0; i < runLen; i++) {
    if (Math.random() < 0.5) {
      temp.push(PILL.CONTROL);
    } else {
      temp.unshift(PILL.CONTROL);
    }
  }
  return temp;
}
