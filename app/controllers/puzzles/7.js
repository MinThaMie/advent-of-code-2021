import PuzzleBaseController from './base';

export default class Puzzles7Controller extends PuzzleBaseController {
  // BEGIN-SNIPPET day7-solution1
  solve1(input) {
    let sorted = input.sort((a, b) => a > b);
    let min = sorted[0];
    let max = sorted[sorted.length - 1];
    let cost = Infinity;
    for (let i = min; i <= max; i++) {
      let currentCost = 0;
      for (let index = 0; index < sorted.length; index++) {
        if (currentCost > cost) {
          break;
        }
        currentCost = currentCost + Math.abs(sorted[index] - i);
      }
      if (currentCost < cost) {
        cost = currentCost;
      }
    }
    return cost;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day7-solution2
  solve2(input) {
    let sorted = input.sort((a, b) => a > b);
    let min = sorted[0];
    let max = sorted[sorted.length - 1];
    let cost = Infinity;
    for (let i = min; i <= max; i++) {
      let currentCost = 0;
      for (let index = 0; index < sorted.length; index++) {
        if (currentCost > cost) {
          break;
        }
        currentCost = currentCost + this.stepCost(Math.abs(sorted[index] - i));
      }
      if (currentCost < cost) {
        cost = currentCost;
      }
    }
    return cost;
  }

  stepCost(amount) {
    let total = 0;
    for (let i = 1; i <= amount; i++) {
      total += i;
    }
    return total;
  }
  // END-SNIPPET
}
