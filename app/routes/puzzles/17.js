import Route from '@ember/routing/route';

export default class Puzzles17Route extends Route {
  parseInput(file) {
    let [, , x_range, y_range] = file.split(' ');
    return [x_range, y_range];
  }

  async model() {
    let resIntro = await fetch('/inputs/day17/intro.txt');
    let introFile = await resIntro.text();
    let res = await fetch('/inputs/day17/full.txt');
    let fullFile = await res.text();
    return {
      example: this.parseInput(introFile),
      full: this.parseInput(fullFile),
    };
  }
}
