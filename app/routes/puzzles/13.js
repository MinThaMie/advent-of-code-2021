import Route from '@ember/routing/route';

export default class Puzzles13Route extends Route {
  parseInput(file) {
    let [coordinates, instructions] = file.split('\n\n');
    instructions = instructions.split('\n');
    coordinates = coordinates.split('\n');
    return { coordinates, instructions };
  }

  async model() {
    let resIntro = await fetch('/inputs/day13/intro.txt');
    let introFile = await resIntro.text();
    let res = await fetch('/inputs/day13/full.txt');
    let fullFile = await res.text();
    return {
      example: this.parseInput(introFile),
      full: this.parseInput(fullFile),
    };
  }
}
