/**
 * Part of ke project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

(() => {
  let swal;

  $(() => {
    // Polyfill sweetalert
    swal = window.swal || function swal(title, message = null) {
      alert(title + ' / ' + message);
    };
  });

  const itemStates = {
    NEW: 'new',
    UPLOADING: 'uploading',
    COMPLETED: 'completed',
    FAIL: 'fail',
    STOP: 'stop',
  };

  const VueDragUploaderItem = {
    template: `<div class="vue-drag-uploader__item preview-img"
    :style="{ width: size ? size + 'px' : null, height: size ? size + 'px' : null }"
    @click="$emit('click', item, i, $event)">
    <slot name="item" :item="item">
        <div v-if="isImage" class="preview-img__body"
            :style="{'background-image': 'url(' + (item.thumb_url || item.url) + ')'}"></div>

        <div v-if="!isImage" class="preview-img__body d-flex justify-content-center align-items-center">
            <div class="text-center">
                <div>
                    <span :class="icon" class="fa-3x"></span>
                </div>
                <div style="word-break: break-word">{{ fileName }}</div>
            </div>
        </div>

        <div class="preview-img__overlay">
          <span class="preview-img__remove-icon fa fa-times"
              @click.stop.prevent="deleteSelf()"></span>
            <slot name="extra" :item="item"></slot>
        </div>

        <div class="preview-img__progress" v-if="state === 'uploading'">
            <div class="preview-img__progress-bar"
                :style="{width: (progress * 100) + '%'}"
            ></div>
        </div>
        <div class="preview-img__error-message error-message" v-if="state === 'fail'" @click.stop.prevent="">
            <span class="error-message__notice">Upload fail</span>
            <span class="error-message__message">{{ messages.error }}</span>
        </div>
    </slot>
</div>
    `,
    data() {
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
    created() {
      this.state = this.initState;

      if (this.initState === itemStates.NEW) {

      }
    },
    mounted() {
      if (this.initState === itemStates.NEW) {
        this.upload();
      }
    },
    methods: {
      upload() {
        this.state = itemStates.UPLOADING;

        const uniqid = new Date().valueOf();
        const formData = new FormData();
        formData.append('file', this.item.file);

        this.item.title = this.item.file.name;

        this.$emit('upload-start', uniqid);

        return $.post({
            url: this.uploadUrl,
            data: formData,
            contentType: false,
            processData: false,
            xhr: () => {
              const xhr = new XMLHttpRequest();

              if (xhr.upload) {
                xhr.upload.addEventListener('progress', e => {
                  if (e.lengthComputable) {
                    this.progress = e.loaded / e.total;
                    this.$emit('upload-progress', uniqid, this.progress);
                  }
                }, false);
              }

              return xhr;
            },
          })
          .done(res => {
            this.state = itemStates.COMPLETED;
            this.item.url = res.data.url;

            if (this.isImage) {
              this.item.thumb_url = res.data.thumb_url || res.data.url;
            }
          })
          .fail(xhr => {
            console.warn(xhr.responseJSON.message, xhr);
            this.state = itemStates.FAIL;
            this.messages.error = xhr.responseJSON.message;
          })
          .always(() => {
            this.item.file = null;

            this.$emit('upload-end', uniqid);
          });
      },

      deleteSelf() {
        this.$emit('delete', this.item);
      },
    },
    watch: {},
    computed: {
      fileName() {
        if (this.item.file) {
          return this.item.file.name;
        } else if (this.item.title) {
          return this.item.title;
        } else {
          return this.item.url.split('/').pop();
        }
      },

      isImage() {
        const ext = this.item.file
          ? this.item.file.name.split('.').pop()
          : this.item.url.split('.').pop();

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

      icon() {
        const ext = this.item.file
          ? this.item.file.name.split('.').pop()
          : this.item.url.split('.').pop();

        const icons = {
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
          wav: 'fas fa-file-audio text-dark',
        };

        return icons[ext.toLowerCase()] || 'fas fa-file';
      }
    }
  };

  const VueDragUploader = {
    components: {
      'vue-drag-uploader-item': VueDragUploaderItem
    },
    template: `
<div class="vue-drag-uploader">
    <div class="vue-drag-uploader__wrapper">
        <slot name="items" 
            :items="items"
            :url="url"
            :max-files="maxFiles"
            :files-limited="maxFiles"
        >
            <draggable v-model="items" class="vue-drag-uploader__draggable-wrapper" 
                :options="{draggable: '.preview-img', animation: 300}">
                <slot name="items" :item="items">
                    <vue-drag-uploader-item
                        v-for="(item, i) of items"
                        :item="item"
                        :i="i"
                        :init-state="item.uploadState"
                        :key="item.key"
                        :upload-url="url"
                        :size="thumbSize"
                        @delete="deleteItem"
                        @upload-start="uploadStart"
                        @upload-end="uploadEnd"
                        @upload-progress="uploadProgress"
                        @click="itemClick"
                        >
                        <template slot="item">
                            <slot name="item" 
                                :item="item"
                                :i="i" 
                                :url="url"
                                :max-files="maxFiles"
                                :thumb-size="thumbSize"
                                :files-limited="maxFiles"></slot>
                        </template>
                        <template slot="extra">
                            <slot name="extra"
                                :item="item" 
                                :i="i" 
                                :url="url"
                                :max-files="maxFiles"
                                :thumb-size="thumbSize"
                                :files-limited="maxFiles">
                            </slot>
                        </template>
                    </vue-drag-uploader-item>
                </slot>
                
                <div v-if="canUpload" class="vue-drag-uploader__item add-button" :key="'empty'"
                    @click="clickAdd()"
                    :style="{ width: thumbSize ? thumbSize + 'px' : null, height: thumbSize ? thumbSize + 'px' : null }">
                    <div class="add-button__body">
                        <div class="add-button__icon">
                            <span class="fa fa-upload fa-2x"></span>
                        </div>
                        <div class="add-button__text">
                            {{ placeholder }}
                        </div>
                    </div>
                </div>
            </draggable>
        </slot>
    </div>
</div>
    `,
    data() {
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
        default: ''
      }
    },
    created() {
      this.value.map(item => {
        item.key = item.key || this.getKey();
        item.uploadState = itemStates.COMPLETED;
      });

      this.items = this.value;

      if (this.maxFiles != null) {
        if (this.maxFiles < this.items.length) {
          this.items.splice(this.maxFiles);
        }
      }
    },
    mounted() {
      this.$el.addEventListener('dragover', event => {
        event.stopPropagation();
        event.preventDefault();

        event.currentTarget.classList.add('vue-drag-uploader--ondrag');
      });

      this.$el.addEventListener('dragleave', event => {
        event.stopPropagation();
        event.preventDefault();

        event.currentTarget.classList.remove('vue-drag-uploader--ondrag');
      });

      // File drop
      this.$el.addEventListener('drop', event => {
        event.stopPropagation();
        event.preventDefault();

        event.currentTarget.classList.remove('vue-drag-uploader--ondrag');

        const files = event.target.files || event.dataTransfer.files;

        this.uploadFiles(files);
      });
    },
    methods: {
      clickAdd() {
        const $input = document.createElement('INPUT');
        $input.setAttribute('type', 'file');
        $input.setAttribute('accept', this.accept);

        $input.addEventListener('change', event => {
          const files = event.target.files || event.dataTransfer.files;

          this.uploadFiles(files);
        });

        $input.dispatchEvent(new MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': true
        }));
      },

      getKey() {
        const date = new Date();

        return date.getTime() + '.' + date.getMilliseconds() + '.' + Math.random();
      },

      uploadFiles(files) {
        Array.prototype.forEach.call(files, file => {
          this.checkFile(file);

          if (!this.canUpload) {
            return;
          }

          const reader = new FileReader;
          const url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
          const item = {
            id: '',
            key: this.getKey(),
            url: '',
            thumb_url: url,
            uploadState: itemStates.NEW,
            file: file,
            title: '',
            alt: '',
            description: ''
          };

          this.items.push(item);

          reader.onload = (event) => {
            const url = event.target.result;

            item.thumb_url = url;
          };

          reader.readAsDataURL(file);
        });
      },

      checkFile(file) {
        const accepted = this.acceptedTypes;
        const fileExt = file.name.split('.').pop();

        if (accepted.length) {
          let allow = false;

          accepted.forEach((type) => {
            if (allow) {
              return;
            }

            if (type.indexOf('/') !== -1) {
              if (this.compareMimeType(type, file.type)) {
                allow = true;
              }
            } else {
              if (type === fileExt) {
                allow = true;
              }
            }
          });

          if (!allow) {
            swal(
              Phoenix.__('phoenix.form.field.drag.file.message.unaccepted.files'),
              Phoenix.__('phoenix.form.field.drag.file.message.unaccepted.files.desc', accepted.join(', ')),
              'warning'
            );
            throw new Error('Not accepted file ext');
          }
        }
      },

      compareMimeType(accepted, mime) {
        const accepted2 = accepted.split('/');
        const mime2 = mime.split('/');

        if (accepted2[1] === '*') {
          return accepted2[0] === mime2[0];
        }

        return accepted === mime;
      },

      deleteItem(child) {
        this.$emit('delete-item', child);

        this.items = this.items.filter(item => item.key !== child.key);
      },

      uploadStart(uniqid) {
        Vue.set(this.uploadQueue, uniqid, 0);
      },

      uploadEnd(uniqid) {
        Vue.delete(this.uploadQueue, uniqid);
      },

      uploadProgress(uniqid, progress) {
        this.uploadQueue[uniqid] = progress;
      },

      itemClick(item, i, $event) {
        this.$emit('item-click', item, i, $event);
      }
    },
    watch: {
      value(val) {
        val.map(item => {
          item.key = item.key || this.getKey();
        });

        this.items = val;
      },

      items: {
        handler(items) {
          this.$emit('change', items);
        },
        deep: true
      },

      uploading(val) {
        if (val) {
          this.$emit('uploading');
        } else {
          this.$emit('uploaded');
        }
      },
    },
    computed: {
      canUpload() {
        return this.maxFiles == null || this.items.length < this.maxFiles;
      },

      uploading() {
        Object.keys(this.uploadQueue);
        return Object.keys(this.uploadQueue).length > 0;
      },

      acceptedTypes() {
        return (Array.isArray(this.accept) ? this.accept : this.accept.split(','))
          .map(v => v.trim())
          .filter(v => v.length > 0)
          .map(v => {
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
