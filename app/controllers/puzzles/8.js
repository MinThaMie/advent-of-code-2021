import Controller from '@ember/controller';

export default class Puzzles8Controller extends Controller {
  // BEGIN-SNIPPET day8-solution1
  get solution1() {
    let counter = 0;
    this.model.full.forEach(([, outp]) => {
      let segments = outp.split(' ');
      counter += segments.filter((s) => s.length <= 4 || s.length == 7).length;
    });
    return counter;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day8-solution2
  get solution2() {
    let total = 0;
    this.model.full.forEach(([inp, outp]) => {
      let numToSeg = {};
      let segToNum = {};
      let outSegments = outp.split(' ');
      let inSegments = inp.split(' ');
      let numbers = inSegments.filter((s) => s.length <= 4 || s.length == 7);
      numbers.forEach((number) => {
        switch (number.length) {
          case 2:
            segToNum[number] = 1;
            numToSeg[1] = number;
            break;
          case 3:
            segToNum[number] = 7;
            numToSeg[7] = number;
            break;
          case 4:
            segToNum[number] = 4;
            numToSeg[4] = number;
            break;
          case 7:
            segToNum[number] = 8;
            numToSeg[8] = number;
            break;
        }
      });
      let result = [];
      let fiveIdentifier = this.filterNumber(numToSeg[4], numToSeg[1]);
      inSegments.forEach((seg) => {
        if (segToNum[seg]) {
          // console.log("known number");
          // result.push(segToNum[seg]);
        } else {
          if (seg.length == 5) {
            if (this.includesNumber(seg, numToSeg[1])) {
              result.push[3];
              segToNum[seg] = 3;
              numToSeg[3] = seg;
            } else if (this.includesNumber(seg, fiveIdentifier)) {
              result.push[5];
              segToNum[seg] = 5;
              numToSeg[5] = seg;
            } else {
              //have to be a two
              result.push[2];
              segToNum[seg] = 2;
              numToSeg[2] = seg;
            }
          } else {
            if (!this.includesNumber(seg, numToSeg[1])) {
              // has to be a 6
              result.push[6];
              segToNum[seg] = 6;
              numToSeg[6] = seg;
            } else if (this.includesNumber(seg, numToSeg[4])) {
              //has to be 9
              result.push[9];
              segToNum[seg] = 9;
              numToSeg[9] = seg;
            } else {
              // has to be 0
              result.push[0];
              segToNum[seg] = 0;
              numToSeg[0] = seg;
            }
          }
        }
      });
      let ordered = {}
      for (const [key, value] of Object.entries(segToNum)) {
        ordered[[...key].sort().join('')] = value;
      }
      outSegments.forEach(seg => result.push(ordered[[...seg].sort().join('')]))
      total += parseInt(result.join(''));
    });
    return total;
  }

  includesNumber(seg, known) {
    return [...known].every(x =>  seg.indexOf(x) > -1);
  }
  filterNumber(seg, f) {
    return [...seg].filter(c => !f.includes(c)).join('')
  }
  // END-SNIPPET
}
