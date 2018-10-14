/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

const LunaAddonMixin = {
  data() {
    return {
      options: {},
      prepared: false
    }
  },
  props: {
    value: Object
  },
  created() {
    const options = this.options;

    underscore.each(this.value, (v, k) => {
      Vue.set(options, k, v);
    });

    this.options = options;
  },
  mounted() {
    // Fix slider bug
    setTimeout(() => {
      this.prepared = true;
    }, 150);
  },
  methods: {

  },
  watch: {
    options: {
      handler() {
        this.$emit('change', this.options);
        this.$emit('input', this.options);
      },
      deep: true
    }
  }
};
