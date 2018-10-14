/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(() => {
  Vue.component('addon-image', {
    template: '#addon-tmpl-image',
    mixins: [LunaAddonMixin],
    data() {
      return {
        options: {
          image: '',
          border_radius: '',
          alt: '',
          link: '',
          link_target: ''
        }
      }
    }
  });
});
