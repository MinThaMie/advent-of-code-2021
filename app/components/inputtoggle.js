import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class InputtoggleComponent extends Component {
  @tracked input = true;

  @action
  toggle() {
    this.input = !this.input;
    this.args.toggle?.(this.input);
  }
}
