import PuzzlesBaseController from './base';

export default class Puzzles3Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day3-solution1
  solve1(input) {
    let majority = input.length / 2 + 1;
    let bits = input[0].length;
    let counter1 = new Array(bits).fill(0);
    input.forEach((e) => {
      e.forEach((v, index) => {
        if (v == '1') {
          counter1[index] = counter1[index] + 1;
        }
      });
    });
    let gamma = parseInt(
      counter1.map((v) => (v >= majority ? '1' : '0')).join(''),
      2
    );
    let epsilon = parseInt(
      counter1.map((v) => (v < majority ? '1' : '0')).join(''),
      2
    );
    return `${gamma * epsilon}`;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day3-solution2
  solve2(input) {
    let oxygen = parseInt(this.oxygen(input), 2);
    let co2 = parseInt(this.co2(input), 2);
    return `${oxygen * co2}`;
  }

  oxygen(array) {
    let currentFilterPos = 0;
    let result = [...array];
    let mostBit = this.mostBit(result, currentFilterPos);
    while (result.length > 1) {
      result = result.filter((e) => e[currentFilterPos] == mostBit);
      currentFilterPos++;
      mostBit = this.mostBit(result, currentFilterPos);
    }
    return result[0].join('');
  }

  co2(array) {
    let currentFilterPos = 0;
    let result = array;
    let leastBit = this.leastBit(result, currentFilterPos);
    while (result.length > 1) {
      result = result.filter((e) => e[currentFilterPos] == leastBit);
      currentFilterPos++;
      leastBit = this.leastBit(result, currentFilterPos);
    }
    return result[0].join('');
  }

  mostBit(array, index) {
    let amount1 = array.filter((e) => e[index] == '1').length;
    let amount0 = array.length - amount1;
    return amount1 >= amount0 ? '1' : '0';
  }

  leastBit(array, index) {
    let amount1 = array.filter((e) => e[index] == '1').length;
    let amount0 = array.length - amount1;
    return amount1 < amount0 ? '1' : '0';
  }
  // END-SNIPPET
}
