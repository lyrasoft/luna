/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2020 .
 * @license    __LICENSE__
 */

import app from '../../app/page-builder-app';

$(() => {
  const PageBuilder = new Vue({
    el: 'page-builder-app',
    components: { app }
  });
});
