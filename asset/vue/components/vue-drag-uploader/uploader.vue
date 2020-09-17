<template>
  <div class="vue-drag-uploader"
    :class="{ 'vue-drag-uploader--readonly': isReadonly }">
    <div class="vue-drag-uploader__wrapper">
      <slot name="items"
        :items="items"
        :url="url"
        :max-files="maxFiles"
        :files-limited="maxFiles"
      >
        <draggable v-model="items" class="vue-drag-uploader__draggable-wrapper"
          v-bind="{ draggable: '.preview-img', animation: 300 }"
          :disabled="isReadonly"
          @sort="$emit('reorder', $event)">
          <slot name="items" :item="items">
            <vue-drag-uploader-item
              v-for="(item, i) of items"
              :item="item"
              :i="i"
              :init-state="item.uploadState"
              :key="item.key"
              :upload-url="url"
              :size="thumbSize"
              :is-readonly="isReadonly"
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
</template>

<script>
  import VueDragUploaderItem from './item';
  import { itemStates, swal } from './util';

  export default {
    name: 'vue-drag-uploader',
    components: {
      'vue-drag-uploader-item': VueDragUploaderItem
    },
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
      },
      disabled: {
        default: false
      },
      readonly: {
        default: false
      },
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
        Array.prototype.forEach.call(files, this.checkFile);

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
            item.thumb_url = event.target.result;
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
          this.$emit('input', items);
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
        return (this.maxFiles == null || this.items.length < this.maxFiles) && !this.isReadonly;
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
      },

      isReadonly() {
        return this.disabled || this.readonly;
      }
    }
  };
</script>
