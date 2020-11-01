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
      var ext = url.split('.').pop().split('?').shift();
      var allow = ['png', 'jpeg', 'jpg', 'gif', 'bmp', 'webp'];
      return allow.indexOf(ext) !== -1;
    },
    dragover: function dragover(e) {
      if (!this.canReUpload) {
        return;
      }

      this.$refs.dragarea.style.opacity = 0.75;
    },
    dragleave: function dragleave(e) {
      if (!this.canReUpload) {
        return;
      }

      this.$refs.dragarea.style.opacity = 1;
    },
    drop: function drop(event) {
      var _this = this;

      if (!this.canReUpload) {
        return;
      }

      this.$refs.dragarea.style.opacity = 1;
      var item = this.current;
      var file = event.dataTransfer.files[0];
      this.$refs.app.checkFile(file);

      if (!this.$refs.app.canUpload) {
        return;
      }

      var reader = new FileReader();
      item.file = file;
      var itemComponent = this.$refs.app.$refs[item.key][0];
      this.loading = true;
      this.$refs.app.$refs[item.key][0].upload().always(function () {
        _this.loading = false;
      });
    }
  },
  watch: {
    value: function value() {}
  }
});
//# sourceMappingURL=multi-uploader-field.js.map
