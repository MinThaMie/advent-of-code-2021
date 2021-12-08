import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DayComponent extends Component {
  @tracked input = true;

  @action
  toggle(val) {
    this.input = val;
  }
}
