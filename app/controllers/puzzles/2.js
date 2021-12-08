import PuzzlesBaseController from './base';

export default class Puzzles2Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day2-solution1
  solve1(input) {
    let horizontalPos = 0;
    let depth = 0;
    input.forEach(([instruction, amount]) => {
      amount = parseInt(amount);
      switch (instruction) {
        case 'forward':
          horizontalPos += amount;
          break;
        case 'up':
          depth -= amount;
          break;
        case 'down':
          depth += amount;
      }
    });
    return horizontalPos * depth;
  }

  reduceSolution1(input) {
    return input.reduce(
      (prev, [instruction, amount]) => {
        amount = parseInt(amount);
        let curr = { ...prev };
        switch (instruction) {
          case 'forward':
            curr.horizon += amount;
            break;
          case 'up':
            curr.depth -= amount;
            break;
          case 'down':
            curr.depth += amount;
        }
        curr.result = curr.horizon * curr.depth;
        return curr;
      },
      { horizon: 0, depth: 0, result: 0 }
    );
  }
  // END-SNIPPET
  // BEGIN-SNIPPET day2-solution2
  solve2(input) {
    let horizontalPos = 0;
    let depth = 0;
    let aim = 0;
    input.forEach(([instruction, amount]) => {
      amount = parseInt(amount);
      switch (instruction) {
        case 'forward':
          horizontalPos += amount;
          depth += aim * amount;
          break;
        case 'up':
          aim -= amount;
          break;
        case 'down':
          aim += amount;
      }
    });
    return horizontalPos * depth;
  }

  reduceSolution2(input) {
    return input.reduce(
      (prev, [instruction, amount]) => {
        amount = parseInt(amount);
        let curr = { ...prev };
        switch (instruction) {
          case 'forward':
            curr.horizon += amount;
            curr.depth += curr.aim * amount;
            break;
          case 'up':
            curr.aim -= amount;
            break;
          case 'down':
            curr.aim += amount;
        }
        curr.result = curr.horizon * curr.depth;
        return curr;
      },
      { horizon: 0, depth: 0, aim: 0, result: 0 }
    );
  }
  // END-SNIPPET
}
