import PuzzlesBaseController from './base';
import { htmlSafe } from '@ember/template';

export default class Puzzles13Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day13-solution1
  solve1(input) {
    let coordinates = [...input.coordinates];
    let instructions = [input.instructions[0]];
    instructions.forEach((instruction) => {
      coordinates = [...this.fold(instruction, coordinates)];
    });
    return coordinates.length;
  }

  fold(instruction, coordinates) {
    let [ax, value] = instruction.split(' ')[2].split('=');
    let newCoordinates = [];
    value = parseInt(value);
    for (let str of coordinates) {
      let [x, y] = str.split(',');
      let coor = { y: parseInt(y), x: parseInt(x) };
      if (coor[ax] > value) {
        let delta = coor[ax] - value;
        let move = 2 * delta;
        let newAx = coor[ax] - move;
        if (newAx >= 0) {
          if (ax == 'y') {
            let newCoor = `${x},${newAx}`;
            if (!coordinates.includes(newCoor)) {
              newCoordinates.push(newCoor);
            }
          } else {
            let newCoor = `${newAx},${y}`;
            if (!coordinates.includes(newCoor)) {
              newCoordinates.push(newCoor);
            }
          }
        }
      } else {
        newCoordinates.push(str);
      }
    }
    return newCoordinates;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day13-solution2
  solve2(input) {
    let coordinates = [...input.coordinates];
    let instructions = input.instructions;
    instructions.forEach((instruction) => {
      coordinates = [...this.fold(instruction, coordinates)];
    });
    return this.print(coordinates);
  }

  print(coordinates) {
    let str = '';
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 40; x++) {
        if (coordinates.includes(`${x},${y}`)) {
          str += '#';
        } else {
          str += ' ';
        }
      }
      str += '\n';
    }
    return htmlSafe(
      `<div style="white-space:pre-wrap; font-family: monospace;">${str}</div>`
    );
  }
  // END-SNIPPET
}
