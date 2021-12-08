import PuzzlesBaseContoller from './base';

export default class Puzzles5Controller extends PuzzlesBaseContoller {
  // BEGIN-SNIPPET day5-solution1
  solve1(input) {
    let visitedOnce = new Set();
    let visitedMore = new Set();
    input.map(([x1, y1, x2, y2]) => {
      if (x1 == x2 || y1 == y2) {
        let coordinates = [];
        if (x1 !== x2) {
          coordinates = this.findHorizontalCoordinates(x1, x2, y1);
        } else {
          coordinates = this.findVerticalCoordinates(y1, y2, x1);
        }
        coordinates.forEach((coor) => {
          if (visitedOnce.has(coor)) {
            visitedMore.add(coor);
            return;
          }
          visitedOnce.add(coor);
        });
      }
    });
    return visitedMore.size;
  }

  findHorizontalCoordinates(x1, x2, y) {
    let coordinates = [];
    x1 = parseInt(x1);
    x2 = parseInt(x2);
    if (x1 > x2) {
      for (let i = x2; i <= x1; i++) {
        coordinates.push(`${i},${y}`);
      }
    } else {
      for (let i = x1; i <= x2; i++) {
        coordinates.push(`${i},${y}`);
      }
    }
    return coordinates;
  }

  findVerticalCoordinates(y1, y2, x) {
    let coordinates = [];
    y1 = parseInt(y1);
    y2 = parseInt(y2);
    if (y1 > y2) {
      for (let i = y2; i <= y1; i++) {
        coordinates.push(`${x},${i}`);
      }
    } else {
      for (let i = y1; i <= y2; i++) {
        coordinates.push(`${x},${i}`);
      }
    }
    return coordinates;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day5-solution2
  solve2(input) {
    let visitedOnce = new Set();
    let visitedMore = new Set();
    input.map(([x1, y1, x2, y2]) => {
      let coordinates = [];
      if (x1 == x2 || y1 == y2) {
        if (x1 !== x2) {
          coordinates = this.findHorizontalCoordinates(x1, x2, y1);
        } else {
          coordinates = this.findVerticalCoordinates(y1, y2, x1);
        }
      } else {
        coordinates = this.findDiagonalCoordinates(x1, x2, y1, y2);
      }
      coordinates.forEach((coor) => {
        if (visitedOnce.has(coor)) {
          visitedMore.add(coor);
          return;
        }
        visitedOnce.add(coor);
      });
    });
    return visitedMore.size;
  }

  findDiagonalCoordinates(x1, x2, y1, y2) {
    x1 = parseInt(x1);
    x2 = parseInt(x2);
    y1 = parseInt(y1);
    y2 = parseInt(y2);
    let xcoor = [];
    let ycoor = [];
    let coordinates = [];
    if (x1 < x2) {
      for (let i = x1; i <= x2; i++) {
        xcoor.push(i);
      }
      if (y1 > y2) {
        for (let i = y1; i >= y2; i--) {
          ycoor.push(i);
        }
      } else {
        for (let i = y1; i <= y2; i++) {
          ycoor.push(i);
        }
      }
    } else {
      for (let i = x2; i <= x1; i++) {
        xcoor.push(i);
      }
      if (y2 > y1) {
        for (let i = y2; i >= y1; i--) {
          ycoor.push(i);
        }
      } else {
        for (let i = y2; i <= y1; i++) {
          ycoor.push(i);
        }
      }
    }
    for (let i = 0; i < xcoor.length; i++) {
      coordinates.push(`${xcoor[i]},${ycoor[i]}`);
    }
    return coordinates;
  }
  // END-SNIPPET
}
