import Component from '@glimmer/component';

export default class Day4Component extends Component {
  // cards are 5 x 5 so rows are index 0 - 4 5- 9 etc
  // cols are  [0,5,10,15,20], [1,6..] etc

  checkRows(card) {
    for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
      let rowToCheck = card.slice(rowIndex * 5, rowIndex * 5 + 5);
      let sum = rowToCheck.reduce((a, b) => a + b, 0);
      if (sum == 5) {
        return true;
      }
    }
  }

  checkColumns(card) {
    for (let colIndex = 0; colIndex < 5; colIndex++) {
      let colToCheck = [
        card[colIndex],
        card[colIndex + 5],
        card[colIndex + 10],
        card[colIndex + 15],
        card[colIndex + 20],
      ];
      let sum = colToCheck.reduce((a, b) => a + b, 0);
      if (sum == 5) {
        return true;
      }
    }
  }

  get solution1() {
    let { numbers, cards } = this.args.file.lines;
    let state = Array(cards.length)
      .fill()
      .map(() => Array(25).fill(0));
    let bingo = false;
    let result = '';
    for (const n of numbers) {
      for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        if (card.includes(n)) {
          state[i].splice(card.indexOf(n), 1, 1);
          if (this.checkColumns(state[i]) || this.checkRows(state[i])) {
            bingo = true;
            let value = state[i]
              .reduce((a, e, i) => {
                if (e === 0) a.push(i);
                return a;
              }, [])
              .reduce((a, index) => {
                a.push(parseInt(card[index]));
                return a;
              }, [])
              .reduce((a, b) => a + b, 0);
            result = `${value * n}`;
          }
        }
        if (bingo) break;
      }
      if (bingo) break;
    }
    return result;
  }
  get solution2() {
    let { numbers, cards } = this.args.file.lines;
    let state = Array(cards.length)
      .fill()
      .map(() => Array(25).fill(0));
    let winner;
    let bingo = false;
    let whoHasBingo = [];
    let result = '';
    for (const n of numbers) {
      for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        if (card.includes(n)) {
          state[i].splice(card.indexOf(n), 1, 1);
          if (this.checkColumns(state[i]) || this.checkRows(state[i])) {
            bingo = true;
            whoHasBingo.push(i);
          }
        }
      }
      if (bingo) {
        if (cards.length == 1) {
          winner = cards[0];
          let value = state[0]
            .reduce((a, e, i) => {
              if (e === 0) a.push(i);
              return a;
            }, [])
            .reduce((a, index) => {
              a.push(parseInt(winner[index]));
              return a;
            }, [])
            .reduce((a, b) => a + b, 0);
          result = `${value * n}`;
          break;
        } else {
          let filterd = cards.filter(
            (_, index) => !whoHasBingo.includes(index)
          );
          let filterdState = state.filter(
            (_, index) => !whoHasBingo.includes(index)
          );
          cards = [...filterd];
          state = [...filterdState];
          whoHasBingo = [];
          bingo = false;
        }
      }
    }
    return result;
  }
}
