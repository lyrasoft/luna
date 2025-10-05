import { data, domready, isDebug, useCssImport, useImport, useUnicorn } from '@windwalker-io/unicorn-next';
import { createApp, defineAsyncComponent } from 'vue';
import { AddonDefine, Dictionary } from '~luna/types';
import PageBuilderApp from '../app/PageBuilderApp.vue';
import '../mixin/addon-mixin';

import Tinymce from '../directives/tinymce';
import BsTooltip from '../directives/tooltip';

useCssImport('@vue-animate');

const u = useUnicorn();

const addons: Dictionary<AddonDefine> = data('addons') || [];

const app = createApp(PageBuilderApp, {
  name: 'PageBuilder',
});

app.config.globalProperties.$debug = isDebug();
app.config.globalProperties.$trigger = u.trigger.bind(u);
app.config.globalProperties.addonProp = (prop: keyof AddonDefine, type: string) => {
  return addons[type][prop];
};

app.directive('tinymce', Tinymce);
app.use(BsTooltip);

// Register these components because they are addons, not core.
app.component('addon-text', defineAsyncComponent(() => import('../components/page-builder/addons/addon-text.vue')));
app.component('addon-image', defineAsyncComponent(() => import('../components/page-builder/addons/addon-image.vue')));
app.component('addon-feature', defineAsyncComponent(() => import('../components/page-builder/addons/addon-feature.vue')));
app.component('addon-emptyspace', defineAsyncComponent(() => import('../components/page-builder/addons/addon-emptyspace.vue')));
app.component('addon-button', defineAsyncComponent(() => import('../components/page-builder/addons/addon-button.vue')));

for (const k in addons) {
  const addon = addons[k];

  if (addon.componentModuleUrl) {
    useImport(addon.componentModuleUrl).then((module) => {
      app.component(addon.componentName, module.default(app));
    });
  }
}

app.provide('addons', addons);

u.trigger('page-builder.app.prepared', app);

app.provide('app', app);

await domready();

app.mount('page-builder-app');
