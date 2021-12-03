import Route from '@ember/routing/route';

// BEGIN-SNIPPET day3-import
export default class Puzzels3Route extends Route {
  async model() {
    let resIntro = await fetch('/inputs/day3/full.txt');
    let introFile = await resIntro.text();
    let introLines = introFile.split('\n').map((n) => n.split(''));
    let res = await fetch('/inputs/day3/full.txt');
    let file = await res.text();
    let lines = file.split('\n').map((n) => n.split(''));
    return { intro: introLines, lines: lines };
  }
}
// END-SNIPPET
