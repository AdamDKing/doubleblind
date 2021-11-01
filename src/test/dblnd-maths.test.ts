import seedrandom from 'seedrandom';
import {createTargetedShuffleSteps, fisherYates, runShuffleSteps} from '../dblnd-maths';
import {PILL} from '../enums';
const C = PILL.CONTROL;
const T = PILL.TREATMENT;

export {};

describe('creating arrays and shufflesteps with runs', () => {
  // test produceAdvancedSchedule createTargetedShuffleSteps
  test('start and (different) final of length 2 swaps those 2', () => {
    const start = [T, C];
    const final = [C, T];
    const ss = createTargetedShuffleSteps(start, final);
    expect(ss[0].from + ss[0].to).toEqual(1);
  });

  // This test relies on implementation starting from the beginning.  Difficult to test otherwise
  test('swap single control from beginning to end', () => {
    const start = [T, T, T, T, C];
    const final = [C, T, T, T, T];
    const ss = createTargetedShuffleSteps(start, final);
    try {
      expect(ss).toContainEqual({to: 0, from: 4});
    } catch {
      expect(ss).toContainEqual({to: 4, from: 0});
    }
  });

  test('createTargettedShuffleSteps is correct according to runShuffleSteps', () => {
    seedrandom('Hello', {global: true});
    const start = [T, T, C, C, T, C, C, C, T, C, T, T];
    const final = [C, T, C, T, T, T, T, C, C, T, C, C];
    const ss = createTargetedShuffleSteps(start, final);
    console.log(ss);
    expect(final).toEqual(runShuffleSteps(start, ss));
  });
});

test('swap halves of array', () => {
  expect(runShuffleSteps([C, C, C, T, T, T],
      [{from: 0, to: 5}, {from: 2, to: 4}, {from: 1, to: 3}]))
      .toEqual([T, T, T, C, C, C]);
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


