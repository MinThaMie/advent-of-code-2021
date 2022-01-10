import PuzzlesBaseController from './base';

export default class Puzzles22Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day22-solution1
  solve1(input) {
    let on = new Set();
    input.forEach((instruction) => {
      let [inst, [minX, maxX], [minY, maxY], [minZ, maxZ]] = instruction;
      minX = minX < -50 ? -50 : minX;
      minY = minY < -50 ? -50 : minY;
      minZ = minZ < -50 ? -50 : minZ;
      maxX = maxX > 50 ? 50 : maxX;
      maxY = maxY > 50 ? 50 : maxY;
      maxZ = maxZ > 50 ? 50 : maxZ;

      if (inst == 'on') {
        for (let x = minX; x <= maxX; x++) {
          for (let y = minY; y <= maxY; y++) {
            for (let z = minZ; z <= maxZ; z++) {
              on.add(`${x},${y},${z}`);
            }
          }
        }
      } else {
        for (let x = minX; x <= maxX; x++) {
          for (let y = minY; y <= maxY; y++) {
            for (let z = minZ; z <= maxZ; z++) {
              on.delete(`${x},${y},${z}`);
            }
          }
        }
      }
    });
    return on.size;
  }
  // END-SNIPPET

  //BEGIN-SNIPPET day22-solution2
  // I've stareted on this, but this did not work
  solve2(input) {
    let solved = false;
    if (solved) {
      let on = new Set();
      let cMinX = Infinity;
      let cMaxX = -Infinity;
      let cMinY = Infinity;
      let cMaxY = -Infinity;
      let cMinZ = Infinity;
      let cMaxZ = -Infinity;
      input.forEach((instruction) => {
        let [inst, [minX, maxX], [minY, maxY], [minZ, maxZ]] = instruction;
        if (inst == 'on') {
          if (
            minX > cMinX &&
            maxX < cMaxX &&
            minY > cMinY &&
            maxY < cMaxY &&
            minZ > cMinZ &&
            maxZ < cMaxZ
          ) {
            console.log('already in a on square');
            return;
          }
          for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
              for (let z = minZ; z <= maxZ; z++) {
                on.add(`${x},${y},${z}`);
              }
            }
          }
          cMinX = minX;
          cMaxX = maxX;
          cMinY = minY;
          cMaxY = maxY;
          cMinZ = minZ;
          cMaxZ = maxZ;
        } else {
          for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
              for (let z = minZ; z <= maxZ; z++) {
                on.delete(`${x},${y},${z}`);
              }
            }
          }
        }
      });
      return on.size;
    }
    return 'not solved';
  }
  // END-SNIPPET
}
