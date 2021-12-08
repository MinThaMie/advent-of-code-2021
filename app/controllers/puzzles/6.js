import PuzzlesBaseController from './base';

export default class Puzzles6Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day6-solution1
  solve1(input) {
    let fish = [...input];
    let spawn = [];
    for (let i = 0; i < 80; i++) {
      let newFish = fish.map((fish) => {
        if (fish == 0) {
          spawn.push(8);
          return 6;
        } else {
          return fish - 1;
        }
      });
      fish = newFish.concat(spawn);
      spawn = [];
    }
    return fish.length;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day6-solution2
  solve2(input) {
    let fish = [...input];
    let uniqueFish = new Set(fish);
    let dict = {};
    uniqueFish.forEach((f) => (dict[f] = this.amountNewFish(256, f)));
    let result = fish.map((f) => dict[f]).reduce((a, b) => a + b);
    return result;
  }

  totalDict = {};
  amountNewFish(days, timer) {
    let today = days;
    let startTimer = timer;
    if (this.totalDict[`${today},${startTimer}`]) {
      return this.totalDict[`${today},${startTimer}`];
    }
    let toCheck = [];
    while (days >= 0) {
      toCheck.push(days - (timer + 1));
      if (timer == 6) {
        days = days - 7;
      } else {
        days = days - (timer + 1);
      }
      timer = 6;
    }
    if (toCheck.filter((a) => a >= 0).length == 0) {
      return 1;
    }

    let result = toCheck.map((f) => this.amountNewFish(f, 8));
    let amount = 0;
    for (let i = 0; i < result.length; i++) {
      amount += result[i] ?? 0;
    }
    this.totalDict[`${today},${startTimer}`] = amount;
    return amount;
  }
  // END-SNIPPET
}
