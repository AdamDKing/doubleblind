import {PILL} from './enums';
import {Dblnd, ShuffleStep} from './interfaces';

export function generateDblnd(controlCount: number, treatmentCount: number) : Dblnd {
  const tempSchedule = Array(controlCount).fill(PILL.CONTROL).concat(
      Array(treatmentCount).fill(PILL.TREATMENT));
  const helperSchedule = fisherYates(tempSchedule);
  const experimenterSteps = createShuffleSteps(controlCount + treatmentCount);

  return {
    controlPileRight: (Math.random()>0.5) ? true : false,
    helperSchedule: helperSchedule,
    experimenterSteps: experimenterSteps,
    finalSchedule: runShuffleSteps(helperSchedule, experimenterSteps),
  };
}

function fisherYates(arr: PILL[]): PILL[] {
  const out = arr.slice();
  for (let i=arr.length-1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i+1));

    const temp = out[i];
    out[i] = out[j];
    out[j] = temp;
  }
  return out;
}

/** Produces the steps the experimenter must take to perform Fisher-Yates shuffle. 0-based */
function createShuffleSteps(days: number) : ShuffleStep[] {
  const out : ShuffleStep[] = [];
  for (let i=days-1; i >=0; i--) {
    out.push({
      from: i,
      to: Math.floor(Math.random() * (i+1)),
    });
  }
  return out;
}

/** Shuffles an input array following input ShuffleSteps.  Returns a new array
 *
 * This function exists to run the shufflesteps given to the experimenter
 * on the schedule given to the helper.  This is how we know what the final
 * schedule is, at the end of the double-blinding process.
 */
function runShuffleSteps(arr: PILL[], steps: ShuffleStep[]) : PILL[] {
  const out = arr.slice();
  for (const step of steps) {
    const temp = out[step.to];
    out[step.to] = out[step.from];
    out[step.from] = temp;
  }
  return out;
}
