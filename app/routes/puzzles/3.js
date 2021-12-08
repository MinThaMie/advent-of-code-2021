import Route from '@ember/routing/route';

// BEGIN-SNIPPET day3-import
export default class Puzzels3Route extends Route {
  parseInput(file) {
    return file.split('\n').map((n) => n.split(''));
  }

  async model() {
    let resIntro = await fetch('/inputs/day3/intro.txt');
    let introFile = await resIntro.text();
    let res = await fetch('/inputs/day3/full.txt');
    let fullFile = await res.text();
    return {
      example: this.parseInput(introFile),
      full: this.parseInput(fullFile),
    };
  }
}
// END-SNIPPET
