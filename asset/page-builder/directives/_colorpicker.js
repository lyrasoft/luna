/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(() => {
  Vue.directive('color', {
    inserted(el) {
      $(el).minicolors({
        control:'hue',
        position: 'left',
        opacity: true,
        format: 'rgb',
        theme: 'bootstrap',
        change: (value) => {
          const event = new Event('change', {bubbles: true});
          el.dispatchEvent(event);
        }
      });
    },
    update(el) {
      $(el).trigger('keyup');
    }
  });
});
