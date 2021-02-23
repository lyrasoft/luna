<template>
  <div ref="el" class="vue-drag-uploader"
    :class="{ 'vue-drag-uploader--readonly': isReadonly }">
    <div class="vue-drag-uploader__wrapper">
      <slot name="items"
        :items="items"
        :url="url"
        :max-files="maxFiles"
        :files-limited="maxFiles"
      >
        <draggable
          v-model="items"
          class="vue-drag-uploader__draggable-wrapper"
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
              :ref="item.key"
              :upload-url="url"
              :size="thumbSize"
              :is-readonly="isReadonly"
              @delete="deleteItem"
              @upload-start="uploadStart"
              @upload-end="uploadEnd"
              @upload-progress="uploadProgress"
              @click="itemClick"
              style="animation-duration: .3s"
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

  const { ref, reactive, toRefs, onMounted, computed, watch } = VueCompositionAPI;

  export default {
    name: 'vue-drag-uploader',
    components: {
      VueDragUploaderItem
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
    setup(props, { emit }) {
      const el = ref(null);
      const state = reactive({
        items: [],
        uploadQueue: {}
      });
      const value = computed(() => props.value);

      onMounted(() => {
        prepareSelectEvents(el, uploadFiles);
      });

      // Created
      props.value.map(item => {
        item.key = item.key || getKey();
        item.uploadState = itemStates.COMPLETED;
      });

      state.items.push(...props.value);

      if (props.maxFiles != null) {
        if (props.maxFiles < state.items.length) {
          state.items.splice(props.maxFiles);
        }
      }

      function clickAdd() {
        let $input = document.querySelector('input#luna-multi-uploader-selector');

        if (!$input) {
          $input = document.createElement('INPUT');
          $input.setAttribute('id', 'luna-multi-uploader-selector');
          $input.setAttribute('type', 'file');
          $input.setAttribute('accept', props.accept);
          $input.setAttribute('multiple', true);
          $input.style.display = 'none';

          $input.addEventListener('change', event => {
            const files = event.target.files;
            uploadFiles(files);
          });

          document.body.appendChild($input);
        }

        $input.dispatchEvent(new MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': true
        }));
      }

      function getKey() {
        const date = new Date();

        return date.getTime() + '.' + date.getMilliseconds() + '.' + Math.random();
      }

      function uploadFiles(files) {
        // Pre check all files to block whole task if anyone is invalid.
        Array.prototype.forEach.call(files, checkFile);

        // Now start loop all files to upload.
        Array.prototype.forEach.call(files, file => {
          checkFile(file);

          if (!canUpload.value) {
            return;
          }

          const reader = new FileReader;
          const url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
          const item = {
            id: '',
            key: getKey(),
            url: '',
            thumb_url: url,
            uploadState: itemStates.NEW,
            file: file,
            title: '',
            alt: '',
            description: ''
          };

          state.items.push(item);

          reader.onload = (event) => {
            item.thumb_url = event.target.result;
          };

          reader.readAsDataURL(file);
        });
      }

      function checkFile(file) {
        const accepted = acceptedTypes.value;
        const fileExt = file.name.split('.').pop();

        if (accepted.length) {
          let allow = false;

          accepted.forEach((type) => {
            if (allow) {
              return;
            }

            if (type.indexOf('/') !== -1) {
              if (compareMimeType(type, file.type)) {
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
      }

      function compareMimeType(accepted, mime) {
        const accepted2 = accepted.split('/');
        const mime2 = mime.split('/');

        if (accepted2[1] === '*') {
          return accepted2[0] === mime2[0];
        }

        return accepted === mime;
      }

      function deleteItem(child) {
        emit('delete-item', child);

        state.items = state.items.filter(item => item.key !== child.key);
      }

      function uploadStart(uniqid) {
        state.uploadQueue[uniqid] = 0;
      }

      function uploadEnd(uniqid) {
        delete state.uploadQueue[uniqid];
      }

      function uploadProgress(uniqid, progress) {
        state.uploadQueue[uniqid] = progress;
      }

      function itemClick(item, i, $event) {
        emit('item-click', item, i, $event);
      }

      // Computed
      const canUpload = computed(() => {
        return (props.maxFiles == null || state.items.length < props.maxFiles) && !isReadonly.value;
      });

      const uploading = computed(() => {
        Object.keys(state.uploadQueue);
        return Object.keys(state.uploadQueue).length > 0;
      });

      const acceptedTypes = computed(() => {
        return (Array.isArray(props.accept) ? props.accept : props.accept.split(','))
          .map(v => v.trim())
          .filter(v => v.length > 0)
          .map(v => {
            if (v.indexOf('/') === -1 && v[0] === '.') {
              return v.substr(1);
            }

            return v;
          });
      });

      const isReadonly = computed(() => {
        return props.disabled || props.readonly;
      });

      // Watch
      watch(value, (val) => {
        val.map(item => {
          item.key = item.key || getKey();
        });

        if (JSON.stringify(val) !== JSON.stringify(state.items)) {
          state.items = val;
        }
      }, { deep: true });

      watch(() => state.items, (items) => {
        emit('change', items);
        emit('input', items);
      }, { deep: true });

      watch(uploading, (val) => {
        if (val) {
          emit('uploading');
        } else {
          emit('uploaded');
        }
      });

      return {
        el,
        ...toRefs(state),

        // Methods
        clickAdd,
        getKey,
        uploadFiles,
        checkFile,
        compareMimeType,
        deleteItem,
        uploadStart,
        uploadEnd,
        uploadProgress,
        itemClick,

        // Computed
        canUpload,
        uploading,
        acceptedTypes,
        isReadonly
      };
    }
  };

  function prepareSelectEvents(el, uploadFiles) {
    el.value.addEventListener('dragover', event => {
      event.stopPropagation();
      event.preventDefault();

      event.currentTarget.classList.add('vue-drag-uploader--ondrag');
    });

    el.value.addEventListener('dragleave', event => {
      event.stopPropagation();
      event.preventDefault();

      event.currentTarget.classList.remove('vue-drag-uploader--ondrag');
    });

    // File drop
    el.value.addEventListener('drop', event => {
      event.stopPropagation();
      event.preventDefault();

      event.currentTarget.classList.remove('vue-drag-uploader--ondrag');

      const items = event.dataTransfer.items;
      const files = [];
      const allEntries = [];

      // Use promise to recursively load files
      const getFilesRecursively = (entry) => {
        const promises = [];
        const length = entries.length;

        if (entry.isDirectory) {
          const dirReader = entry.createReader();

          // .readEntries() is async, we must use promise to handle it.
          promises.push(
            new Promise((resolve) => {
              const pros = [];
              dirReader.readEntries((entries) => {
                entries.forEach((ent) => {
                  pros.push(getFilesRecursively(ent));
                });

                Promise.all(pros).then(resolve);
              });
            })
          );
        } else {
          promises.push(new Promise((resolve) => {
            entry.file((file) => {
              allEntries.push(file);
              resolve(file);
            });
          }));
        }

        return Promise.all(promises);
      };

      const entries = [];
      const promises = [];
      Array.prototype.forEach.call(items, (item) => {
        const entry = item.webkitGetAsEntry();

        if (entry) {
          promises.push(getFilesRecursively(item.webkitGetAsEntry()));
        }
      });

      if (promises.length) {
        Promise.all(promises).then((a) => {
          uploadFiles(allEntries);
        });
      }
    });
  }
</script>
