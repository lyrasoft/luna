/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2020 .
 * @license    __LICENSE__
 */

Vue.filter('lang', (value, ...args) => {
  return Phoenix.__(value, ...args);
});

Vue.filter('addonProp', (prop, type) => {
  return Phoenix.data('addons')[type][prop];
});
