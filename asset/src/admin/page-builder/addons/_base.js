/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

const LunaAddonMixin = {
  data() {
    return {
      options: {}
    }
  },
  props: {
    value: Object
  },
  created() {
    this.options = Object.assign(this.options, this.value);
  },
  mounted() {

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
