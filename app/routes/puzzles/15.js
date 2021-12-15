import Route from '@ember/routing/route';

export default class Puzzles15Route extends Route {
  parseInput(file) {
    return file.split('\n').map(row => row.split('').map(cell => parseInt(cell)));
  }

  async model() {
    let resIntro = await fetch('/inputs/day15/intro.txt');
    let introFile = await resIntro.text();
    let res = await fetch('/inputs/day15/full.txt');
    let fullFile = await res.text();
    return {
      example: this.parseInput(introFile),
      full: this.parseInput(fullFile),
    };
  }
}
