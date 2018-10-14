/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(() => {
  Vue.component('addon-emptyspace', {
    template: '#addon-tmpl-emptyspace',
    mixins: [LunaAddonMixin],
    data() {
      return {
        options: {
          height: {
            lg: '',
            md: '',
            xs: ''
          }
        }
      }
    }
  });
});
