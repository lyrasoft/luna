/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2020 .
 * @license    __LICENSE__
 */

window.MultiUploader = Vue.extend({
  name: 'multi-uploader',
  mounted() {
    $(this.$el).data('multi-uploader', this);

    this.$options.metaModal = $(this.$el).find('.c-multi-uploader-modal');

    $(this.$el).trigger('multi-uploader:mounted');
  },
  updated() {

  },
  methods: {
    openFile(item) {
      if (this.$options.openFileHandler) {
        this.$options.openFileHandler(item);
      } else {
        window.open(item.download_url || item.url);
      }
    },

    itemClick(item, i, event) {
      this.current = item;
      this.currentIndex = i;

      this.$options.metaModal.modal('show');
    },

    metaSave() {
      this.current = {};
      this.currentIndex = null;

      this.$options.metaModal.modal('hide');
    },

    isImage(url) {
      const ext = url.split('.').pop().split('?').shift();

      const allow = [
        'png',
        'jpeg',
        'jpg',
        'gif',
        'bmp',
        'webp',
      ];

      return allow.indexOf(ext) !== -1;
    },

    dragover(e) {
      if (!this.canReUpload) {
        return;
      }

      this.$refs.dragarea.style.opacity = 0.75;
    },

    dragleave(e) {
      if (!this.canReUpload) {
        return;
      }

      this.$refs.dragarea.style.opacity = 1;
    },

    drop(event) {
      if (!this.canReUpload) {
        return;
      }

      this.$refs.dragarea.style.opacity = 1;

      const item = this.current;
      const file = event.dataTransfer.files[0];

      this.$refs.app.checkFile(file);

      if (!this.$refs.app.canUpload) {
        return;
      }

      const reader = new FileReader();
      item.file = file;
      const itemComponent = this.$refs.app.$refs[item.key][0];

      this.loading = true;
      this.$refs.app.$refs[item.key][0].upload()
        .always(() => {
          this.loading = false;
        });
    },
  },
  watch: {
    value() {
    }
  }
});
