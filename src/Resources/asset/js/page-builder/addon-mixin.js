"use strict";

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */
var LunaAddonMixin = {
  data: function data() {
    return {
      options: {},
      prepared: false
    };
  },
  props: {
    value: Object
  },
  created: function created() {
    var options = this.options;
    $.each(this.value, function (k, v) {
      Vue.set(options, k, v);
    });
    this.options = options;
  },
  mounted: function mounted() {
    var _this = this;

    // Fix slider bug
    setTimeout(function () {
      _this.prepared = true;
    }, 150);
  },
  methods: {},
  watch: {
    options: {
      handler: function handler() {
        this.$emit('change', this.options);
        this.$emit('input', this.options);
      },
      deep: true
    }
  }
};
//# sourceMappingURL=addon-mixin.js.map
