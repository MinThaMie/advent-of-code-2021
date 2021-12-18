import PuzzlesBaseController from './base';

export default class Puzzles17Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day17-solution1
  solve1(input) {
    let [, y_range] = input;
    let absMaxY = Math.abs(y_range.split(',')[0]);
    let maxHeight = ((absMaxY - 1) * absMaxY) / 2;
    return maxHeight;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day17-solution2
  solve2(input) {
    let velocities = new Set();
    let [minX, maxX] = input[0].split(',');
    let [minY, maxY] = input[1].split(',');
    let firstX = Math.floor(-1 + Math.sqrt(1 + 8 * minX) / 2) + 1;
    let maxHeight = ((Math.abs(minY) - 1) * Math.abs(minY)) / 2;
    let lastY = Math.floor(-1 + Math.sqrt(1 + 8 * maxHeight) / 2) + 1;
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        velocities.add(`${x},${y}`);
      }
    }
    for (let x = firstX; x <= maxX / 2 + 1; x++) {
      for (let y = minY; y <= lastY; y++) {
        if (this.isHitting(x, y, minX, maxX, minY, maxY)) {
          velocities.add(`${x},${y}`);
        }
      }
    }
    return velocities.size;
  }

  isHitting(x, y, minX, maxX, minY, maxY) {
    let sX = parseInt(x);
    let sY = parseInt(y);
    let posX = 0;
    let posY = 0;
    while (posY >= parseInt(minY)) {
      posX += sX;
      posY += sY;
      sX -= sX > 0 ? 1 : 0;
      sY -= 1;
      if (posX <= maxX && posX >= minX && posY >= minY && posY <= maxY) {
        break;
      }
    }
    return posX <= maxX && posX >= minX && posY <= maxY && posY >= minY;
  }
  // END-SNIPPET
}
