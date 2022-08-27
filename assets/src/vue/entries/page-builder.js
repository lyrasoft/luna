/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

// import '@coreui/coreui/dist/css/coreui.min.css';
import { createApp } from 'vue';
import PageBuilderApp from '../app/PageBuilderApp';
import VueClickAway from "vue3-click-away";
import Row from "../components/page-builder/Row";
import Column from "../components/page-builder/Column";

import '@/services/page-builder/addon-mixin.js';
import AddonText from '@/components/page-builder/addons/addon-text';
import AddonImage from '@/components/page-builder/addons/addon-image';
import AddonFeature from '@/components/page-builder/addons/addon-feature';
import AddonEmptyspace from '@/components/page-builder/addons/addon-emptyspace';
import AddonButton from '@/components/page-builder/addons/addon-button';

import Tinymce from '@/services/page-builder/directives/tinymce';

// CodeMirror
import Codemirror from 'codemirror-editor-vue3';
import "codemirror-editor-vue3/dist/style.css";

S.import('@main')
  .then(() => Promise.all([
    u.import('@sortablejs'),
    u.importCSS('@vue2-animate'),
  ]))
  .then(() => {
    const app = createApp(PageBuilderApp, {
      name: 'page-builder',
    });

    app.config.globalProperties.$debug = u.isDebug();
    app.config.globalProperties.$trigger = (...args) => u.trigger(...args);
    app.config.globalProperties.addonProp = (prop, type) => {
      return u.data('addons')[type][prop];
    };

    app.component('Row', Row);
    app.component('Column', Column);
    app.component('addon-text', AddonText);
    app.component('addon-image', AddonImage);
    app.component('addon-feature', AddonFeature);
    app.component('addon-emptyspace', AddonEmptyspace);
    app.component('addon-button', AddonButton);

    app.directive('tinymce', Tinymce)

    app.use(Codemirror);
    app.use(VueClickAway);

    u.trigger('page-builder.app.prepared', app);

    app.provide('app', app);

    u.domready(() => {
      app.mount('page-builder-app');
    });
  });
