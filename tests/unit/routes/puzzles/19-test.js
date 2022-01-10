import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | puzzles/19', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:puzzles/19');
    assert.ok(route);
  });
});
