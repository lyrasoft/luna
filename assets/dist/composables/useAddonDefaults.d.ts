import { ModelRef } from 'vue';
export declare function useAddonDefaults<T>(value: ModelRef<T>, defaultOptions: Record<string, any>): ModelRef<T>;
export type AddonProps = {
    addonId: string;
};
