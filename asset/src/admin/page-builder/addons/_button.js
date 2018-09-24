/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(() => {
  Vue.component('addon-button', {
    template: '#addon-tmpl-button',
    mixins: [LunaAddonMixin],
    data() {
      return {
        options: {
          text: '',
          link: '',
          link_target: '',
          style: 'btn-primary',
          border_radius: '',
          size: '',
          block: false,
          icon: '',
          icon_position: 'left'
        }
      }
    }
  });
});
