import PuzzlesBaseController from './base';

export default class Puzzles11Controller extends PuzzlesBaseController {
  lenght = 0;
  neighboursIndex(index, array) {
    const left = index % this.length !== 0 ? index - 1 : undefined;
    const right =
      index % this.length !== this.length - 1 ? index + 1 : undefined;
    const top = index - this.length >= 0 ? index - this.length : undefined;
    const topLeft = top >= 0 && left >= 0 ? top - 1 : undefined;
    const topRight = top >= 0 && right ? top + 1 : undefined;
    const bottom =
      index + this.length < array.length ? index + this.length : undefined;
    const bottomLeft = bottom && left >= 0 ? bottom - 1 : undefined;
    const bottomRight = bottom && right ? bottom + 1 : undefined;
    return [topLeft, top, topRight, left, right, bottomLeft, bottom, bottomRight].filter((x) => x != undefined);
  }

  solve1(input) {
    this.length = input[0].length;
    let allInput = input.flat();
    let flashes = 0;
    let steps = 100;
    let step = 1;
    while (step <= steps) {
      allInput = allInput.map((v) => v + 1);
      let greaterThenNine = allInput.map((v,i) => v > 9 ? i : undefined).filter(x => x !== undefined);
      let flashed = new Set();
      while (greaterThenNine.length > 0) {
        greaterThenNine.forEach(index => {
          let indices = this.neighboursIndex(index, allInput);
          indices.forEach(index => {
            allInput[index] = allInput[index] + 1;
          });
          flashed.add(index);
        });
        greaterThenNine = allInput.map((v,i) => v > 9 ? i : undefined).filter(x => x !== undefined).filter(x => !flashed.has(x));
      }
      // console.log("step ", step)
      flashes += flashed.size;
      flashed.forEach(index => allInput[index] = 0);
      step++;
    }
    return flashes;
  }
  solve2(input) {
    this.length = input[0].length;
    let allInput = input.flat();
    let step = 1;
    while (allInput.filter(v => v !== 0).length > 0) {
      allInput = allInput.map((v) => v + 1);
      let greaterThenNine = allInput.map((v,i) => v > 9 ? i : undefined).filter(x => x !== undefined);
      let flashed = new Set();
      while (greaterThenNine.length > 0) {
        greaterThenNine.forEach(index => {
          let indices = this.neighboursIndex(index, allInput);
          indices.forEach(index => {
            allInput[index] = allInput[index] + 1;
          });
          flashed.add(index);
        });
        greaterThenNine = allInput.map((v,i) => v > 9 ? i : undefined).filter(x => x !== undefined).filter(x => !flashed.has(x));
      }
      // console.log("step ", step)
      flashed.forEach(index => allInput[index] = 0);
      step++;
    }
    // console.log(step)
    return step - 1;
  }
}
