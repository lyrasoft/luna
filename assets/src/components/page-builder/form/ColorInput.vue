<script lang="ts" setup>
import Spectrum from 'spectrum-vanilla';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps<{
  id?: string;
  inputClass?: string;
  options?: Record<string, any>;
}>();

const value = defineModel<string>();
const input = ref<HTMLInputElement>();
let sp: Spectrum;

onMounted(() => {
  sp = Spectrum.getInstance(input.value!, props.options || {});
});

onBeforeUnmount(() => {
  sp?.destroy();
});
</script>

<template>
    <input ref="input" type="text"
        :id="id"
        class="form-control flex-grow-1"
        :class="inputClass"
        v-model.lazy="value"
    />
</template>

<style>
  @import "spectrum-vanilla/dist/spectrum.min.css";

  .sp-add-on {
    width: 40px !important;
  }
</style>
