import Route from '@ember/routing/route';

export default class Puzzels5Route extends Route {
  parseInput(file) {
    let parsed = [];
    parsed = file.replaceAll(' -> ', ' ').replaceAll(',', ' ');
    let lines = parsed.split('\n').map((e) => e.split(' '));
    lines.splice(-1); // remove last empty new line
    console.log(lines);
    return lines;
  }

  async model() {
    let resIntro = await fetch('/inputs/day5/intro.txt');
    let introFile = await resIntro.text();
    let res = await fetch('/inputs/day5/full.txt');
    let fullFile = await res.text();
    return {intro: this.parseInput(introFile), full: this.parseInput(fullFile) };
  }
}
