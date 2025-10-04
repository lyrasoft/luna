import { defaultsDeep } from 'lodash-es';
import { defineModel } from 'vue';
import { AddonOptions } from '~luna/types';

export function useAddonModel<T extends Record<string, any>>(defaultOptions: T) {
  const value = defineModel<AddonOptions & T>({
    required: true,
  });

  value.value = defaultsDeep(value.value, defaultOptions);

  return value;
}

export type AddonProps = {
  addonId: string;
}
