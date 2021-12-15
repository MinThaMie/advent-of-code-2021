import PuzzlesBaseController from './base';

export default class Puzzles15Controller extends PuzzlesBaseController {
  directions = [
    { dx: 0, dy: -1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: 1 },
  ];

  getNeighbours(coor, matrix) {
    let [x, y] = coor.split(',').map((v) => parseInt(v));
    let neighbours = [];
    for (let i = 0; i < this.directions.length; i++) {
      const neighbour =
        matrix[y + this.directions[i].dy]?.[x + this.directions[i].dx];
      if (neighbour) {
        neighbours.push([
          neighbour,
          `${x + this.directions[i].dx},${y + this.directions[i].dy}`,
        ]);
      }
    }
    return neighbours;
  }

  lowestKey(distance, unvisited) {
    let lowest = Infinity;
    let lowestK = undefined;
    unvisited.forEach((k) => {
      if (distance.get(k) < lowest) {
        lowest = distance.get(k);
        lowestK = k;
      }
    });
    return lowestK;
  }

  dijkstra(input) {
    let distancesMap = new Map();
    let unvisited = new Set();
    let visited = new Set();
    let toVisit = new Set();
    input.forEach((row, y) => {
      row.forEach((cell, x) => {
        distancesMap.set(`${x},${y}`, Infinity);
        unvisited.add(`${x},${y}`);
      });
    });
    distancesMap.set('0,0', 0);
    let current = '0,0';
    let end = `${input[0].length - 1},${input.length - 1}`;
    while (!visited.has(end)) {
      let currentDistance = distancesMap.get(current);
      let neighbours = this.getNeighbours(current, input);
      neighbours
        .filter(([_, coor]) => unvisited.has(coor))
        .forEach(([value, coor]) => {
          let dist = distancesMap.get(coor);
          if (dist > currentDistance + value) {
            toVisit.add(coor);
            distancesMap.set(coor, currentDistance + value);
          }
        });
      visited.add(current);
      unvisited.delete(current);
      current = this.lowestKey(distancesMap, toVisit);
      toVisit.delete(current);
    }
    return distancesMap.get(end);
  }

  solve1(input) {
    return this.dijkstra(input);
  }

  solve2(input) {
    let horizontalField = [];
    input.forEach((row, y) => {
      horizontalField.push([...row]);
      for (let i = 1; i < 5; i++) {
        row.forEach((cell, x) => {
          horizontalField[y].push(cell + i <= 9 ? cell + i : (cell + i) % 9);
        });
      }
    });
    let verticalField = [];
    for (let i = 1; i < 5; i++) {
      horizontalField.forEach((row, y) => {
        let newRow = row.map((cell) =>
          cell + i <= 9 ? cell + i : (cell + i) % 9
        );
        verticalField.push(newRow);
      });
    }
    let wholeField = horizontalField.concat(verticalField);
    let result = this.dijkstra(wholeField);
    return result;
  }
}
