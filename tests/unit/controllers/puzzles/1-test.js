import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | puzzles/1', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:puzzles/1');
    assert.ok(controller);
  });
});