import { data, domready, isDebug, useCssImport, useImport, useUnicorn } from '@windwalker-io/unicorn-next';
import { createApp, defineAsyncComponent } from 'vue';

// Todo: Use new slide component
// @ts-ignore
import VueSlideBar from 'vue-slide-bar';
import PageBuilderApp from './app/PageBuilderApp.vue';

// import '@/services/page-builder/addon-mixin.js';

// import Tinymce from './directives/tinymce';
// import BsTooltip from './directives/tooltip';

useCssImport('@vue-animate');

const u = useUnicorn();

import('sweetalert');

const app = createApp(PageBuilderApp, {
  name: 'PageBuilder',
});

app.config.globalProperties.$debug = isDebug();
app.config.globalProperties.$trigger = useUnicorn().trigger;
app.config.globalProperties.addonProp = (prop: string, type: string) => {
  return data('addons')[type][prop];
};

// We pre-register libraries from browser because page may have some other widgets re-use them
// We shouldn't bundle it.
// app.component('draggable', vuedraggable);

// Register this components because they may put nested.
// app.component('Row', Row);
// app.component('Column', Column);

app.component('VueSlideBar', VueSlideBar);

// Register these components because they are addons, not core.
app.component('addon-text', defineAsyncComponent(() => import('./components/page-builder/addons/addon-text.vue')));
app.component('addon-image', defineAsyncComponent(() => import('./components/page-builder/addons/addon-image.vue')));
app.component('addon-feature', defineAsyncComponent(() => import('./components/page-builder/addons/addon-feature.vue')));
app.component('addon-emptyspace', defineAsyncComponent(() => import('./components/page-builder/addons/addon-emptyspace.vue')));
app.component('addon-button', defineAsyncComponent(() => import('./components/page-builder/addons/addon-button.vue')));

const addons = data('addons') || [];

for (const k in addons.value) {
  const addon = addons.value[k];

  if (addon.componentModuleUrl) {
    useImport(addon.componentModuleUrl).then((module) => {
      app.component(addon.componentName, module.default(app));
    });
  }
}

app.provide('addons', addons);

u.trigger('page-builder.app.prepared', app);

app.provide('app', app);

domready(() => {
  app.mount('page-builder-app');
});
