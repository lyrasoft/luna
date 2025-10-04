import { Tooltip } from 'bootstrap';

export default class BsTooltip {
  static install(app) {
    app.directive('tooltip', {
      mounted(el, { value }) {
        const inc = Tooltip.getOrCreateInstance(el, value || {});
      },
      updated(el, { value }) {
        const inc = Tooltip.getOrCreateInstance(el, value || {});

        inc.update();
      },
      beforeUnmount(el) {
        const inc = Tooltip.getOrCreateInstance(el);

        inc.dispose();
      }
    });
  }
}
