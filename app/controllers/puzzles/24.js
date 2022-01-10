import PuzzlesBaseController from './base';

export default class Puzzles24Controller extends PuzzlesBaseController {
  solve1(input) {
    let state = { w: 0, x: 0, y: 0, z: 0 };
    let amountW = 0;
    input.forEach(([instruction, varA, varB]) => {
      switch (instruction) {
        case 'inp':
          amountW += 1;
          console.log(amountW);
          state[varA] = `w${amountW}`;
          if (state['z'] !== 0) {
            state['z'] = state['z']
              .replaceAll('0+', '')
              .replaceAll('+0', '')
              .replaceAll('(0==0)', '1')
              .replaceAll('*1)', '')
              .replaceAll('(25+1)', '26')
              .replaceAll(/(\(w[1-9][1-4]?\))/g, `w${amountW - 1}`);
          }
          console.log(state['z']);
          break;
        case 'add':
          if (!isNaN(varB)) {
            if (typeof state[varA] === 'string') {
              state[varA] = `${state[varA]}${
                varB >= 0 ? `+${varB}` : `${varB}`
              }`
                .replace('0+', '')
                .replace('+0', '');
            } else {
              state[varA] = state[varA] + parseInt(varB);
            }
          } else {
            if (
              typeof state[varA] === 'string' ||
              typeof state[varB] === 'string'
            ) {
              state[varA] = `${state[varA]}+${state[varB]})`;
            } else {
              state[varA] = state[varA] + state[varB];
            }
          }
          break;
        case 'mul':
          if (!isNaN(varB)) {
            if (typeof state[varA] === 'string') {
              if (state[varA] == '0' || varB == 0) {
                state[varA] = 0;
              } else if (state[varA] == '1' || varB == 1) {
                state[varA] = state[varA] == '1' ? state[varB] : state[varB];
              } else {
                state[varA] = `(${state[varA]}*${varB})`;
              }
            } else {
              state[varA] = state[varA] * parseInt(varB);
            }
          } else {
            if (
              typeof state[varA] === 'string' ||
              typeof state[varB] === 'string'
            ) {
              if (state[varA] == '0' || state[varB] == '0') {
                state[varA] = 0;
              } else if (state[varA] == '1' || state[varB] == '1') {
                state[varA] = state[varA] == '1' ? state[varB] : state[varB];
              } else {
                state[varA] = `(${state[varA]}*${state[varB]})`;
              }
            } else {
              state[varA] = state[varA] * state[varB];
            }
          }
          break;
        case 'div':
          if (!isNaN(varB)) {
            if (typeof state[varA] === 'string') {
              if (varB == 1) {
                state[varA] = state[varA];
              } else {
                state[varA] = `(${state[varA]}/${varB})`;
              }
            } else {
              state[varA] = Math.floor(state[varA] / parseInt(varB));
            }
          } else {
            if (
              typeof state[varA] === 'string' ||
              typeof state[varB] === 'string'
            ) {
              if (varB == '1') {
                state[varA] = state[varA];
              } else {
                state[varA] = `(${state[varA]}/${state[varB]})`;
              }
            } else {
              state[varA] = Math.floor(state[varA] / state[varB]);
            }
          }
          break;
        case 'mod':
          if (!isNaN(varB)) {
            if (typeof state[varA] === 'string') {
              state[varA] = `(${state[varA]}%${varB})`;
            } else {
              state[varA] = state[varA] % varB;
            }
          } else {
            if (
              typeof state[varA] === 'string' ||
              typeof state[varB] === 'string'
            ) {
              state[varA] = `(${state[varA]}%${state[varB]})`;
            } else {
              state[varA] = state[varA] % state[varB];
            }
          }
          break;
        case 'eql':
          if (!isNaN(varB)) {
            if (typeof state[varA] === 'string') {
              let string = `(${state[varA]}==${varB})`;
              if (state[varA].match(/[1-9][0-9]==w/)) {
                state[varA] = 0 == varB ? 1 : 0;
              } else {
                state[varA] = string;
              }
            } else {
              state[varA] = state[varA] == varB ? 1 : 0;
            }
          } else {
            if (
              typeof state[varA] === 'string' ||
              typeof state[varB] === 'string'
            ) {
              let string = `(${state[varA]}==${varB})`;
              if (string.match(/[1-9][0-9]==w/)) {
                string = '0';
              }
              state[varA] = string;
            } else {
              state[varA] = state[varA] == state[varB] ? 1 : 0;
            }
          }
          break;
      }
    });
    console.log(
      state['z']
        .replaceAll('0+', '')
        .replaceAll('+0', '')
        .replaceAll('(0==0)', '1')
        .replaceAll('*1)', '')
        .replaceAll('(25+1)', '26')
    );
    return 1;
  }

  solve2(input) {
    return 2;
  }
}
