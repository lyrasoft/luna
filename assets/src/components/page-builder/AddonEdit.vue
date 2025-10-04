<script lang="ts" setup>
import { useUnicorn } from '@windwalker-io/unicorn-next';
import { defaultsDeep } from 'lodash-es';
import { computed, nextTick, onMounted, ref } from 'vue';
import { Addon, AddonOptions, AddonSaveEvent } from '~luna/types';
import BsModal from '../../components/page-builder/bootstrap/BsModal.vue';
import CssEditor from '../../components/page-builder/CssEditor.vue';
import Animations from "../../components/page-builder/form/Animations.vue";
import BoxOffset from "../../components/page-builder/form/BoxOffset.vue";
import ButtonRadio from '../../components/page-builder/form/ButtonRadio.vue';
import ColorInput from '../../components/page-builder/form/ColorInput.vue';
import Gradient from "../../components/page-builder/form/Gradient.vue";
import SingleImage from "../../components/page-builder/form/SingleImage.vue";
import { usePageBuilderUtilities } from '../../services/page-builder/usePageBuilderUtilities';
import UnicornSwitcher from '../form/UnicornSwitcher.vue';

const { addonBasicOptions, savePage: doSavePage } = usePageBuilderUtilities();

const u = useUnicorn();
const content = ref<Addon>();
const saving = ref(false);
const modalShow = ref(false);
const tab = ref<HTMLElement>();
const currentTab = ref<string>('general');

onMounted(() => {
  // $('[href="#addon-edit-layout"]').on('shown.bs.tab', () => {
  //   refreshCodeMirror(this.$refs['css-editor']);
  // });
});

function edit(data: Addon) {
  const editData = JSON.parse(JSON.stringify(data));
  editData.options = defaultsDeep(editData.options, addonBasicOptions());
  editData.disabled = false;
  dataMigration(editData);

  modalShow.value = true;

  nextTick(() => {
    content.value = editData;
    // generalTab.value.dispatchEvent(new Event('click'));

    tab.value?.addEventListener('shown.bs.tab', () => {
      updateCurrentTab();
    });

    updateCurrentTab();
  });
}

defineExpose({
  edit
});

function updateCurrentTab() {
  if (!tab.value) {
    return;
  }

  const active = tab.value.querySelector<HTMLAnchorElement>('a.nav-link.active');

  if (active) {
    currentTab.value = active.getAttribute('href')?.replace('#addon-edit-', '') || 'general';
  }
}

function saveClose() {
  u.trigger<AddonSaveEvent>('addon:save', JSON.parse(JSON.stringify(content.value)));
  close();
}

async function savePage() {
  u.trigger<AddonSaveEvent>('addon:save', JSON.parse(JSON.stringify(content.value)));
  saving.value = true;

  await nextTick();

  try {
    return await doSavePage();
  } finally {
    saving.value = false;
  }
}

function close() {
  modalShow.value = false;

  nextTick(() => {
    content.value = undefined;
  });
}

function dataMigration(data: Addon) {
  const video = data.options.background.video as string | { url: string };

  if (typeof video === 'string') {
    data.options.background.video = { url: video, overlay: '' };
  }
}

const options = computed<AddonOptions | undefined>(() => content.value?.options);
</script>

