import {PILL} from './enums';

export interface Dblnd {
  controlPileRight: boolean,
  helperSchedule: PILL[],
  experimenterSteps: ShuffleStep[],
  finalSchedule: PILL[]
}

export interface ShuffleStep {
  from: number;
  to: number;
}
