import '@windwalker-io/unicorn/src/types';
import { UnicornApp } from '@windwalker-io/unicorn-next';
import AlpineGlobal from 'alpinejs';
import SRP from '@windwalker-io/srp';
import { AddonDefine } from '~luna/types/page-builder';

declare global {
  var grecaptcha: any;
  var Alpine = AlpineGlobal;
  var SRPClient = SRP.SRPClient;
}

declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.scss?inline' {
  export default string;
}

declare module '*.css' {
  export default string;
}

declare module '*.css?inline' {
  export default string;
}

declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component;
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $trigger: typeof UnicornApp.prototype.trigger;
    $debug: boolean;
    addonProp: (prop: keyof AddonDefine, type: string) => any;
  }
}
