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
        value = value || {};
        value.container = 'body';
        const tooltip = new bootstrap.Tooltip(el, value);
      },
      beforeUpdated(el) {
        const tooltip = bootstrap.Tooltip.getInstance(el);

        tooltip.dispose();
        tooltip.enable();
      }
    });
  }
}
