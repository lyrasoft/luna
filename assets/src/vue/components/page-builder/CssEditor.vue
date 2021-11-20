<template>
  <div>
    <codemirror v-if="show"
      v-model:value="css"
      :options="options"
      :height="450"
    ></codemirror>
  </div>
</template>

<script>
import { onMounted, reactive, ref, watch } from 'vue';
import { CodeMirrorOptions } from '../../services/page-builder/codemirror';

export default {
  name: 'CssEditor',
  props: {
    value: String
  },
  setup(props, { emit }) {
    const css = ref('');
    const show = ref(false);
    const options = reactive(CodeMirrorOptions);

    onMounted(() => {
      setTimeout(() => {
        show.value = true;
      }, 100);
    });

    watch(() => props.value, (v) => {
      css.value = v;
    }, { immediate: true });

    watch(css, (v) => {
      emit('update:value', v);
    });

    return {
      css,
      show,
      options
    }
  }
};
</script>

<style scoped>

</style>
