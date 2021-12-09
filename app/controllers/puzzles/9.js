import PuzzleBaseController from './base';

export default class Puzzles9Controller extends PuzzleBaseController {
  solve1(input) {
    let result = 0;
    let length = input[0].length;
    let all = input.flat();
    all.map((v, index) => {
      let toCheck = this.neighbours(index, all, length);
      if (toCheck.every((x) => x > v)) {
        result = result + v + 1;
      }
    });
    return result;
  }

  neighbours(index, array, length) {
    const left = index % length !== 0 ? array[index - 1] : undefined;
    const right = index !== length - 1 ? array[index + 1] : undefined;
    return [array[index - length], left, right, array[index + length]].filter(
      (x) => x != undefined
    );
  }

  neighboursIndexNot9(index, array, length) {
    const left =
      index % length !== 0 && array[index - 1] !== 9 ? index - 1 : undefined;
    const right =
      index % length !== length - 1 && array[index + 1] !== 9
        ? index + 1
        : undefined;
    const top =
      array[index - length] !== 9 && index - length > 0
        ? index - length
        : undefined;
    const bottom =
      array[index + length] !== 9 && index + length < array.length
        ? index + length
        : undefined;
    return [top, left, right, bottom].filter((x) => x != undefined);
  }

  solve2(input) {
    let lowPoints = [];
    let length = input[0].length;
    let all = input.flat();
    all.map((v, index) => {
      let toCheck = this.neighbours(index, all, length).filter(
        (x) => x != undefined
      );
      if (toCheck.every((x) => x > v)) {
        lowPoints.push(index);
      }
    });
    let basins = [];
    lowPoints.forEach((lw) => {
      let toCheck = new Set();
      let checked = new Set();
      checked.add(lw);
      this.neighboursIndexNot9(lw, all, length).forEach(toCheck.add, toCheck);
      while (toCheck.size > 0) {
        let toAdd = [];
        toCheck.forEach((n) => {
          checked.add(n);
          toAdd = [
            ...toAdd,
            ...this.neighboursIndexNot9(n, all, length).filter(
              (x) => !checked.has(x)
            ),
          ];
        });
        toCheck = new Set(toAdd);
      }
      basins.push(checked.size);
    });
    let largestBasins = basins.sort((a, b) => a - b).slice(-3);
    return largestBasins.reduce((prev, curr) => prev * curr, 1);
  }
}
