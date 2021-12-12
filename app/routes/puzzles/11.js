import Route from '@ember/routing/route';

export default class Puzzles11Route extends Route {
  parseInput(file) {
    return file.split('\n').map((r) => r.split('').map((n) => parseInt(n)));
  }

  async model() {
    let resIntro = await fetch('/inputs/day11/intro.txt');
    let introFile = await resIntro.text();
    let res = await fetch('/inputs/day11/full.txt');
    let fullFile = await res.text();
    return {
      example: this.parseInput(introFile),
      full: this.parseInput(fullFile),
    };
  }
}
