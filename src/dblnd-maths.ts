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

/** Generates a Dblnd using runs of pills, instead of uniform random order
 *
 * @param controlCount count of control (assumed same as treatment)
 * @param runLen length of run of pills
 * @returns Dblnd
 */
export function generateRunsDblnd(controlCount: number, runLen: number): Dblnd {
  const tempSchedule = Array(controlCount).fill(PILL.CONTROL).concat(
      Array(controlCount).fill(PILL.TREATMENT));
  const helperSchedule = fisherYates(tempSchedule);
  const finalSchedule = produceAdvancedSchedule(runLen, (controlCount / runLen));
  const experimenterSteps = createTargetedShuffleSteps(helperSchedule, finalSchedule);
  return {
    controlPileRight: (Math.random() > 0.5) ? true : false,
    helperSchedule: helperSchedule,
    experimenterSteps: experimenterSteps,
    finalSchedule: finalSchedule,
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

/** Creates ShuffleSteps that have the experimenter reach an input targer PILL[]
 *
 * This function exists to support the creation of ShuffleStep[] that arrive
 * at a pre-specified array, instead of randomizing an array.  The current
 * implementation swaps every single pill, picking at random any of the
 * pills of the desired type.  This implementation is probably a bad
 * idea if the number of pills of control and treatment are not the same.
 * TBH I'm not sure how to convince myself on this -- going to ask for help
 * The code here could be simpler, I'm sure.
 *
 * @param start Starting array of pills
 * @param target Target array of pills
 * @returns ShuffleStep[] that turns start into target
 */
export function createTargetedShuffleSteps(start: PILL[], target: PILL[]) {
  const out: ShuffleStep[] = [];
  const locs: {[PILL.TREATMENT]: number[], [PILL.CONTROL]: number[]} = {
    [PILL.TREATMENT]: start
        .map((p, i): [PILL, number] => [p, i])
        .filter((pi) => pi[0] === PILL.TREATMENT)
        .map((pi) => pi[1]),
    [PILL.CONTROL]: start
        .map((p, i): [PILL, number] => [p, i])
        .filter((pi) => pi[0] === PILL.CONTROL)
        .map((pi) => pi[1]),
  };
  let i=0;
  for (const p of target) {
    const locsI = Math.floor(Math.random()*locs[p].length);
    out.push({
      from: locs[p][locsI],
      to: i,
    });
    // now we just need to adjust locs to account for the swap
    // if locs[p] includes i, then locs[p] has both i and locs[p][locsI]
    // and we're done.
    if (!locs[p].includes(i)) {
      const swapFrom = locs[p].splice(locsI, 1)[0];
      locs[p].push(i);
      const notP = p === PILL.TREATMENT ? PILL.CONTROL : PILL.TREATMENT;
      locs[notP] = locs[notP].filter((e) => e !== i);
      locs[notP].push(swapFrom);
    }

    i++;
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
  const temp = short.map((v) => Array(runLen).fill(v)).reduce((x, y) => {
    return x.concat(y);
  });
  // distribute runLen control pills randomly across beginning and end
  for (let i=0; i < runLen; i++) {
    if (Math.random() < 0.5) {
      temp.push(PILL.CONTROL);
    } else {
      temp.unshift(PILL.CONTROL);
    }
  }
  console.log(temp);
  return temp;
}


