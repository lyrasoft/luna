import { Tooltip } from 'bootstrap';
import type { App } from 'vue';

export default class BsTooltip {
  static install(app: App) {
    app.directive<HTMLElement>('tooltip', {
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
