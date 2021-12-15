import EmberRouter from '@ember/routing/router';
import config from 'advent-of-code-2021/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('puzzles', function () {
    this.route('1');
    this.route('2');
    this.route('3');
    this.route('4');
    this.route('5');
    this.route('6');
    this.route('7');
    this.route('8');
    this.route('9');
    this.route('10');
    this.route('11');
    this.route('12');
    this.route('13');
    this.route('14');
    this.route('15');
  });
  this.route('helpers');
});
