import PuzzlesBaseController from './base';

export default class Puzzles18Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day18-solution1
  solve1(input) {
    let current = input[0];
    for (let i = 0; i < input.length - 1; i++) {
      current = `[${current},${input[i + 1]}]`;
      let keepReducing = true;
      while (keepReducing) {
        let result = this.reduce(current);
        keepReducing = result !== current;
        current = result;
      }
    }
    let array = JSON.parse(current);
    return this.magnitude(array[0], array[1]);
  }

  reduce(string) {
    //If any pair is nested inside four pairs, the leftmost such pair explodes.
    //If any regular number is 10 or greater, the leftmost such regular number splits.
    let canDoAction = true;
    let result;
    if (canDoAction) {
      result = this.explode(string);
      canDoAction = result == string;
    }
    if (canDoAction) {
      result = this.split(string);
    }
    return result;
  }

  explode(string) {
    let openBracket = 0;
    let index = 0;
    let originalIndex = 0;
    let splitted = string.match(/\d+|\D+/g);
    let isPair = false;
    while (!isPair && index < splitted.length) {
      if (splitted[index].includes('[')) {
        openBracket += splitted[index].split('').filter((v) => v == '[').length;
      }
      if (splitted[index].includes(']')) {
        openBracket -= splitted[index].split('').filter((v) => v == ']').length;
      }
      if (openBracket >= 5) {
        isPair = splitted[index + 1] == ','; // find the ,
      }
      originalIndex += splitted[index].length;
      index++;
    }
    if (isPair) {
      let originalPair = `[${splitted[index - 1]},${splitted[index + 1]}]`; // we find the , so the values are -1 and +1
      let x = parseInt(splitted[index - 1]);
      let y = parseInt(splitted[index + 1]); // ignore the ,
      let firstArray = splitted
        .slice(0, index - 1)
        .filter((v) => parseInt(v) >= 0); // just the Numbers parseInt NaN
      let toAddX = parseInt(firstArray[firstArray.length - 1]); // the last one is the closest to the pair
      let secondArray = splitted
        .slice(index + 1 + 1)
        .filter((v) => parseInt(v) >= 0);
      let toAddY = parseInt(secondArray[0]); // the first one is the closest to the pair
      x = toAddX >= 0 ? x + toAddX : 0;
      y = toAddY >= 0 ? y + toAddY : 0;
      let result = '';
      let found = string.indexOf(originalPair, originalIndex - 3);
      result = this.replaceAt(string, found, originalPair.length, 0);
      let yIndex = this.regexIndexOf(result, /\d+/g, found + 1);
      let xIndex = this.regexLastIndexOf(result, /\d+/g, found - 1);
      if (yIndex >= 0) {
        let length = toAddY.toString().length;
        result = this.replaceAt(result, yIndex, length, y);
      }
      if (xIndex >= 0) {
        let length = toAddX.toString().length;
        let first = toAddX.toString().length - 1;
        result = this.replaceAt(result, xIndex - first, length, x);
      }
      return result;
    }
    return string;
  }

  split(string) {
    let splitted = string.match(/\d+|\D+/g);
    let numbers = splitted.filter((v) => parseInt(v) >= 0);
    let firstNumberToSplit;
    for (let i = 0; i < numbers.length; i++) {
      if (parseInt(numbers[i]) > 9) {
        firstNumberToSplit = parseInt(numbers[i]);
        let indexOfNumber = string.indexOf(numbers[i]);
        let x = Math.floor(firstNumberToSplit / 2);
        let y = Math.ceil(firstNumberToSplit / 2);
        return this.replaceAt(
          string,
          indexOfNumber,
          numbers[i].length,
          `[${x},${y}]`
        );
      }
    }
    return string;
  }

  magnitude(x, y) {
    if (isNaN(x)) {
      let [left, right] = x;
      x = this.magnitude(left, right);
    }
    if (isNaN(y)) {
      let [left, right] = y;
      y = this.magnitude(left, right);
    }
    return 3 * x + 2 * y;
  }

  replaceAt(string, index, length, replacement) {
    return (
      string.substring(0, index) +
      replacement +
      string.substring(index + length)
    );
  }
  regexIndexOf(string, regex, startpos) {
    let indexOf = string.substring(startpos || 0).search(regex);
    return indexOf >= 0 ? indexOf + (startpos || 0) : indexOf;
  }
  regexLastIndexOf(string, regex, startpos) {
    regex = regex.global
      ? regex
      : new RegExp(
          regex.source,
          'g' + (regex.ignoreCase ? 'i' : '') + (regex.multiLine ? 'm' : '')
        );
    if (typeof startpos == 'undefined') {
      startpos = string.length;
    } else if (startpos < 0) {
      startpos = 0;
    }
    var stringToWorkWith = string.substring(0, startpos + 1);
    var lastIndexOf = -1;
    var nextStop = 0;
    let result;
    while ((result = regex.exec(stringToWorkWith)) != null) {
      lastIndexOf = result.index;
      regex.lastIndex = ++nextStop;
    }
    return lastIndexOf;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day18-solution2
  solve2(input) {
    let possibles = new Set();
    input.forEach((i) => {
      input.forEach((j) => {
        if (i !== j) {
          let xy = `[${i},${j}]`;
          let yx = `[${j},${i}]`;
          possibles.add(xy).add(yx);
        }
      });
    });
    let maxMagnitude = 0;
    possibles.forEach((sum) => {
      let keepReducing = true;
      while (keepReducing) {
        let result = this.reduce(sum);
        keepReducing = result !== sum;
        sum = result;
      }
      let array = JSON.parse(sum);
      let mag = this.magnitude(array[0], array[1]);
      if (mag > maxMagnitude) {
        maxMagnitude = mag;
      }
    });
    return maxMagnitude;
  }
  // END-SNIPPET
}
