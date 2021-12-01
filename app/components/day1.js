import Component from '@glimmer/component';
import largeInput from '../inputs/day1';
export default class Day1Component extends Component {
  // @tracked solution;
  input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

  get solution1() {
    let increased = 0;
    let prev;
    largeInput.map((n) => {
      if (n > prev) {
        increased += 1;
      }
      prev = n;
    });
    return increased;
  }

  get solution2() {
    let increased = 0;
    let prev;
    largeInput.map((n, index) => {
      const sum = n + largeInput[index + 1] + largeInput[index + 2];
      if (sum > prev) {
        increased += 1;
      }
      prev = sum;
    });
    return increased;
  }
}
