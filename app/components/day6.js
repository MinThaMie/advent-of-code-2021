import Component from '@glimmer/component';

export default class Day6Component extends Component {
  intro = [3, 4, 3, 1, 2];
  full = [
    2, 3, 1, 3, 4, 4, 1, 5, 2, 3, 1, 1, 4, 5, 5, 3, 5, 5, 4, 1, 2, 1, 1, 1, 1,
    1, 1, 4, 1, 1, 1, 4, 1, 3, 1, 4, 1, 1, 4, 1, 3, 4, 5, 1, 1, 5, 3, 4, 3, 4,
    1, 5, 1, 3, 1, 1, 1, 3, 5, 3, 2, 3, 1, 5, 2, 2, 1, 1, 4, 1, 1, 2, 2, 2, 2,
    3, 2, 1, 2, 5, 4, 1, 1, 1, 5, 5, 3, 1, 3, 2, 2, 2, 5, 1, 5, 2, 4, 1, 1, 3,
    3, 5, 2, 3, 1, 2, 1, 5, 1, 4, 3, 5, 2, 1, 5, 3, 4, 4, 5, 3, 1, 2, 4, 3, 4,
    1, 3, 1, 1, 2, 5, 4, 3, 5, 3, 2, 1, 4, 1, 4, 4, 2, 3, 1, 1, 2, 1, 1, 3, 3,
    3, 1, 1, 2, 2, 1, 1, 1, 5, 1, 5, 1, 4, 5, 1, 5, 2, 4, 3, 1, 1, 3, 2, 2, 1,
    4, 3, 1, 1, 1, 3, 3, 3, 4, 5, 2, 3, 3, 1, 3, 1, 4, 1, 1, 1, 2, 5, 1, 4, 1,
    2, 4, 5, 4, 1, 5, 1, 5, 5, 1, 5, 5, 2, 5, 5, 1, 4, 5, 1, 1, 3, 2, 5, 5, 5,
    4, 3, 2, 5, 4, 1, 1, 2, 4, 4, 1, 1, 1, 3, 2, 1, 1, 2, 1, 2, 2, 3, 4, 5, 4,
    1, 4, 5, 1, 1, 5, 5, 1, 4, 1, 4, 4, 1, 5, 3, 1, 4, 3, 5, 3, 1, 3, 1, 4, 2,
    4, 5, 1, 4, 1, 2, 4, 1, 2, 5, 1, 1, 5, 1, 1, 3, 1, 1, 2, 3, 4, 2, 4, 3, 1,
  ];

  // BEGIN-SNIPPET day6-solution1
  get solution1() {
    let fish = [...this.full];
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
  get solution2() {
    let fish = [...this.full];
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
