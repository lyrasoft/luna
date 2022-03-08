<template>
  <div ref="wrapper">
    <codemirror v-if="show"
      v-model:value="css"
      :options="options"
      :height="450"
      ref="editor"
    ></codemirror>
  </div>
</template>

<script>
import { onMounted, reactive, ref, watch } from 'vue';
import { CodeMirrorOptions } from '../../services/page-builder/codemirror';

export default {
  name: 'CssEditor',
  props: {
    modelValue: String
  },
  setup(props, { emit }) {
    const wrapper = ref(null);
    const editor = ref(null);
    const css = ref('');
    const show = ref(false);
    const options = reactive(CodeMirrorOptions);
    let firstLoad = false;

    onMounted(() => {
      setTimeout(() => {
        show.value = true;

        wrapper.value.addEventListener('click', () => {
          // @see https://github.com/Ionaru/easy-markdown-editor/issues/208
          if (!firstLoad) {
            editor.value.cminstance.refresh();
            firstLoad = true;
          }
        });
      }, 300);
    });

    watch(() => props.modelValue, (v) => {
      css.value = v;
    }, { immediate: true });

    watch(css, (v) => {
      emit('update:modelValue', v);
    });

    return {
      css,
      show,
      options,
      editor,
      wrapper,
    }
  }
};
</script>

<style scoped>

</style>
