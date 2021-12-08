import Controller from '@ember/controller';
import { windowed } from '../../helpers/array';

export default class Puzzles1Controller extends Controller {
  get example1() {
    return this.solve1(this.model.example);
  }
  get solution1() {
    return this.solve1(this.model.full);
  }
  get example2() {
    return this.solve2(this.model.example);
  }
  get solution2() {
    return this.solve2(this.model.full);
  }

  // BEGIN-SNIPPET day1-solution1
  solve1(input) {
    let increased = 0;
    let prev;
    input.forEach((n) => {
      if (n > prev) {
        increased += 1;
      }
      prev = n;
    });
    return increased;
  }

  functionalSolution1() {
    let array = windowed(this.model.full, 2);
    return array.filter(([prev, curr]) => curr > prev).length;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day1-solution2
  solve2(input) {
    let increased = 0;
    let prev;
    input.forEach((n, index) => {
      const sum = n + input[index + 1] + input[index + 2];
      if (sum > prev) {
        increased += 1;
      }
      prev = sum;
    });
    return increased;
  }

  functionalSolution2() {
    let array = windowed(this.model.full, 4);
    return array.filter(([prev, , , curr]) => curr > prev).length;
  }
  // END-SNIPPET
}
