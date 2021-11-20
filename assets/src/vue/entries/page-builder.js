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

    app.config.globalProperties.$debug= u.isDebug();
    app.config.globalProperties.$trigger= u.trigger;
    app.config.globalProperties.addonProp = (prop, type) => {
      return u.data('addons')[type][prop];
    };

    app.component('Row', Row);

    app.use(Codemirror);
    app.use(VueClickAway);

    app.mount('page-builder-app');
  });
