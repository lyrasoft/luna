<template>
  <div ref="el" class="c-single-image-uploader">
    <div class="form-group mb-3 c-single-image-preview text-center"
      v-if="url !== '' && !uploading">
      <img :src="previewUrl" alt="Image" class="img-fluid rounded" style="max-height: 450px;">
    </div>

    <div class="c-single-image-placeholder text-center p-4 mb-3 border rounded"
      v-if="url === '' && !uploading">
      <small class="text-muted">Drag Image Here</small>
    </div>

    <div class="form-group mb-3 d-flex align-items-center justify-content-center"
      v-if="uploading" style="min-height: 450px;">
      <div class="spinner-border"></div>
    </div>

    <div class="form-group mb-3">
      <div class="input-group">
        <input :id="id"
          type="text"
          v-model="url"
          class="form-control"
          :disabled="uploading"
          @paste="pasteFile"
        />
        <button type="button" class="btn btn-primary" @click="chooseFile()"
          :disabled="uploading"
        >
          <i class="fa fa-upload"></i>
          Upload
        </button>
        <button type="button" class="btn btn-primary" @click="pasteFromButton()"
          :disabled="uploading"
          v-c-tooltip="'Paste'">
          <span class="fa fa-paste"></span>
        </button>
        <button v-if="url !== ''" type="button" class="btn btn-primary" @click.stop="clearUrl"
          :disabled="uploading">
          <span class="fa fa-times"></span>
        </button>
      </div>
      <small class="form-text text-muted">
        Paste image url or drag/upload image here.
      </small>
    </div>
  </div>
</template>

<script>
import { vctooltip } from '@coreui/vue';
import { computed, nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue';

export default {
  name: "single-image",
  directives: {
    'c-tooltip': vctooltip
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    id: String,
    accepted: {
      type: Array,
      default() {
        return [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
          'image/svg',
          'image/svg+xml',
        ];
      }
    }
  },
  setup(props, { emit }) {
    const state = reactive({
      url: '',
      loadingImage: u.route('loading_image'),
      uploading: false
    });
    const el = ref(null);

    state.url = props.modelValue;

    onMounted(() => {
      // Bind events
      el.value.addEventListener('dragover', (event) => {
        event.stopPropagation();
        event.preventDefault();
        el.value.classList.add('c-single-image-uploader--hover');
      });

      el.value.addEventListener('dragleave', (event) => {
        event.stopPropagation();
        event.preventDefault();
        el.value.classList.remove('c-single-image-uploader--hover');
      });

      // File drop
      el.value.addEventListener("drop", (event) => {
        event.stopPropagation();
        event.preventDefault();

        el.value.classList.remove('c-single-image-uploader--hover');

        const files = event.target.files || event.dataTransfer.files;

        uploadFile(files[0]);
      });
    });

    function chooseFile() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = props.accepted.join(',');
      input.style.display = 'none';

      input.addEventListener('change', event => {
        const files = event.target.files || event.dataTransfer.files;

        uploadFile(files[0]);

        input.parentNode.removeChild(input);
      });

      el.value.appendChild(input);

      input.click();
    }

    function pasteFromButton() {
      navigator.clipboard.read().then((items) => {
        const type = items[0].types[1];

        items[0].getType(type).then((blob) => {
          uploadFile(blob);
        });
      });
    }

    function pasteFile(event) {
      if (event.clipboardData.items[1] && event.clipboardData.items[1].kind === 'file') {
        event.preventDefault();
        event.stopPropagation();

        const item = event.clipboardData.items[1];

        if (!item) {
          console.error('No paste item');
          return;
        }

        uploadFile(item.getAsFile());
      }
    }

    function uploadFile(file) {
      if (!checkFile(file)) {
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      state.uploading = true;

      return u.$http.post('@file_upload', formData)
        .then((res) => {
          let url = res.data.data.url;

          if (url.indexOf(u.uri('root')) === 0) {
            url = url.substr(u.uri('root').length + 1);
          }

          state.url = url;
        })
        .catch((e) => {
          console.error(e.message);
          alert(e.message);
        })
        .finally(() => {
          state.uploading = false;
        });
    }

    function checkFile(file) {
      if (props.accepted.indexOf(file.type) < 0) {
        alert('Invalid file format');
        return false;
      }

      return true;
    }

    function clearUrl() {
      state.url = '';
    }

    watch(() => props.value, () => {
      state.url = props.modelValue;
    });

    watch(() => state.url, () => {
      emit('update:modelValue', state.url);
    });

    const previewUrl = computed(() => {
      let url = state.url;

      if (!url) {
        return url;
      }

      if (url.indexOf('http') !== 0 && url.indexOf('/') !== 0) {
        return u.uri('root') + '/' + url;
      }

      return url;
    });

    return {
      el,
      previewUrl,
      ...toRefs(state),

      clearUrl,
      chooseFile,
      pasteFromButton,
    }
  },
}
</script>

<style scoped>

</style>
