<script lang="ts" setup>
import { useCurrentElement } from '@vueuse/core';
import { type ApiReturn, route, simpleAlert, useHttpClient, useSystemUri } from '@windwalker-io/unicorn-next';
import { computed, onMounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    id?: string;
    accepted?: string[];
  }>(), {
    accepted: () => [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg',
      'image/svg+xml',
      'image/avif',
    ]
  });

const url = defineModel({
  required: false,
  default: ''
});
const loadingImage = ref(route('loading_image'));
const uploading = ref(false);
const el = useCurrentElement<HTMLDivElement>();
const accepted = computed(() => props.accepted);
const uri = useSystemUri();

onMounted(() => {
  if (!el.value) {
    return;
  }

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

  el.value.addEventListener('drop', (event: any) => {
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
  input.accept = accepted.value.join(',');
  input.style.display = 'none';
  input.addEventListener('change', (event) => {
    const files = input.files || (event as any).dataTransfer.files;
    uploadFile(files[0]);
  });
  el.value?.appendChild(input);
  input.click();

  setTimeout(() => {
    input.parentNode?.removeChild(input);
  }, 1000);
}

async function pasteFromButton() {
  try {
    let items = await navigator.clipboard.read();

    const type = items[0].types[1];

    let blob = await items[0].getType(type);
    await uploadFile(new File([blob], 'image.png', { type: blob.type }));
  } catch (e) {
    console.warn('Unable to paste this data');
    console.warn(e);
  }
}

function pasteFile(event: ClipboardEvent) {
  if (event.clipboardData?.items[0] && event.clipboardData.items[0].kind === 'file') {
    event.preventDefault();
    event.stopPropagation();
    const item = event.clipboardData.items[0];

    if (!item) {
      console.error('No paste item');
      return;
    }

    uploadFile(item.getAsFile()!);
  }
}

async function uploadFile(file: File): Promise<void> {
  if (!checkFile(file)) {
    return;
  }

  const formData = new FormData();

  formData.append('file', file);
  uploading.value = true;
  const { post, isAxiosError } = await useHttpClient();

  try {
    let res = await post<ApiReturn<{
      url: string;
    }>>('@file_upload', formData);

    let fileUrl = res.data.data.url;

    if (fileUrl.includes(uri.root())) {
      fileUrl = fileUrl.substring(uri.root().length);
    }

    url.value = fileUrl;
  } catch (e) {
    if (isAxiosError(e)) {
      simpleAlert(e.message);
    }

    console.error(e);
  } finally {
    uploading.value = false;
  }
}

function checkFile(file: File) {
  if (accepted.value.indexOf(file.type) < 0) {
    alert('Invalid file format');
    return false;
  }
  return true;
}

function clearUrl() {
  url.value = '';
}

const previewUrl = computed(() => {
  let fileUrl = url.value;

  if (!fileUrl) {
    return fileUrl;
  }

  if (fileUrl.indexOf('http') !== 0 && fileUrl.indexOf('/') !== 0) {
    return uri.root(fileUrl);
  }

  return fileUrl;
});
</script>

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
        <button type="button" class="btn btn-primary" @click="pasteFromButton"
          :disabled="uploading"
          v-tooltip
          title="Paste">
          <span class="fa fa-paste"></span>
        </button>
        <button v-if="url !== ''" type="button" class="btn btn-primary" @click.stop="clearUrl"
          :disabled="uploading">
          <span class="fa fa-times"></span>
        </button>
      </div>
      <small class="form-text text-muted">
        Paste image url/file or drag and upload image here.
      </small>
    </div>
  </div>
</template>

<style scoped>

</style>
