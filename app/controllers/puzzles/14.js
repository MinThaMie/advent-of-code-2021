import PuzzlesBaseController from './base';

export default class Puzzles14Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day14-solution1
  solve1(input) {
    let polymer = input.polymer;
    let rules = input.ruleDict;
    let steps = 0;
    while (steps < 10) {
      let newPolymer = '';
      for (let i = 0; i < polymer.length - 1; i++) {
        let pair = polymer.substring(i, i + 2);
        let toInsert = rules[pair];
        let merged = pair[0] + toInsert;
        newPolymer += merged;
      }
      polymer = newPolymer + polymer[polymer.length - 1];
      steps++;
    }
    let allChars = new Set(polymer);
    let minCount = Infinity;
    let maxCount = 0;
    allChars.forEach((c) => {
      let count = polymer.split('').filter((l) => c == l).length;
      if (count < minCount) {
        minCount = count;
      }
      if (maxCount < count) {
        maxCount = count;
      }
    });
    return maxCount - minCount;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day14-solution2
  solve2(input) {
    let polymer = input.polymer;
    let rules = input.ruleDict;
    let uniquePairs = new Set();
    let allLevel20pols = [];
    for (let i = 0; i < polymer.length - 1; i++) {
      let pol = this.twentySteps(polymer[i] + polymer[i + 1], rules);
      this.getUniquePairs(pol).forEach((p) => uniquePairs.add(p));
      allLevel20pols.push(pol);
    }
    let pairMap = new Map();
    uniquePairs.forEach((p) => {
      let pol = this.twentySteps(p, rules);
      let allChars = new Set(pol);
      let countMap = new Map();
      allChars.forEach((c) => {
        let count = pol.split('').filter((l) => c == l).length;
        if (countMap.has(c)) {
          countMap.set(c, count + countMap.get(c));
        } else {
          countMap.set(c, count);
        }
      });
      pairMap.set(p, countMap);
    });
    let countMap = new Map();
    let keys = Object.keys(rules)
      .map((k) => k.split(''))
      .flat();
    keys.forEach((k) => countMap.set(k, 0));

    allLevel20pols.forEach((pol) => {
      for (let i = 0; i < pol.length - 1; i++) {
        let pair = pol.substring(i, i + 2);
        let double = pair[1];
        let counts = pairMap.get(pair);
        if (counts) {
          counts.forEach((k, v) => {
            countMap.set(v, countMap.get(v) + k);
          });
          countMap.set(double, countMap.get(double) - 1);
        }
      }
    });
    let minCount = Infinity;
    let maxCount = 0;
    let lastLetter = input.polymer.slice(-1);
    countMap.forEach((v, k) => {
      if (v < minCount) {
        minCount = v;
        if (k == lastLetter) {
          minCount += 1;
        }
      }
      if (maxCount < v) {
        maxCount = v;
        if (k == lastLetter) {
          maxCount += 1;
        }
      }
    });
    return maxCount - minCount;
  }

  twentySteps(str, rules) {
    let polymer = str;
    let steps = 0;
    while (steps < 20) {
      let newPolymer = '';
      for (let i = 0; i < polymer.length - 1; i++) {
        let pair = polymer.substring(i, i + 2);
        let toInsert = rules[pair];
        let merged = pair[0] + toInsert;
        newPolymer += merged;
      }
      polymer = newPolymer + polymer[polymer.length - 1];
      steps++;
    }
    return polymer;
  }

  getUniquePairs(pol) {
    let pairs = new Set();
    for (let i = 0; i < pol.length - 1; i++) {
      let pair = pol.substring(i, i + 2);
      pairs.add(pair);
    }
    return pairs;
  }
  // END-SNIPPET
}
