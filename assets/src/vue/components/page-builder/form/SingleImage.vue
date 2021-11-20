<template>
  <div ref="el" class="c-single-image-uploader">
    <div class="form-group mb-3 c-single-image-preview text-center" v-if="url !== '' && !uploading">
      <img :src="previewUrl" alt="Image" class="img-fluid rounded" style="max-height: 450px;">
    </div>

    <div class="c-single-image-placeholder text-center p-4 mb-3 border rounded" v-if="url === '' && !uploading">
      <small class="text-muted">Drag Image Here</small>
    </div>

    <div class="form-group mb-3 d-flex align-items-center" v-if="uploading" style="min-height: 450px;">
      <img :src="loadingImage" class="mx-auto" alt="Loading">
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
          :disabled="uploading">
          Upload
        </button>
        <button type="button" class="btn btn-primary" @click="pasteFromButton()"
          :disabled="uploading"
          v-c-tooltip="'Paste'">
          <span class="fa fa-paste"></span>
        </button>
        <button v-if="url !== ''" type="button" class="btn btn-primary" @click="url = ''"
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
import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue';

export default {
  name: "single-image",
  directives: {
    'c-tooltip': vctooltip
  },
  props: {
    value: String,
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

    state.url = props.value;

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

        const files = event.originalEvent.target.files || event.originalEvent.dataTransfer.files;

        uploadFile(files[0]);
      });
    });

    function chooseFile() {
      const input = $('<input type="file">');

      input.on('change', event => {
        const files = event.originalEvent.target.files || event.originalEvent.dataTransfer.files;

        this.uploadFile(files[0])
      });

      input.click();
    }

    function pasteFromButton() {
      navigator.clipboard.read().then((items) => {
        const type = items[0].types[1];

        items[0].getType(type).then((blob) => {
          this.uploadFile(blob);
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
        console.log(item, item.getAsFile());
        this.uploadFile(item.getAsFile());
      }
    }

    function uploadFile(file) {
      if (!this.checkFile(file)) {
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      this.uploading = true;

      u.$http.post('@single_image_upload', formData)
        .then((res) => {
          let url = res.data.data.url;

          if (url.indexOf(u.uri('root')) === 0) {
            url = url.substr(u.uri('root').length + 1);
          }

          this.url = url;
        })
        .catch((xhr) => {
          console.error(xhr.responseJSON.message);
          alert(xhr.responseJSON.message);
        })
        .finally(() => {
          this.uploading = false;
        });
    }

    function checkFile(file) {
      if (props.accepted.indexOf(file.type) < 0) {
        alert('Invalid file format');
        return false;
      }

      return true;
    }

    watch(() => props.value, () => {
      state.url = props.value;
    });

    watch(() => state.url, () => {
      emit('update:value', state.url);
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
      ...toRefs(state),

      chooseFile,
    }
  },
}
</script>

<style scoped>

</style>
