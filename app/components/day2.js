import Component from '@glimmer/component';
import largeInput from '../inputs/day2';

export default class Day2Component extends Component {
  input = [
    ['forward', 5],
    ['down', 5],
    ['forward', 8],
    ['up', 3],
    ['down', 8],
    ['forward', 2],
  ];
  // BEGIN-SNIPPET day2-solution1
  get solution1() {
    let horizontalPos = 0;
    let depth = 0;
    largeInput.forEach(([instruction, amount]) => {
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

  get reduceSolution1() {
    return largeInput.reduce(
      (prev, [instruction, amount]) => {
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
  get solution2() {
    let horizontalPos = 0;
    let depth = 0;
    let aim = 0;
    largeInput.forEach(([instruction, amount]) => {
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

  get reduceSolution2() {
    return largeInput.reduce(
      (prev, [instruction, amount]) => {
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
