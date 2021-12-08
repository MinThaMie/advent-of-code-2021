import Route from '@ember/routing/route';

export default class Puzzels4Route extends Route {
  parseInput(file) {
    let lines = file.split('\n\n');
    let numbers = lines.splice(0, 1);
    numbers = numbers[0].split(',').map((cell) => parseInt(cell));
    let cards = lines.map((card) =>
      card
        .split('\n')
        .map((rows) => {
          if (rows) {
            rows = rows.trim().split(/\ +/);
            rows = rows.map((cell) => parseInt(cell));
            return rows;
          }
        })
        .flat()
    );
    return { numbers, cards };
  }
  async model() {
    let resIntro = await fetch('/inputs/day4/intro.txt');
    let introFile = await resIntro.text();
    let res = await fetch('/inputs/day4/full.txt');
    let fullFile = await res.text();
    return {
      example: this.parseInput(introFile),
      full: this.parseInput(fullFile),
    };
  }
}
