/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(() => {
  Vue.filter('lang', (value, ...args) => {
    return Phoenix.__(value, ...args);
  });
});
