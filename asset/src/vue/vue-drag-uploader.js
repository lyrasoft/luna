/**
 * Part of ke project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

(() => {
  const itemStates = {
    NEW: 'new',
    UPLOADING: 'uploading',
    COMPLETED: 'completed',
    FAIL: 'fail',
    STOP: 'stop',
  };

  const VueDragUploaderItem = {
    template: `
<div class="vue-drag-uploader__item preview-img"
    :style="{ width: size ? size + 'px' : null, height: size ? size + 'px' : null }"
    @click="$emit('click', item, i, $event)">
    <slot name="item" :item="item">
        <div class="preview-img__body"
            :style="{'background-image': 'url(' + (item.thumb_url || item.url) + ')'}"></div>

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
      }
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

        this.$emit('upload-start', uniqid);

        return $.post({
            url: this.uploadUrl,
            data: formData,
            contentType: false,
            processData: false,
            xhr: () => {
              const xhr = new XMLHttpRequest();

              if(xhr.upload){
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
            this.item.thumb_url = res.data.thumb_url || res.data.url;
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
      }
    },
    watch: {
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
                                :files-limited="maxFiles"></slot>
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
      }
    },
    props: {
      url: String,
      images: Array,
      maxFiles: [String, Number],
      thumbSize: Number,
      placeholder: String
    },
    created() {
      this.images.map(image => {
        image.key = image.key || this.getKey();
        image.uploadState = itemStates.COMPLETED;
      });

      this.items = this.images;

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
      this.$el.addEventListener("drop", event => {
        event.stopPropagation();
        event.preventDefault();

        event.currentTarget.classList.remove('vue-drag-uploader--ondrag');

        const files = event.target.files || event.dataTransfer.files;

        this.uploadFiles(files);
      });
    },
    methods: {
      clickAdd() {
        const $input = document.createElement("INPUT");
        $input.setAttribute('type', 'file');

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
          if (!this.checkFile(file)) {
            return;
          }

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

      checkFile: function(file) {
        const types = [
          'image/jpeg',
          'image/png',
          'image/gif'
        ];

        return types.indexOf(file.type) !== -1;
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
      images(images) {
        images.map(image => {
          image.key = image.key || this.getKey();
        });

        this.items = images;
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
      }
    },
    computed: {
      canUpload() {
        return this.maxFiles == null || this.items.length < this.maxFiles;
      },

      uploading() {
        Object.keys(this.uploadQueue);
        return Object.keys(this.uploadQueue).length > 0;
      }
    }
  };

  Vue.component('vue-drag-uploader', VueDragUploader);
})();
