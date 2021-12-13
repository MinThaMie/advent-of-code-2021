import PuzzlesBaseController from './base';

export default class Puzzles12Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day12-solution1
  solve1(input) {
    let graph = this.makeAdjecencyList(input);
    let result = this.visit(
      'start',
      'end',
      ['start'],
      new Set(),
      graph,
      false
    ).flat(Infinity);
    return result.length;
  }

  makeAdjecencyList(input) {
    let adjacencyList = {};
    input.forEach((line) => {
      let [source, destination] = line.split('-');
      if (!adjacencyList[source]) {
        adjacencyList[source] = [];
      }
      if (!adjacencyList[destination]) {
        adjacencyList[destination] = [];
      }
      adjacencyList[source].push(destination);
      adjacencyList[destination].push(source);
    });
    return adjacencyList;
  }

  visit(start, end, path, visited, graph) {
    if (start == end) {
      return path.join(',');
    }
    let allPaths = [];
    visited.add(start);
    let adjacent = graph[start];
    // console.log(adjacent);
    adjacent.forEach((a) => {
      if (!visited.has(a) || this.isLargeCave(a)) {
        // console.log(`if`, a)
        allPaths.push(this.visit(a, end, [...path, a], visited, graph));
      }
    });
    visited.delete(start);
    return allPaths;
  }

  isLargeCave(str) {
    return str === str.toUpperCase();
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day12-solution2
  solve2(input) {
    let graph = this.makeAdjecencyList(input);
    let paths = this.visit2('start', 'end', ['start'], graph, false).flat();
    return paths.length;
  }

  visit2(node, end, path, graph, hasVisitedSmall) {
    if (node == end) {
      return path.join(',');
    }
    let allPath = [];
    let adjacent = graph[node];
    adjacent.forEach((a) => {
      if (this.isLargeCave(a)) {
        allPath.push(this.visit2(a, end, [...path, a], graph, hasVisitedSmall));
      } else {
        if (this.isSmallCave(a) && path.includes(a)) {
          if (!hasVisitedSmall) {
            allPath.push(this.visit2(a, end, [...path, a], graph, true));
          }
        } else if (a !== 'start') {
          allPath.push(
            this.visit2(a, end, [...path, a], graph, hasVisitedSmall)
          );
        }
      }
    });
    return allPath;
  }

  isSmallCave(str) {
    if (str == 'start') {
      return false;
    }
    return str === str.toLowerCase();
  }
  // END-SNIPPET
}
