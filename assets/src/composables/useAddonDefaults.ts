import { defaultsDeep } from 'lodash-es';
import { ModelRef, Ref } from 'vue';

export function useAddonDefaults<T>(value: ModelRef<T>, defaultOptions: Record<string, any>): ModelRef<T> {
  value.value = defaultsDeep(value.value, defaultOptions);

  return value;
}

export type AddonProps = {
  addonId: string;
}
