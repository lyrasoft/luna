"use strict";

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2020 .
 * @license    __LICENSE__
 */
window.MultiUploader = Vue.extend({
  name: 'multi-uploader',
  mounted: function mounted() {
    $(this.$el).data('multi-uploader', this);
    this.$options.metaModal = $(this.$el).find('.c-multi-uploader-modal');
    $(this.$el).trigger('multi-uploader:mounted');
  },
  updated: function updated() {},
  methods: {
    openFile: function openFile(item) {
      if (this.$options.openFileHandler) {
        this.$options.openFileHandler(item);
      } else {
        window.open(item.download_url || item.url);
      }
    },
    itemClick: function itemClick(item, i, event) {
      this.current = item;
      this.currentIndex = i;
      this.$options.metaModal.modal('show');
    },
    metaSave: function metaSave() {
      this.current = {};
      this.currentIndex = null;
      this.$options.metaModal.modal('hide');
    },
    isImage: function isImage(url) {
      var ext = url.split('.').pop();
      var allow = ['png', 'jpeg', 'jpg', 'gif', 'bmp', 'webp'];
      return allow.indexOf(ext) !== -1;
    }
  },
  watch: {
    value: function value() {}
  }
});
//# sourceMappingURL=multi-uploader-field.js.map
