/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

import { createApp, defineAsyncComponent } from 'vue';
import PageBuilderApp from '../app/PageBuilderApp';
import Row from "../components/page-builder/Row";
import Column from "../components/page-builder/Column";

import '@/services/page-builder/addon-mixin.js';
// import AddonText from '@/components/page-builder/addons/addon-text';
// import AddonImage from '@/components/page-builder/addons/addon-image';
// import AddonFeature from '@/components/page-builder/addons/addon-feature';
// import AddonEmptyspace from '@/components/page-builder/addons/addon-emptyspace';
// import AddonButton from '@/components/page-builder/addons/addon-button';

import Tinymce from '@/services/page-builder/directives/tinymce';
import BsTooltip from '@/services/page-builder/directives/tooltip';

import('sweetalert');

S.import('@main')
  .then(() => Promise.all([
    u.import(
      '@sortablejs',
      '@vuedraggable',
    ),
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

    // We pre-register libraries from browser because page may have some other widgets re-use them
    // We shouldn't bundle it.
    app.component('draggable', vuedraggable);

    // Register this components because they may put nested.
    app.component('Row', Row);
    app.component('Column', Column);

    // Register these components because they are addons, not core.
    app.component('addon-text', defineAsyncComponent(() => import('@/components/page-builder/addons/addon-text')));
    app.component('addon-image', defineAsyncComponent(() => import('@/components/page-builder/addons/addon-image')));
    app.component('addon-feature', defineAsyncComponent(() => import('@/components/page-builder/addons/addon-feature')));
    app.component('addon-emptyspace', defineAsyncComponent(() => import('@/components/page-builder/addons/addon-emptyspace')));
    app.component('addon-button', defineAsyncComponent(() => import('@/components/page-builder/addons/addon-button')));

    app.directive('tinymce', Tinymce)

    // app.use(Codemirror);
    app.use(BsTooltip);

    u.trigger('page-builder.app.prepared', app);

    app.provide('app', app);

    u.domready(() => {
      app.mount('page-builder-app');
    });
  });
