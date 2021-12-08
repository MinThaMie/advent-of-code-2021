import Route from '@ember/routing/route';

export default class Puzzels4Route extends Route {
  async model() {
    let resIntro = await fetch('/inputs/day4/intro.txt');
    let introFile = await resIntro.text();
    let introLines = introFile.split('\n\n');
    let numbers = introLines.splice(0, 1);
    numbers = numbers[0].split(',').map((cell) => parseInt(cell));
    let cards = introLines.map((card) =>
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
    let res = await fetch('/inputs/day4/full.txt');
    let file = await res.text();
    let lines = file.split('\n\n');
    let fullNumbers = lines.splice(0, 1);
    fullNumbers = fullNumbers[0].split(',').map((cell) => parseInt(cell));
    let fullCards = lines.map((card) =>
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
    return {
      intro: { numbers, cards },
      lines: { numbers: fullNumbers, cards: fullCards },
    };
  }
}
