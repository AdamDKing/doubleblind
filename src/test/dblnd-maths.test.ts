import {runShuffleSteps} from '../dblnd-maths';
import {PILL} from '../enums';

export {};

test('swap halves of array', () => {
  expect(runShuffleSteps(
      [PILL.CONTROL, PILL.CONTROL, PILL.CONTROL, PILL.TREATMENT, PILL.TREATMENT, PILL.TREATMENT],
      [{from: 0, to: 5}, {from: 2, to: 4}, {from: 1, to: 3}]))
      .toEqual(
          [PILL.TREATMENT, PILL.TREATMENT, PILL.TREATMENT,
            PILL.CONTROL, PILL.CONTROL, PILL.CONTROL]);
})
;
