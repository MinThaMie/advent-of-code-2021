import Route from '@ember/routing/route';

export default class Puzzles22Route extends Route {
  parseInput(file) {
    let instructions = file.split('\n').map((instr) => {
      let splitted = instr.split(' ');
      let instruction = splitted[0];
      let ranges = splitted[1].split(',');
      let [x_range, y_range, z_range] = ranges.map((r) => {
        return r
          .substring(2)
          .split('..')
          .map((n) => parseInt(n));
      });
      return [instruction, x_range, y_range, z_range];
    });
    return instructions;
  }

  async model() {
    let resIntro = await fetch('/inputs/day22/intro.txt');
    let introFile = await resIntro.text();
    let res = await fetch('/inputs/day22/full.txt');
    let fullFile = await res.text();
    return {
      example: this.parseInput(introFile),
      full: this.parseInput(fullFile),
    };
  }
}
