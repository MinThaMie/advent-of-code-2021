import Route from '@ember/routing/route';

export default class Puzzles10Route extends Route {
  parseInput(file) {
    return file.split('\n');
  }

  async model() {
    let resIntro = await fetch('/inputs/day10/intro.txt');
    let introFile = await resIntro.text();
    let res = await fetch('/inputs/day10/full.txt');
    let fullFile = await res.text();
    return {
      example: this.parseInput(introFile),
      full: this.parseInput(fullFile),
    };
  }
}
