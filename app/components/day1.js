import Component from '@glimmer/component';
import largeInput from '../inputs/day1';
import { windowed } from '../helpers/array';
export default class Day1Component extends Component {
  input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

  // BEGIN-SNIPPET day1-solution1
  get solution1() {
    let increased = 0;
    let prev;
    largeInput.forEach((n) => {
      if (n > prev) {
        increased += 1;
      }
      prev = n;
    });
    return increased;
  }

  get functionalSolution1() {
    let array = windowed(largeInput, 2);
    return array.filter(([prev, curr]) => curr > prev).length;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day1-solution2
  get solution2() {
    let increased = 0;
    let prev;
    largeInput.forEach((n, index) => {
      const sum = n + largeInput[index + 1] + largeInput[index + 2];
      if (sum > prev) {
        increased += 1;
      }
      prev = sum;
    });
    return increased;
  }

  get functionalSolution2() {
    let array = windowed(largeInput, 4);
    return array.filter(([prev, , , curr]) => curr > prev).length;
  }
  // END-SNIPPET
}
