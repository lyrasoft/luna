"use strict";

/**
 * Part of ke project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */
(function () {
  var itemStates = {
    NEW: 'new',
    UPLOADING: 'uploading',
    COMPLETED: 'completed',
    FAIL: 'fail',
    STOP: 'stop'
  };
  var VueDragUploaderItem = {
    template: "\n<div class=\"vue-drag-uploader__item preview-img\"\n    @click=\"$emit('click', item, i, $event)\">\n    <slot name=\"item\" :item=\"item\">\n        <div class=\"preview-img__body\"\n            :style=\"{'background-image': 'url(' + (item.thumb_url || item.url) + ')'}\"></div>\n\n        <div class=\"preview-img__overlay\">\n          <span class=\"preview-img__remove-icon fa fa-times\"\n              @click.stop.prevent=\"deleteSelf()\"></span>\n          <slot name=\"extra\" :item=\"item\"></slot>\n        </div>\n\n        <div class=\"preview-img__progress\" v-if=\"state === 'uploading'\">\n            <div class=\"preview-img__progress-bar\"\n                :style=\"{width: (progress * 100) + '%'}\"\n            ></div>\n        </div>\n        <div class=\"preview-img__error-message error-message\" v-if=\"state === 'fail'\" @click.stop.prevent=\"\">\n            <span class=\"error-message__notice\">Upload fail</span>\n            <span class=\"error-message__message\">{{ messages.error }}</span>\n        </div>\n    </slot>\n</div>\n    ",
    data: function data() {
      return {
        state: itemStates.COMPLETED,
        progress: 0,
        messages: {
          error: ''
        }
      };
    },
    props: {
      item: Object,
      i: Number,
      initState: String,
      uploadUrl: String
    },
    created: function created() {
      this.state = this.initState;

      if (this.initState === itemStates.NEW) {}
    },
    mounted: function mounted() {
      if (this.initState === itemStates.NEW) {
        this.upload();
      }
    },
    methods: {
      upload: function upload() {
        var _this = this;

        this.state = itemStates.UPLOADING;
        var uniqid = new Date().valueOf();
        var formData = new FormData();
        formData.append('file', this.item.file);
        this.$emit('upload-start', uniqid);
        return $.post({
          url: this.uploadUrl,
          data: formData,
          contentType: false,
          processData: false,
          xhr: function xhr() {
            var xhr = new XMLHttpRequest();

            if (xhr.upload) {
              xhr.upload.addEventListener('progress', function (e) {
                if (e.lengthComputable) {
                  _this.progress = e.loaded / e.total;

                  _this.$emit('upload-progress', uniqid, _this.progress);
                }
              }, false);
            }

            return xhr;
          }
        }).done(function (res) {
          _this.state = itemStates.COMPLETED;
          _this.item.url = res.data.url;
          _this.item.thumb_url = res.data.thumb_url || res.data.url;
        }).fail(function (xhr) {
          console.warn(xhr.responseJSON.message, xhr);
          _this.state = itemStates.FAIL;
          _this.messages.error = xhr.responseJSON.message;
        }).always(function () {
          _this.item.file = null;

          _this.$emit('upload-end', uniqid);
        });
      },
      deleteSelf: function deleteSelf() {
        this.$emit('delete', this.item);
      }
    },
    watch: {}
  };
  var VueDragUploader = {
    components: {
      'vue-drag-uploader-item': VueDragUploaderItem
    },
    template: "\n<div class=\"vue-drag-uploader\">\n    <div class=\"vue-drag-uploader__wrapper\">\n        <slot name=\"items\" \n            :items=\"items\"\n            :url=\"url\"\n            :max-files=\"maxFiles\"\n            :files-limited=\"maxFiles\"\n        >\n            <draggable v-model=\"items\" class=\"vue-drag-uploader__draggable-wrapper\" \n                :options=\"{draggable: '.preview-img'}\">\n                <slot name=\"items\" :item=\"items\">\n                    <vue-drag-uploader-item\n                        v-for=\"(item, i) of items\"\n                        :item=\"item\"\n                        :i=\"i\"\n                        :init-state=\"item.uploadState\"\n                        :key=\"item.key\"\n                        :upload-url=\"url\"\n                        @delete=\"deleteItem\"\n                        @upload-start=\"uploadStart\"\n                        @upload-end=\"uploadEnd\"\n                        @upload-progress=\"uploadProgress\"\n                        @click=\"itemClick\"\n                        >\n                        <template slot=\"item\">\n                            <slot name=\"item\" \n                                :item=\"item\" \n                                :i=\"i\" \n                                :url=\"url\"\n                                :max-files=\"maxFiles\"\n                                :files-limited=\"maxFiles\"></slot>\n                        </template>\n                        <template slot=\"extra\">\n                            <slot name=\"extra\" \n                                :item=\"item\" \n                                :i=\"i\" \n                                :url=\"url\"\n                                :max-files=\"maxFiles\"\n                                :files-limited=\"maxFiles\"></slot>\n                        </template>\n                    </vue-drag-uploader-item>\n                </slot>\n                \n                <div v-if=\"canUpload\" class=\"vue-drag-uploader__item add-button\" :key=\"'empty'\"\n                    @click=\"clickAdd()\">\n                    <div class=\"add-button__body\">\n                        <div class=\"add-button__icon\">\n                            <span class=\"fa fa-upload fa-2x\"></span>\n                        </div>\n                        <div class=\"add-button__text\">\n                            {{ placeholder }}\n                        </div>\n                    </div>\n                </div>\n            </draggable>\n        </slot>\n    </div>\n</div>\n    ",
    data: function data() {
      return {
        items: [],
        uploadQueue: {}
      };
    },
    props: {
      url: String,
      images: Array,
      maxFiles: [String, Number],
      placeholder: String
    },
    created: function created() {
      var _this2 = this;

      this.images.map(function (image) {
        image.key = image.key || _this2.getKey();
        image.uploadState = itemStates.COMPLETED;
      });
      this.items = this.images;

      if (this.maxFiles != null) {
        if (this.maxFiles < this.items.length) {
          this.items.splice(this.maxFiles);
        }
      }
    },
    mounted: function mounted() {
      var _this3 = this;

      this.$el.addEventListener('dragover', function (event) {
        event.stopPropagation();
        event.preventDefault();
        event.currentTarget.classList.add('vue-drag-uploader--ondrag');
      });
      this.$el.addEventListener('dragleave', function (event) {
        event.stopPropagation();
        event.preventDefault();
        event.currentTarget.classList.remove('vue-drag-uploader--ondrag');
      }); // File drop

      this.$el.addEventListener("drop", function (event) {
        event.stopPropagation();
        event.preventDefault();
        event.currentTarget.classList.remove('vue-drag-uploader--ondrag');
        var files = event.target.files || event.dataTransfer.files;

        _this3.uploadFiles(files);
      });
    },
    methods: {
      clickAdd: function clickAdd() {
        var _this4 = this;

        var $input = document.createElement("INPUT");
        $input.setAttribute('type', 'file');
        $input.addEventListener('change', function (event) {
          var files = event.target.files || event.dataTransfer.files;

          _this4.uploadFiles(files);
        });
        $input.dispatchEvent(new MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': true
        }));
      },
      getKey: function getKey() {
        var date = new Date();
        return date.getTime() + '.' + date.getMilliseconds() + '.' + Math.random();
      },
      uploadFiles: function uploadFiles(files) {
        var _this5 = this;

        Array.prototype.forEach.call(files, function (file) {
          if (!_this5.checkFile(file)) {
            return;
          }

          if (!_this5.canUpload) {
            return;
          }

          var reader = new FileReader();
          var url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
          var item = {
            id: '',
            key: _this5.getKey(),
            url: '',
            thumb_url: url,
            uploadState: itemStates.NEW,
            file: file,
            title: '',
            alt: '',
            description: ''
          };

          _this5.items.push(item);

          reader.onload = function (event) {
            var url = event.target.result;
            item.thumb_url = url;
          };

          reader.readAsDataURL(file);
        });
      },
      checkFile: function checkFile(file) {
        var types = ['image/jpeg', 'image/png', 'image/gif'];
        return types.indexOf(file.type) !== -1;
      },
      deleteItem: function deleteItem(child) {
        this.$emit('delete-item', child);
        this.items = this.items.filter(function (item) {
          return item.key !== child.key;
        });
      },
      uploadStart: function uploadStart(uniqid) {
        Vue.set(this.uploadQueue, uniqid, 0);
      },
      uploadEnd: function uploadEnd(uniqid) {
        Vue.delete(this.uploadQueue, uniqid);
      },
      uploadProgress: function uploadProgress(uniqid, progress) {
        this.uploadQueue[uniqid] = progress;
      },
      itemClick: function itemClick(item, i, $event) {
        this.$emit('item-click', item, i, $event);
      }
    },
    watch: {
      images: function images(_images) {
        var _this6 = this;

        _images.map(function (image) {
          image.key = image.key || _this6.getKey();
        });

        this.items = _images;
      },
      items: {
        handler: function handler(items) {
          this.$emit('change', items);
        },
        deep: true
      },
      uploading: function uploading(val) {
        if (val) {
          this.$emit('uploading');
        } else {
          this.$emit('uploaded');
        }
      }
    },
    computed: {
      canUpload: function canUpload() {
        return this.maxFiles == null || this.items.length < this.maxFiles;
      },
      uploading: function uploading() {
        Object.keys(this.uploadQueue);
        return Object.keys(this.uploadQueue).length > 0;
      }
    }
  };
  Vue.component('vue-drag-uploader', VueDragUploader);
})();
//# sourceMappingURL=vue-drag-uploader.js.map
