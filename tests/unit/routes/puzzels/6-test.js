import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | puzzels/6', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:puzzels/6');
    assert.ok(route);
  });
});
