<template>
  <div class="vue-drag-uploader__item preview-img"
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
</template>

<script>
  import { itemStates, swal } from './util';

  export default {
    name: 'vue-drag-uploader-item',
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
</script>
