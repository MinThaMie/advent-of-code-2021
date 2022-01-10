import PuzzlesBaseController from './base';

export default class Puzzles25Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day25-solution1
  solve1(input) {
    let current = input;
    let keepGoing = true;
    let counter = 0;
    while (keepGoing) {
      counter += 1;
      let east = this.moveEast(current);
      let south = this.moveSouth(current, east);
      keepGoing = current.flat().toString() !== south.flat().toString();
      current = south;
    }
    return counter;
  }
  moveEast(matrix) {
    let copy = this.makeEmptyCopy(matrix);
    let rowLenght = matrix[0].length;
    matrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell == '>') {
          if (matrix[y][(x + 1) % rowLenght] == '.') {
            copy[y][(x + 1) % rowLenght] = '>';
          } else {
            copy[y][x] = '>';
          }
        }
      });
    });
    return copy;
  }

  moveSouth(matrix, east) {
    let columLength = matrix.length;
    matrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell == 'v') {
          if (
            east[(y + 1) % columLength][x] == '.' &&
            matrix[(y + 1) % columLength][x] !== 'v'
          ) {
            east[(y + 1) % columLength][x] = 'v';
          } else {
            east[y][x] = 'v';
          }
        }
      });
    });
    return east;
  }

  makeEmptyCopy(matrix) {
    let value = '.';
    return [...Array(matrix.length)].map(() =>
      Array(matrix[0].length).fill(value)
    );
  }
  //END-SNIPPET

  // BEGIN-SNIPPET day25-solution2
  solve2(input) {
    return 'not solvable untill you have all the stars';
  }
  //END-SNIPPET
}
