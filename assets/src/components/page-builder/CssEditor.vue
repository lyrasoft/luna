<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useCodeMirror } from '~luna/composables';

const props = withDefaults(
  defineProps<{
    modelValue: string,
    autoFocus?: boolean
  }>(),
  {
    autoFocus: false
  }
);

const emits = defineEmits();
const value = defineModel<string>();

const wrapper = ref<HTMLElement | null>(null);
const editor = ref<HTMLElement | null>(null);
let cm: typeof CodeMirror;
const css = ref('');
const show = ref(false);
const options = ref<any>({});
let firstLoad = false;

onMounted(async () => {
  const { CodeMirror, CodeMirrorOptions } = await useCodeMirror();

  options.value = CodeMirrorOptions;

  setTimeout(() => {
    // show.value = true;
    cm = CodeMirror(editor.value, options.value);
    cm.setValue(css.value);
    cm.on('change', (cm: any, co: any) => {
      css.value = cm.getValue();
    });
    if (props.autoFocus) {
      setTimeout(() => cm.focus(), 500);
    }
  }, 300);
});

watch(value, (v) => {
  css.value = v || '';
  if (cm && cm.getValue() !== v) {
    cm.setValue(v || '');
  }
}, { immediate: true });

watch(css, (v) => {
  emits('update:modelValue', v);
});
</script>

<template>
  <div ref="wrapper">
    <div ref="editor"></div>
    <!--<codemirror v-if="show"-->
    <!--  v-model:value="css"-->
    <!--  :options="options"-->
    <!--  :height="450"-->
    <!--  ref="editor"-->
    <!--&gt;</codemirror>-->
  </div>
</template>

<style scoped>

</style>
