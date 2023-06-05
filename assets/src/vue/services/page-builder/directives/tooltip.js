/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2022 __ORGANIZATION__.
 * @license    __LICENSE__
 */

export default class BsTooltip {
  static install(app) {
    app.directive('tooltip', {
      mounted(el, { value }) {
        const inc = u.$ui.bootstrap.tooltip(el, value || {});
      },
      updated(el, { value }) {
        const inc = u.$ui.bootstrap.tooltip(el, value || {});

        inc.update();
      },
      beforeUnmount(el) {
        const inc = u.$ui.bootstrap.tooltip(el);

        inc.dispose();
      }
    });
  }
}
