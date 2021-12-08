import Route from '@ember/routing/route';

export default class Puzzels5Route extends Route {
  parseInput(file) {
    let parsed = [];
    parsed = file.split('\n').map((line) => line.split(' | '));
    return parsed;
  }

  async model() {
    let resIntro = await fetch('/inputs/day8/intro.txt');
    let introFile = await resIntro.text();
    let res = await fetch('/inputs/day8/full.txt');
    let fullFile = await res.text();
    return {
      intro: this.parseInput(introFile),
      full: this.parseInput(fullFile),
    };
  }
}
