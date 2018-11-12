/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(() => {
  Vue.filter('addonProp', (prop, type) => {
    return Phoenix.data('addons')[type][prop];
  });
});
