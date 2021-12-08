import Route from '@ember/routing/route';

export default class Puzzels1Route extends Route {
  parseInput(file) {
    return file.split('\n').map((n) => parseInt(n));
  }

  async model() {
    let resIntro = await fetch('/inputs/day1/intro.txt');
    let introFile = await resIntro.text();
    let res = await fetch('/inputs/day1/full.txt');
    let fullFile = await res.text();
    return {
      example: this.parseInput(introFile),
      full: this.parseInput(fullFile),
    };
  }
}
