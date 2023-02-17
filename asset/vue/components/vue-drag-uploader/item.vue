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
          <span v-if="!isReadonly" class="preview-img__remove-icon fa fa-times"
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
  import { isImage as isImageType, itemStates, swal } from './util';
  const { ref, reactive, computed, watch, toRefs, onMounted } = VueCompositionAPI;

  export default {
    name: 'vue-drag-uploader-item',
    props: {
      item: Object,
      i: Number,
      initState: String,
      uploadUrl: String,
      size: Number,
      isReadonly: Boolean,
      queue: Object,
    },
    setup(props, { emit }) {
      const state = reactive({
        state: itemStates.COMPLETED,
        progress: 0,
        messages: {
          error: ''
        }
      });

      state.state = props.initState;

      if (props.initState === itemStates.NEW) {

      }

      onMounted(() => {
        if (props.initState === itemStates.NEW) {
          props.queue.push(() => {
            return upload();
          });
        }
      });

      // Methods
      function upload() {
        state.state = itemStates.UPLOADING;

        const uniqid = new Date().valueOf();
        const formData = new FormData();
        formData.append('file', props.item.file);

        props.item.title = props.item.title || props.item.file.name;

        emit('upload-start', uniqid);

        return $.post({
            url: props.uploadUrl,
            data: formData,
            contentType: false,
            processData: false,
            xhr: () => {
              const xhr = new XMLHttpRequest();

              if (xhr.upload) {
                xhr.upload.addEventListener('progress', e => {
                  if (e.lengthComputable) {
                    state.progress = e.loaded / e.total;
                    emit('upload-progress', uniqid, state.progress);
                  }
                }, false);
              }

              return xhr;
            },
          })
          .done(res => {
            state.state = itemStates.COMPLETED;
            props.item.url = res.data.url;
            props.item.download_url = res.data.download_url;

            if (isImage.value) {
              props.item.thumb_url = res.data.thumb_url || res.data.url;
            }
          })
          .fail(xhr => {
            console.error(xhr.responseJSON?.message, xhr);
            state.state = itemStates.FAIL;
            state.messages.error = xhr.responseJSON.message;
          })
          .always(() => {
            props.item.file = null;

            emit('upload-end', uniqid);
          });
      };

      function deleteSelf() {
        if (props.isReadonly) {
          return;
        }

        emit('delete', props.item);
      }

      // Computed
      const fileName = computed(() => {
        if (props.item.file) {
          return props.item.file.name;
        } else if (props.item.title) {
          return props.item.title;
        } else {
          return props.item.url.split('/').pop();
        }
      });

      const isImage = computed(() => {
        return isImageType(
          props.item.file
            ? props.item.file.name
            : props.item.url
        );
      });

      const icon = computed(() => {
        const ext = props.item.file
          ? props.item.file.name.split('.').pop()
          : props.item.url.split('.').pop();

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
      });

      return {
        ...toRefs(state),
        upload,
        deleteSelf,

        // Computed
        isImage,
        icon,
        fileName
      };
    }
  };
</script>
