import Component from '@glimmer/component';

export default class Day3Component extends Component {
  // BEGIN-SNIPPET day3-solution1
  get solution1() {
    let providedInput = this.args.file.lines;
    let majority = providedInput.length / 2 + 1;
    let bits = providedInput[0].length;
    let counter1 = new Array(bits).fill(0);
    providedInput.forEach((e) => {
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
  get solution2() {
    let oxygen = parseInt(this.oxygen(this.args.file.lines),2);
    let co2 = parseInt(this.co2(this.args.file.lines),2);
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
