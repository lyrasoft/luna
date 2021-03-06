/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2020 .
 * @license    __LICENSE__
 */

import PageBuilderApp from '../../app/page-builder-app';
import '../../services/page-builder/filters';
import '../../services/page-builder/directives/colorpicker';
import '../../services/page-builder/directives/select2';
import '../../services/page-builder/directives/tinymce';
import AddonButton from '../../components/page-builder/addons/addon-button';
import AddonEmptyspace from '../../components/page-builder/addons/addon-emptyspace';
import AddonFeature from '../../components/page-builder/addons/addon-feature';
import AddonImage from '../../components/page-builder/addons/addon-image';
import AddonText from '../../components/page-builder/addons/addon-text';
import Row from '../../components/page-builder/row';
import VueCodemirror from 'vue-codemirror';

$(() => {
  Vue.prototype.$debug = Phoenix.isDebug();
  Vue.prototype.$trigger = (...args) => {
    return Phoenix.trigger(...args);
  };
  Vue.use(VueCodemirror);
  Vue.component('addon-button', AddonButton);
  Vue.component('addon-emptyspace', AddonEmptyspace);
  Vue.component('addon-feature', AddonFeature);
  Vue.component('addon-image', AddonImage);
  Vue.component('addon-text', AddonText);
  Vue.component('row', Row);

  Phoenix.trigger('page-builder.before-create');

  const PageBuilder = new Vue({
    el: 'page-builder-app',
    components: { PageBuilderApp }
  });
});
