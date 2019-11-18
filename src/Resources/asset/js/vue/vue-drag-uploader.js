"use strict";

/**
 * Part of ke project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */
(function () {
  var swal;
  $(function () {
    // Polyfill sweetalert
    swal = window.swal || function swal(title) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      alert(title + ' / ' + message);
    };
  });
  var itemStates = {
    NEW: 'new',
    UPLOADING: 'uploading',
    COMPLETED: 'completed',
    FAIL: 'fail',
    STOP: 'stop'
  };
  var VueDragUploaderItem = {
    template: "<div class=\"vue-drag-uploader__item preview-img\"\n    :style=\"{ width: size ? size + 'px' : null, height: size ? size + 'px' : null }\"\n    @click=\"$emit('click', item, i, $event)\">\n    <slot name=\"item\" :item=\"item\">\n        <div v-if=\"isImage\" class=\"preview-img__body\"\n            :style=\"{'background-image': 'url(' + (item.thumb_url || item.url) + ')'}\"></div>\n\n        <div v-if=\"!isImage\" class=\"preview-img__body d-flex justify-content-center align-items-center\">\n            <div class=\"text-center\">\n                <div>\n                    <span :class=\"icon\" class=\"fa-3x\"></span>\n                </div>\n                <div style=\"word-break: break-word\">{{ fileName }}</div>\n            </div>\n        </div>\n\n        <div class=\"preview-img__overlay\">\n          <span class=\"preview-img__remove-icon fa fa-times\"\n              @click.stop.prevent=\"deleteSelf()\"></span>\n            <slot name=\"extra\" :item=\"item\"></slot>\n        </div>\n\n        <div class=\"preview-img__progress\" v-if=\"state === 'uploading'\">\n            <div class=\"preview-img__progress-bar\"\n                :style=\"{width: (progress * 100) + '%'}\"\n            ></div>\n        </div>\n        <div class=\"preview-img__error-message error-message\" v-if=\"state === 'fail'\" @click.stop.prevent=\"\">\n            <span class=\"error-message__notice\">Upload fail</span>\n            <span class=\"error-message__message\">{{ messages.error }}</span>\n        </div>\n    </slot>\n</div>\n    ",
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
      uploadUrl: String,
      size: Number
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
        this.item.title = this.item.file.name;
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

          if (_this.isImage) {
            _this.item.thumb_url = res.data.thumb_url || res.data.url;
          }
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
    watch: {},
    computed: {
      fileName: function fileName() {
        if (this.item.file) {
          return this.item.file.name;
        } else if (this.item.title) {
          return this.item.title;
        } else {
          return this.item.url.split('/').pop();
        }
      },
      isImage: function isImage() {
        var ext = this.item.file ? this.item.file.name.split('.').pop() : this.item.url.split('.').pop();
        var allow = ['png', 'jpeg', 'jpg', 'gif', 'bmp', 'webp'];
        return allow.indexOf(ext) !== -1;
      },
      icon: function icon() {
        var ext = this.item.file ? this.item.file.name.split('.').pop() : this.item.url.split('.').pop();
        var icons = {
          pdf: 'fas fa-file-pdf text-danger',
          xls: 'fas fa-file-excel text-success',
          xlsx: 'fas fa-file-excel text-success',
          doc: 'fas fa-file-word text-primary',
          docx: 'fas fa-file-word text-primary',
          ppt: 'fas fa-file-powerpoint text-warning',
          pptx: 'fas fa-file-powerpoint text-warning',
          zip: 'fas fa-file-archive text-dark',
          '7z': 'fas fa-file-archive text-dark',
          rar: 'fas fa-file-archive text-dark',
          mp4: 'fas fa-file-video text-dark',
          avi: 'fas fa-file-video text-dark',
          flv: 'fas fa-file-video text-dark',
          mov: 'fas fa-file-video text-dark',
          ogg: 'fas fa-file-video text-dark',
          webm: 'fas fa-file-video text-dark',
          mpg: 'fas fa-file-video text-dark',
          mp3: 'fas fa-file-audio text-dark',
          acc: 'fas fa-file-audio text-dark',
          wav: 'fas fa-file-audio text-dark'
        };
        return icons[ext.toLowerCase()] || 'fas fa-file';
      }
    }
  };
  var VueDragUploader = {
    components: {
      'vue-drag-uploader-item': VueDragUploaderItem
    },
    template: "\n<div class=\"vue-drag-uploader\">\n    <div class=\"vue-drag-uploader__wrapper\">\n        <slot name=\"items\" \n            :items=\"items\"\n            :url=\"url\"\n            :max-files=\"maxFiles\"\n            :files-limited=\"maxFiles\"\n        >\n            <draggable v-model=\"items\" class=\"vue-drag-uploader__draggable-wrapper\" \n                :options=\"{draggable: '.preview-img', animation: 300}\">\n                <slot name=\"items\" :item=\"items\">\n                    <vue-drag-uploader-item\n                        v-for=\"(item, i) of items\"\n                        :item=\"item\"\n                        :i=\"i\"\n                        :init-state=\"item.uploadState\"\n                        :key=\"item.key\"\n                        :upload-url=\"url\"\n                        :size=\"thumbSize\"\n                        @delete=\"deleteItem\"\n                        @upload-start=\"uploadStart\"\n                        @upload-end=\"uploadEnd\"\n                        @upload-progress=\"uploadProgress\"\n                        @click=\"itemClick\"\n                        >\n                        <template slot=\"item\">\n                            <slot name=\"item\" \n                                :item=\"item\"\n                                :i=\"i\" \n                                :url=\"url\"\n                                :max-files=\"maxFiles\"\n                                :thumb-size=\"thumbSize\"\n                                :files-limited=\"maxFiles\"></slot>\n                        </template>\n                        <template slot=\"extra\">\n                            <slot name=\"extra\"\n                                :item=\"item\" \n                                :i=\"i\" \n                                :url=\"url\"\n                                :max-files=\"maxFiles\"\n                                :thumb-size=\"thumbSize\"\n                                :files-limited=\"maxFiles\">\n                            </slot>\n                        </template>\n                    </vue-drag-uploader-item>\n                </slot>\n                \n                <div v-if=\"canUpload\" class=\"vue-drag-uploader__item add-button\" :key=\"'empty'\"\n                    @click=\"clickAdd()\"\n                    :style=\"{ width: thumbSize ? thumbSize + 'px' : null, height: thumbSize ? thumbSize + 'px' : null }\">\n                    <div class=\"add-button__body\">\n                        <div class=\"add-button__icon\">\n                            <span class=\"fa fa-upload fa-2x\"></span>\n                        </div>\n                        <div class=\"add-button__text\">\n                            {{ placeholder }}\n                        </div>\n                    </div>\n                </div>\n            </draggable>\n        </slot>\n    </div>\n</div>\n    ",
    data: function data() {
      return {
        items: [],
        uploadQueue: {}
      };
    },
    props: {
      url: String,
      value: Array,
      maxFiles: [String, Number],
      thumbSize: Number,
      placeholder: String,
      accept: {
        type: String,
        "default": ''
      }
    },
    created: function created() {
      var _this2 = this;

      this.value.map(function (item) {
        item.key = item.key || _this2.getKey();
        item.uploadState = itemStates.COMPLETED;
      });
      this.items = this.value;

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

      this.$el.addEventListener('drop', function (event) {
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

        var $input = document.createElement('INPUT');
        $input.setAttribute('type', 'file');
        $input.setAttribute('accept', this.accept);
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
          _this5.checkFile(file);

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
        var _this6 = this;

        var accepted = this.acceptedTypes;
        var fileExt = file.name.split('.').pop();

        if (accepted.length) {
          var allow = false;
          accepted.forEach(function (type) {
            if (allow) {
              return;
            }

            if (type.indexOf('/') !== -1) {
              if (_this6.compareMimeType(type, file.type)) {
                allow = true;
              }
            } else {
              if (type === fileExt) {
                allow = true;
              }
            }
          });

          if (!allow) {
            swal(Phoenix.__('phoenix.form.field.drag.file.message.unaccepted.files'), Phoenix.__('phoenix.form.field.drag.file.message.unaccepted.files.desc', accepted.join(', ')), 'warning');
            throw new Error('Not accepted file ext');
          }
        }
      },
      compareMimeType: function compareMimeType(accepted, mime) {
        var accepted2 = accepted.split('/');
        var mime2 = mime.split('/');

        if (accepted2[1] === '*') {
          return accepted2[0] === mime2[0];
        }

        return accepted === mime;
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
        Vue["delete"](this.uploadQueue, uniqid);
      },
      uploadProgress: function uploadProgress(uniqid, progress) {
        this.uploadQueue[uniqid] = progress;
      },
      itemClick: function itemClick(item, i, $event) {
        this.$emit('item-click', item, i, $event);
      }
    },
    watch: {
      value: function value(val) {
        var _this7 = this;

        val.map(function (item) {
          item.key = item.key || _this7.getKey();
        });
        this.items = val;
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
      },
      acceptedTypes: function acceptedTypes() {
        return (Array.isArray(this.accept) ? this.accept : this.accept.split(',')).map(function (v) {
          return v.trim();
        }).filter(function (v) {
          return v.length > 0;
        }).map(function (v) {
          if (v.indexOf('/') === -1 && v[0] === '.') {
            return v.substr(1);
          }

          return v;
        });
      }
    }
  };
  Vue.component('vue-drag-uploader', VueDragUploader);
})();
//# sourceMappingURL=vue-drag-uploader.js.map
