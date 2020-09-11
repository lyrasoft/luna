<template>
  <div>
    <codemirror v-if="show" v-model="css" :options="options"></codemirror>
  </div>
</template>

<script>
import 'codemirror/mode/css/css.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

export default {
  name: 'css-editor',
  data() {
    return {
      css: '',
      show: false,
      options: {
        tabSize: 2,
        mode: 'text/css',
        styleActiveLine: true,
        theme: 'monokai',
        lineNumbers: true,
        line: true,
      }
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
