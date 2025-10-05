import { UnicornApp, useMacro, useUnicorn } from '@windwalker-io/unicorn-next';
import { useAccountCheck, useCaptcha, useLangDropdown, useLocaleSwitch } from '~luna/composables';

export * from './composables/useAccountCheck';
export * from './composables/useCaptcha';
export * from './composables/useLangDropdown';
export * from './composables/useLocaleSwitch';
export * from './composables/useSrp';
export * from './composables/usePageBuilder';

export function createLuna() {
  return {
    install(app: UnicornApp) {
      const $luna = {
        useAccountCheck,
        useCaptcha,
        useLangDropdown,
        useLocaleSwitch,
      };

      useMacro('$luna', $luna);
    }
  }
}

export function useLuna() {
  const u = useUnicorn();

  u.use(createLuna());
}

declare module '@windwalker-io/unicorn-next' {
  interface UnicornApp {
    $luna: {
      useAccountCheck: typeof useAccountCheck;
      useCaptcha: typeof useCaptcha;
      useLangDropdown: typeof useLangDropdown;
      useLocaleSwitch: typeof useLocaleSwitch;
    }
  }
}
