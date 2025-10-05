import { UnicornApp } from '@windwalker-io/unicorn-next';
import { useAccountCheck, useCaptcha, useLangDropdown, useLocaleSwitch } from './composables';
export * from './composables/useAccountCheck';
export * from './composables/useCaptcha';
export * from './composables/useLangDropdown';
export * from './composables/useLocaleSwitch';
export * from './composables/useSrp';
export * from './composables/usePageBuilder';
export declare function createLuna(): {
    install(app: UnicornApp): void;
};
export declare function useLuna(): void;
declare module '@windwalker-io/unicorn-next' {
    interface UnicornApp {
        $luna: {
            useAccountCheck: typeof useAccountCheck;
            useCaptcha: typeof useCaptcha;
            useLangDropdown: typeof useLangDropdown;
            useLocaleSwitch: typeof useLocaleSwitch;
        };
    }
}
