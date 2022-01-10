import Route from '@ember/routing/route';

export default class Puzzles21Route extends Route {
  parseInput(file) {
    let startPositions = file
      .split('\n')
      .map((line) => parseInt(line.split(' ').pop()));
    return startPositions;
  }

  async model() {
    let resIntro = await fetch('/inputs/day21/intro.txt');
    let introFile = await resIntro.text();
    let res = await fetch('/inputs/day21/full.txt');
    let fullFile = await res.text();
    return {
      example: this.parseInput(introFile),
      full: this.parseInput(fullFile),
    };
  }
}
