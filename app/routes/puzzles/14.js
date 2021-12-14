import Route from '@ember/routing/route';

export default class Puzzles14Route extends Route {
  parseInput(file) {
    let [polymer, rules] = file.split('\n\n');
    let ruleDict = {};
    rules.split('\n').map(r => {
      let [pair, insert] = r.split(' -> ');
      ruleDict[pair] = insert;
    });
    return {polymer, ruleDict};
  }

  async model() {
    let resIntro = await fetch('/inputs/day14/intro.txt');
    let introFile = await resIntro.text();
    let res = await fetch('/inputs/day14/full.txt');
    let fullFile = await res.text();
    return {
      example: this.parseInput(introFile),
      full: this.parseInput(fullFile),
    };
  }
}
