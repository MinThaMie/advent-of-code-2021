import PuzzlesBaseContoller from './base';

export default class Puzzles20Controller extends PuzzlesBaseContoller {
  directions = [
    { dx: -1, dy: -1 },
    { dx: 0, dy: -1 },
    { dx: 1, dy: -1 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: -1, dy: 1 },
    { dx: 0, dy: 1 },
    { dx: 1, dy: 1 },
  ];

  // BEGIN-SNIPPET day20-solution1
  solve1(text) {
    return this.solve(text, 2);
  }

  solve(text, loops) {
    let [algorithm, input] = text;
    input = input.map((row) => row.split(''));
    let fill = '.';
    let fillIndex = 0;
    let looped = 0;
    while (looped < loops) {
      input = this.makeSpace(input, fill);
      let copy = input.map((row) => [...row]);
      input.forEach((row, y) => {
        row.forEach((cell, x) => {
          let number = parseInt(this.binary(x, y, input, fill), 2);
          let result = algorithm[number];
          copy[y][x] = result;
        });
      });
      input = copy;
      fillIndex = fill == '.' ? 0 : 511;
      fill = algorithm[fillIndex];
      looped++;
    }
    return input.flat().filter((v) => v == '#').length;
  }

  binary(x, y, input, fill) {
    let binary = '';
    for (let i = 0; i < this.directions.length; i++) {
      const neighbour =
        input[y + this.directions[i].dy]?.[x + this.directions[i].dx];
      if (neighbour === undefined) {
        binary += fill == '#' ? '1' : '0';
      } else {
        binary += neighbour == '#' ? '1' : '0';
      }
    }
    return binary;
  }

  makeSpace(input, fill) {
    input = input.map((row) => {
      return [fill, fill, ...row, fill, fill];
    });
    let emptyRow = fill.repeat(input[0].length).split('');
    return [
      [...emptyRow],
      [...emptyRow],
      ...input,
      [...emptyRow],
      [...emptyRow],
    ];
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day20-solution2
  solve2(text) {
    return this.solve(text, 50);
  }
  // END-SNIPPET

  print(matrix) {
    for (let i = 0; i < matrix.length; i++) {
      console.log(matrix[i].join(''));
    }
  }
}
