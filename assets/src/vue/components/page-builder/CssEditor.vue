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

<script>
import { onMounted, reactive, ref, watch } from 'vue';

export default {
  name: 'CssEditor',
  props: {
    modelValue: String
  },
  setup(props, { emit }) {
    const wrapper = ref(null);
    const editor = ref(null);
    let cm = null;
    const css = ref('');
    const show = ref(false);
    const options = ref({});
    let firstLoad = false;

    onMounted(async () => {
      const { default: CodeMirror, CodeMirrorOptions } = await import('../../services/page-builder/codemirror.js');
      options.value = CodeMirrorOptions;

      setTimeout(() => {
        // show.value = true;

        cm = CodeMirror(editor.value, options.value);
        cm.setValue(css.value);
        cm.on('change', (cm, co) => {
          css.value = cm.getValue();
        });

        setTimeout(() => {
          cm.focus();
        }, 500);
      }, 300);
    });

    watch(() => props.modelValue, (v) => {
      css.value = v;

      if (cm && cm.getValue() !== v) {
        console.log(v);
        cm.setValue(v);
      }
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
