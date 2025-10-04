/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

import { defaultsDeep } from 'lodash-es';
import { onMounted, reactive, watch } from 'vue';

export default function lunaAddonMixin(props, { emit }, state) {
  state.options = state.options || {};
  state.options = defaultsDeep(props.modelValue || {}, state.options);
  state = reactive(state);

  onMounted(() => {
    // Fix slider bug
    // setTimeout(() => {
    //   this.prepared = true;
    // }, 150);
  });

  watch(() => state.options, (v) => {
    emit('update:modelValue', v);
  }, { deep: true });

  return state;
};

lunaAddonMixin.props = {
  modelValue: Object,
  addonId: String
};


window.lunaAddonMixin = lunaAddonMixin;
