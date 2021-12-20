import Route from '@ember/routing/route';

export default class Puzzles18Route extends Route {
  parseInput(file) {
    let rows = file.split('\n');
    return rows;
  }

  async model() {
    let resIntro = await fetch('/inputs/day18/intro.txt');
    let introFile = await resIntro.text();
    let res = await fetch('/inputs/day18/full.txt');
    let fullFile = await res.text();
    return {
      example: this.parseInput(introFile),
      full: this.parseInput(fullFile),
    };
  }
}
