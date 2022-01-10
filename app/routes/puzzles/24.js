import Route from '@ember/routing/route';

export default class Puzzles24Route extends Route {
  parseInput(file) {
    return file.split('\n').map((e) => e.split(' '));
  }

  async model() {
    let resIntro = await fetch('/inputs/day24/intro.txt');
    let introFile = await resIntro.text();
    let res = await fetch('/inputs/day24/full.txt');
    let fullFile = await res.text();
    return {
      example: this.parseInput(introFile),
      full: this.parseInput(fullFile),
    };
  }
}
