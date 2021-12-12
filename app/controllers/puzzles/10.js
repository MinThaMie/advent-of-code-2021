import PuzzleBaseController from './base';

export default class Puzzles10Controller extends PuzzleBaseController {
  open = '{[(<';
  close = '}])>';

  // BEGIN-SNIPPET day10-solution1
  solve1(input) {
    let values = {
      ')': 3,
      ']': 57,
      '}': 1197,
      '>': 25137,
    };
    let wrong = [];
    input.forEach((line) => {
      let splitLine = line.split('');
      let opened = [];
      for (let v of splitLine) {
        let shouldBreak = false;
        if (this.open.includes(v)) {
          opened.push(v);
        } else {
          let last = opened.pop();
          switch (v) {
            case '}':
              if (last != '{') {
                wrong.push(v);
                shouldBreak = true;
              }
              break;
            case ']':
              if (last != '[') {
                wrong.push(v);
                shouldBreak = true;
              }
              break;
            case ')':
              if (last != '(') {
                wrong.push(v);
                shouldBreak = true;
              }
              break;
            case '>':
              if (last != '<') {
                wrong.push(v);
                shouldBreak = true;
              }
              break;
          }
          if (shouldBreak) {
            break;
          }
        }
      }
    });
    return wrong.reduce((prev, cur) => prev + values[cur], 0);
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day10-solution2
  solve2(input) {
    let incompletes = input.filter((line) => {
      let splitLine = line.split('');
      let opened = [];
      let corrupted = false;
      for (let v of splitLine) {
        let shouldBreak = false;
        if (this.open.includes(v)) {
          opened.push(v);
        } else {
          let last = opened.pop();
          switch (v) {
            case '}':
              if (last != '{') {
                shouldBreak = true;
              }
              break;
            case ']':
              if (last != '[') {
                shouldBreak = true;
              }
              break;
            case ')':
              if (last != '(') {
                shouldBreak = true;
              }
              break;
            case '>':
              if (last != '<') {
                shouldBreak = true;
              }
              break;
          }
          if (shouldBreak) {
            corrupted = true;
            break;
          }
        }
      }
      if (corrupted) {
        return;
      } else {
        return line;
      }
    });
    let scores = [];
    incompletes.forEach((line) => scores.push(this.scoreLine(line)));
    scores = scores.sort((a, b) => a - b);
    return scores[Math.floor(scores.length / 2)];
  }

  scoreLine(line) {
    let values = {
      ')': 1,
      ']': 2,
      '}': 3,
      '>': 4,
    };
    let splitLine = line.split('');
    let opened = [];
    splitLine.forEach((v) => {
      if (this.open.includes(v)) {
        opened.push(v);
      } else {
        let last = opened.pop();
        switch (v) {
          case '}':
            if (last == '{') {
              return;
            }
            break;
          case ']':
            if (last == '[') {
              return;
            }
            break;
          case ')':
            if (last == '(') {
              return;
            }
            break;
          case '>':
            if (last == '<') {
              return;
            }
            break;
        }
      }
    });
    let closed = opened.reverse().map((v) => {
      switch (v) {
        case '{':
          return '}';
        case '[':
          return ']';
        case '(':
          return ')';
        case '<':
          return '>';
      }
    });
    return closed.reduce((prev, cur) => prev * 5 + values[cur], 0);
  }
  // END-SNIPPET
}
