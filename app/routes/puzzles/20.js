import Route from '@ember/routing/route';

export default class Puzzles20Route extends Route {
  parseInput(file) {
    let [algorithm, input] = file.split('\n\n');
    input = input.split('\n');
    return [algorithm, input];
  }

  async model() {
    let resIntro = await fetch('/inputs/day20/intro.txt');
    let introFile = await resIntro.text();
    let res = await fetch('/inputs/day20/full.txt');
    let fullFile = await res.text();
    return {
      example: this.parseInput(introFile),
      full: this.parseInput(fullFile),
    };
  }
}
