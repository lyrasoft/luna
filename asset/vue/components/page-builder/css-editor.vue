<template>
  <div>
    <codemirror v-if="show" v-model="css" :options="options"></codemirror>
  </div>
</template>

<script>
import { CodeMirrorOptions } from '../../services/page-builder/codemirror';

export default {
  name: 'css-editor',
  data() {
    return {
      css: '',
      show: false,
      options: CodeMirrorOptions
    }
  },
  props: {
    value: null,
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 100);
  },
  methods: {
  },
  watch: {
    value: {
      handler(v) {
        this.css = v;
      },
      immediate: true
    },

    css(v) {
      this.$emit('change', v);
      this.$emit('input', v);
    }
  }
};
</script>

<style scoped>

</style>