<template>
  <div>
    <BsModal :open="modalShow" size="lg" @hidden="modalShow = false"
      backdrop="static" class="c-modal-addon-edit"
    >
      <template #header-element>
        <div class="modal-header bg-white sticky-top">
          <!-- Tabs -->
          <ul ref="tab" class="nav nav-pills border-0">
            <li class="nav-item">
              <a ref="generalTab" class="nav-link active" data-toggle="tab" data-bs-toggle="tab"
                href="#addon-edit-general">
                General
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" data-bs-toggle="tab" href="#addon-edit-layout">
                Layout
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" data-bs-toggle="tab" href="#addon-edit-animation">
                Animation
              </a>
            </li>
          </ul>
          <div class="ml-auto ms-auto">
            <button type="button" class="btn btn-primary" @click="saveClose()">
              <span class="fa fa-check"></span>
              Done
            </button>
            <button type="button" class="btn btn-success" @click="savePage()"
              :disabled="saving">
              <span :class="saving ? 'spinner-border spinner-border-sm' : 'fa fa-save'"></span>
              Save Page
            </button>
            <button type="button" class="btn btn-secondary" @click="close()">
              <span class="fa fa-times"></span>
            </button>
          </div>
        </div>
      </template>

      <div v-if="content && options" class="tab-content" id="addon-edit-tab-content">
        <!-- Tab General -->
        <div class="tab-pane fade show active" id="addon-edit-general" role="tabpanel"
          aria-labelledby="addon-edit-general-tab">
          <!-- Admin Label -->
          <div class="form-group mb-3">
            <label for="input-addon-edit-label">Label</label>
            <input id="input-addon-edit-label" type="text"
              v-model="options.label" class="form-control" />
            <small class="form-text text-muted">Only show when editing page.</small>
          </div>

          <!-- Addon Edit Form -->
          <component v-if="content.componentName"
            :is="content.componentName"
            v-model="content.options"
            :addon-id="content.id"
          ></component>

          <!-- Class -->
          <div class="form-group mb-3">
            <label for="input-addon-edit-html-class">CSS Class</label>
            <input id="input-addon-edit-html-class" type="text"
              v-model="options.html_class" class="form-control" />
          </div>
        </div>

        <!-- Tab RWD -->
        <div class="tab-pane fade" id="addon-edit-layout" role="tabpanel" aria-labelledby="addon-edit-layout-tab">

          <!-- Padding -->
          <BoxOffset v-model="options.padding">
            <template #label>
              <label>Padding</label>
            </template>
          </BoxOffset>

          <!-- Margin -->
          <BoxOffset v-model="options.margin">
            <template #label>
              <label>Margin</label>
            </template>
          </BoxOffset>

          <!-- Text Color -->
          <div class="form-group mb-3">
            <label for="input-addon-edit-text-color">Text Color</label>
            <ColorInput id="input-addon-edit-text-color"
              v-model.lazy="options.text_color"
            />
          </div>

          <!-- Background Toggler -->
          <div class="form-group mb-3">
            <label for="input-addon-edit-background">Background Type</label>
            <div class="mt-2">
              <ButtonRadio
                color="primary"
                variant="outline"
                class="w-100"
                v-model="options.background.type"
                :options="[
                    { text: 'None', value: 'none' },
                    { text: 'Color', value: 'color' },
                    { text: 'Image', value: 'image' },
                    { text: 'Gradient', value: 'gradient' },
                    { text: 'video', value: 'video' },
                  ]"
              />
            </div>
          </div>

          <!-- BG Color -->
          <transition name="fade">
            <div class="form-group mb-3" v-if="['color', 'image'].indexOf(options.background.type) !== -1">
              <label for="input-addon-edit-bg-color">Background Color</label>
              <ColorInput id="input-addon-edit-bg-color"
                v-model.lazy="options.background.color" />
            </div>
          </transition>

          <transition name="fade" mode="out-in">
            <div v-if="['image'].indexOf(options.background.type) !== -1"
              style="animation-duration: .3s">
              <!-- BG Image -->
              <div class="form-group mb-3">
                <label for="input-addon-edit-bg-image">Background Image</label>
                <SingleImage v-model="options.background.image.url"
                  id="input-addon-edit-bg-image"
                />
              </div>

              <div class="form-row row">
                <!-- BG Overlay -->
                <div class="form-group mb-3 col-md-6">
                  <label for="input-addon-edit-bg-overlay">Background Overlay</label>
                  <ColorInput id="input-addon-edit-bg-overlay"
                    v-model.lazy="options.background.overlay" />
                </div>

                <!-- BG Repeat -->
                <div class="form-group mb-3 col-md-6">
                  <label for="input-addon-edit-bg-repeat">Background Repeat</label>
                  <select id="input-addon-edit-bg-repeat"
                    v-model.lazy="options.background.image.repeat" class="form-select custom-select">
                    <option value="no-repeat">No Repeat</option>
                    <option value="">Repeat All</option>
                    <option value="repeat-x">Repeat X</option>
                    <option value="repeat-y">Repeat Y</option>
                    <option value="inherit">Inherit</option>
                  </select>
                </div>
              </div>

              <div class="form-row row">
                <!-- BG Attachment -->
                <div class="form-group mb-3 col-md-6">
                  <label for="input-addon-edit-bg-attachment">Background Attachment</label>
                  <select id="input-addon-edit-bg-attachment"
                    v-model.lazy="options.background.image.attachment" class="form-select custom-select">
                    <option value="fixed">Fixed</option>
                    <option value="scroll">Scroll</option>
                    <option value="inherit">Inherit</option>
                  </select>
                </div>

                <!-- BG Position -->
                <div class="form-group mb-3 col-md-6">
                  <label for="input-addon-edit-bg-position">Background Position</label>
                  <select id="input-addon-edit-bg-position"
                    v-model.lazy="options.background.image.position" class="form-select custom-select">
                    <option value="left top">Left Top</option>
                    <option value="left center">Left Center</option>
                    <option value="left bottom">Left Bottom</option>
                    <option value="center top">Center Top</option>
                    <option value="center center">Center Center</option>
                    <option value="center bottom">Center Bottom</option>
                    <option value="right top">Right Top</option>
                    <option value="right center">Right Center</option>
                    <option value="right bottom">Right Bottom</option>
                  </select>
                </div>
              </div>
            </div>
          </transition>

          <transition name="fade" mode="out-in">
            <!-- Gradient -->
            <Gradient v-if="options.background.type === 'gradient'" v-model="options.background.gradient"
              id="addon-edit-gradient"
              style="animation-duration: .3s"
            >
            </Gradient>
          </transition>

          <transition name="fade" mode="out-in">
            <div v-if="['video'].indexOf(options.background.type) !== -1"
              style="animation-duration: .3s"
            >
              <!-- video -->
              <div class="form-group mb-3">
                <label for="input-addon-edit-bg-video-url">Video URL</label>
                <input id="input-addon-edit-bg-video-url" type="text"
                  v-model="options.background.video.url" class="form-control" />
                <small class="form-text text-muted">
                  Paste mp4 video URL or Youtube / Vimeo link.
                </small>
              </div>
            </div>
          </transition>

          <transition name="fade" mode="out-in">
            <div v-if="['video', 'image'].indexOf(options.background.type) !== -1"
              style="animation-duration: .3s"
            >
              <!-- BG Overlay -->
              <div class="form-group mb-3">
                <label for="input-addon-edit-bg-overlay">Background Overlay</label>
                <ColorInput id="input-addon-edit-bg-overlay"
                  v-model.lazy="options.background.overlay"
                />
              </div>

              <!-- Parallax Background -->
              <div class="form-group mb-3">
                <label for="input-addon-edit-hidden-mobile">Parallel Scroll</label>
                <div>
                  <UnicornSwitcher name="addon-edit-bg-parallax"
                    v-model="options.background.parallax"
                    id="input-addon-edit-bg-parallax"
                    shape="circle"
                    color="success"
                    :true-value="true"
                    :false-value="false"
                  />
                </div>
              </div>
            </div>
          </transition>

          <hr />

          <!-- Hidden Mobile -->
          <div class="form-group mb-3">
            <label for="input-addon-edit-hidden-mobile">Hide in Mobile</label>
            <div>
              <UnicornSwitcher name="addon-edit-hidden-mobile" v-model="options.display.xs"
                id="input-addon-edit-hidden-mobile"
                shape="circle"
                color="success"
                true-value="d-none"
                false-value="d-block"
              />
            </div>
          </div>

          <!-- Hidden Tablet -->
          <div class="form-group mb-3">
            <label for="input-addon-edit-hidden-tablet">Hide in Tablet</label>
            <div>
              <UnicornSwitcher name="addon-edit-hidden-tablet" v-model="options.display.md"
                id="input-addon-edit-hidden-tablet"
                shape="circle"
                color="success"
                true-value="d-md-none"
                false-value="d-md-block"
              />
            </div>
          </div>

          <!-- Hidden Tablet -->
          <div class="form-group mb-3">
            <label for="input-addon-edit-hidden-desktop">Hide in Desktop</label>
            <div>
              <UnicornSwitcher name="addon-edit-hidden-desktop"
                v-model="options.display.lg"
                id="input-addon-edit-hidden-desktop"
                shape="circle"
                color="success"
                true-value="d-lg-none"
                false-value="d-lg-block"
              />
            </div>
          </div>

          <hr />

          <!-- CSS -->
          <div class="form-group mb-3">
            <label for="input-addon-edit-css">Custom CSS (SCSS)</label>
            <div class="text-muted small mb-3">
              Will auto prefix with: <code>{{ `#luna-${content.id}` }}</code>, and only affected in this scope.
            </div>
            <div v-if="currentTab === 'layout'">
              <CssEditor ref="css-editor" v-model="options.html_css" :height="350"></CssEditor>
            </div>
          </div>
        </div>

        <!-- Tab Animation -->
        <div class="tab-pane fade" id="addon-edit-animation" role="tabpanel" aria-labelledby="addon-edit-animation-tab">
          <Animations id="addon-edit-anim" :value="options.animation"></Animations>
        </div>
      </div>

      <template #footer>
        <button type="button" class="btn btn-success" @click="saveClose()">
          <span class="fa fa-save"></span>
          Save
        </button>
        <button type="button" class="btn btn-secondary" @click="close()">
          <span class="fa fa-times"></span>
          Cancel
        </button>
      </template>
    </BsModal>
  </div>
</template>

<style scoped>

</style>
