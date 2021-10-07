import {fisherYates, runShuffleSteps} from '../dblnd-maths';
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

test('fixed random value of 0.99 shuffles to current position', () => {
  Math.random = jest.fn(() => 0.99);
  const arr = [PILL.TREATMENT, PILL.CONTROL, PILL.CONTROL, PILL.TREATMENT, PILL.TREATMENT];
  expect(fisherYates(arr)).toEqual(arr);
});

test('fixed random value of 0.01 shuffles to left rotation by 1', () => {
  Math.random = jest.fn(() => 0.01);
  const arr = [PILL.TREATMENT, PILL.CONTROL, PILL.CONTROL, PILL.TREATMENT, PILL.TREATMENT];
  const arrShiftedLeft = arr.slice(1).concat(arr[0]);
  expect(fisherYates(arr)).toEqual(arrShiftedLeft);
});


