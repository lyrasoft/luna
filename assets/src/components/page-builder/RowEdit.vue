<script lang="ts" setup>
import { useEventListener } from '@vueuse/core';
import { sleep, useUnicorn } from '@windwalker-io/unicorn-next';
import { BModal } from 'bootstrap-vue-next';
import { usePageBuilderUtilities } from '~luna/composables';
import { Row, RowSaveEvent } from '~luna/types';
import CssEditor from '~luna/components/page-builder/CssEditor.vue';
import { computed, nextTick, onMounted, ref, useTemplateRef } from 'vue';
import UnicornSwitcher from '~luna/components/form/UnicornSwitcher.vue';
import ColorInput from '~luna/components/page-builder/form/ColorInput.vue';
import RwdGroup from "~luna/components/page-builder/form/RwdGroup.vue";
import Animations from "~luna/components/page-builder/form/Animations.vue";
import BoxOffset from "~luna/components/page-builder/form/BoxOffset.vue";
import ButtonRadio from '~luna/components/page-builder/form/ButtonRadio.vue';
import SingleImage from "~luna/components/page-builder/form/SingleImage.vue";
import Gradient from "~luna/components/page-builder/form/Gradient.vue";
import SliderInput from '~luna/components/page-builder/form/SliderInput.vue';
import RwdTitleOptions from '~luna/components/page-builder/form/RwdTitleOptions.vue';

const { saving, savePage: doSavePage } = usePageBuilderUtilities();

const u = useUnicorn();
const content = ref<Row>();
const sticky = ref(false);
const modalShow = ref(false);
const tab = ref<HTMLElement>();
const currentTab = ref('general');
const cssEditor = useTemplateRef<typeof CssEditor>('cssEditor');

onMounted(() => {
  // layoutTab.value.addEventListener('shown.bs.tab', () => {
  //   refreshCodeMirror(cssEditor.value);
  // });
});

function edit(data: Row) {
  content.value = JSON.parse(JSON.stringify(data));
  modalShow.value = true;

  nextTick(() => {
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
  
  const active = tab.value.querySelector('a.nav-link.active');
  
  if (active) {
    currentTab.value = active.getAttribute('href')?.replace('#row-edit-', '') || 'general';
  }
}

// Save
useEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's' && modalShow.value) {
    e.preventDefault();
    savePage();
  }
});

function saveClose() {
  u.trigger<RowSaveEvent>('row:save', JSON.parse(JSON.stringify(content.value)));
  close();
}

async function savePage() {
  u.trigger<RowSaveEvent>('row:save', JSON.parse(JSON.stringify(content.value)));

  await nextTick();

  return await doSavePage();
}

async function close() {
  modalShow.value = false;
  sticky.value = false;

  await sleep(400);
  content.value = undefined;
}

const options = computed(() => content.value?.options);
</script>

<template>
  <div>
    <BModal :model-value="modalShow" size="lg" @hidden="modalShow = false"
      backdrop="static" class="c-modal-row-edit"
      lazy
      unmount-lazy
      no-trap
      header-class="bg-white sticky-top"
    >
      <template #header>
        <!-- Tabs -->
        <ul ref="tab" class="nav nav-pills border-0">
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" data-bs-toggle="tab" href="#row-edit-general">
              General
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" data-bs-toggle="tab" href="#row-edit-layout">
              Layout
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" data-bs-toggle="tab" href="#row-edit-animation">
              Animation
            </a>
          </li>
        </ul>

        <div class="ml-auto ms-auto">
          <button type="button" class="btn btn-primary btn--save" @click="saveClose()">
            <span class="fa fa-check"></span>
            Done
          </button>
          <button type="button" class="btn btn-success btn--save-page" @click="savePage()"
            :disabled="saving">
            <span :class="saving ? 'spinner-border spinner-border-sm' : 'fa fa-save'"></span>
            Save Page
          </button>
          <button type="button" class="btn btn-secondary btn--close" @click="close">
            <span class="fa fa-times"></span>
          </button>
        </div>
      </template>

      <div v-if="content && options" class="tab-content" id="row-edit-tab-content">
        <!-- Tab General -->
        <div class="tab-pane fade show active" id="row-edit-general" role="tabpanel" aria-labelledby="row-edit-general-tab">
          <!-- Admin Label -->
          <div class="form-group mb-3">
            <label for="input-row-edit-label">Label</label>
            <input id="input-row-edit-label" type="text"
              v-model="options.label" class="form-control" />
            <small class="form-text text-muted">This label only show in edit page.</small>
          </div>

          <hr />

          <!-- Title -->
          <div class="form-group mb-3">
            <label for="input-row-edit-title-text">Main Title</label>
            <textarea id="input-row-edit-title-text"
              v-model="options.title.text" class="form-control"></textarea>
            <small class="form-text text-muted">Title of this section, keep empty to hide it.</small>
          </div>

          <RwdTitleOptions v-if="options.title.text !== ''"
            id="input-row-edit" v-model="content.options.title"></RwdTitleOptions>

          <hr />

          <!-- Subtitle -->
          <div class="form-group mb-3">
            <label for="input-row-edit-subtitle-text">Subtitle</label>
            <textarea id="input-row-edit-subtitle-text"
              v-model="options.subtitle.text" class="form-control"></textarea>
            <small class="form-text text-muted">Subtitle of this section, keep empty to hide it.</small>
          </div>

          <div v-if="options.subtitle.text !== ''">
            <!-- Title Font Size -->
            <RwdGroup class-name="c-title-font-size">
              <template #label>
                <label>
                  Subtitle Font Size
                </label>
              </template>
              <template v-for="size of ['lg', 'md', 'xs']" class="form-group mb-3"
                v-slot:[size]
                :class="'c-subtitle-font-size__' + size">
                <SliderInput
                  v-model="options.subtitle.font_size[size as 'lg' | 'md' | 'xs']"
                  :max="500"
                />
              </template>
            </RwdGroup>
          </div>

          <!-- Title Align -->
          <div class="form-group mb-3">
            <label for="input-row-edit-title-align">Title/Subtitle Text Alignment</label>
            <div>
              <ButtonRadio
                color="primary"
                variant="outline"
                class="w-100"
                v-model="options.title_align"
                :options="[
                    { text: 'Left', value: 'left' },
                    { text: 'Center', value: 'center' },
                    { text: 'Right', value: 'right' },
                  ]"
              />
            </div>
          </div>

          <!-- Text Color -->
          <div class="form-group mb-3">
            <label for="input-row-edit-text-color">Text Color</label>
            <ColorInput id="input-row-edit-text-color"
              v-model.lazy="options.text_color" />
          </div>

          <!-- ID -->
          <div class="form-group mb-3">
            <label for="input-row-edit-html-id">CSS ID</label>
            <input id="input-row-edit-html-id" type="text"
              v-model="options.html_id" class="form-control" />
          </div>

          <!-- Class -->
          <div class="form-group mb-3">
            <label for="input-row-edit-html-class">CSS Class</label>
            <input id="input-row-edit-html-class" type="text"
              v-model="options.html_class" class="form-control" />
          </div>

          <!-- General End -->
        </div>

        <!-- Tab Layout -->
        <div class="tab-pane fade" id="row-edit-layout" role="tabpanel" aria-labelledby="row-edit-layout-tab">

          <!-- Padding -->
          <BoxOffset v-model="options.padding">
            <template v-slot:label>Padding</template>
          </BoxOffset>

          <!-- Margin -->
          <BoxOffset v-model="options.margin">
            <template v-slot:label>Margin</template>
          </BoxOffset>

          <!-- Background Toggler -->
          <div class="form-group mb-3">
            <label for="input-row-edit-background">Background Type</label>
            <div>
              <ButtonRadio
                color="primary"
                variant="outline"
                class="w-100"
                v-model="options.background.type"
                :options="[
                        { value: 'none', text: 'None' },
                        { value: 'color', text: 'Color' },
                        { value: 'image', text: 'Image' },
                        { value: 'gradient', text: 'Gradient' },
                        { value: 'video', text: 'Video' },
                      ]"
              />
            </div>
          </div>

          <!-- BG Color -->
          <transition name="fade">
            <div class="form-group mb-3" v-if="['color', 'image'].indexOf(options.background.type) !== -1">
              <label for="input-row-edit-bg-color">Background Color</label>
              <ColorInput id="input-row-edit-bg-color"
                v-model.lazy="options.background.color" />
            </div>
          </transition>

          <transition name="fade">
            <div v-if="['image'].indexOf(options.background.type) !== -1">
              <!-- BG Image -->
              <div class="form-group mb-3">
                <label for="input-row-edit-bg-image">Background Image</label>
                <single-image v-model="options.background.image.url"
                  id="input-row-edit-bg-image"></single-image>
              </div>

              <div class="form-row row">
                <!-- BG Size -->
                <div class="form-group mb-3 col-md-6">
                  <label for="input-row-edit-bg-size">Background Size</label>
                  <select id="input-row-edit-bg-size"
                    v-model.lazy="options.background.image.size" class="form-select custom-select">
                    <option value="">Default</option>
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                <!-- BG Repeat -->
                <div class="form-group mb-3 col-md-6">
                  <label for="input-row-edit-bg-repeat">Background Repeat</label>
                  <select id="input-row-edit-bg-repeat"
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
                  <label for="input-row-edit-bg-attachment">Background Attachment</label>
                  <select id="input-row-edit-bg-attachment"
                    v-model.lazy="options.background.image.attachment" class="form-select custom-select">
                    <option value="fixed">Fixed</option>
                    <option value="scroll">Scroll</option>
                    <option value="inherit">Inherit</option>
                  </select>
                </div>

                <!-- BG Position -->
                <div class="form-group mb-3 col-md-6">
                  <label for="input-row-edit-bg-position">Background Position</label>
                  <select id="input-row-edit-bg-position"
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

          <transition name="fade">
            <!-- Gradient -->
            <gradient v-if="options.background.type === 'gradient'" v-model="options.background.gradient">
            </gradient>
          </transition>

          <transition name="fade">
            <div v-if="['video'].indexOf(options.background.type) !== -1">
              <!-- video -->
              <div class="form-group mb-3">
                <label for="input-row-edit-bg-video-url">Video URL</label>
                <input id="input-row-edit-bg-video-url" type="text"
                  v-model="options.background.video.url" class="form-control" />
                <small class="form-text text-muted">
                  Paste mp4 video URL, or Youtube / Vimeo URL.
                </small>
              </div>
            </div>
          </transition>

          <transition name="fade">
            <div v-if="['video', 'image'].indexOf(options.background.type) !== -1">
              <!-- BG Overlay -->
              <div class="form-group mb-3">
                <label for="input-row-edit-bg-overlay">Color Overlay</label>
                <ColorInput id="input-row-edit-bg-overlay"
                  v-model.lazy="options.background.overlay" />
              </div>

              <!-- Parallax Background -->
              <div class="form-group mb-3">
                <label for="input-row-edit-hidden-mobile">Parallax Background</label>
                <div>
                  <unicorn-switcher name="row-edit-bg-parallax"
                    v-model="options.background.parallax"
                    id="input-row-edit-bg-parallax"
                    shape="circle"
                    color="success"
                    :true-value="true"
                    :false-value="false"></unicorn-switcher>
                </div>
              </div>
            </div>
          </transition>

          <hr />

          <!-- Justify Content -->
          <div class="form-group mb-3">
            <label for="input-row-edit-justify-content">Content Justify</label>
            <div>
              <ButtonRadio
                color="primary"
                variant="outline"
                class="w-100"
                v-model="options.justify_content"
                :options="[
                        { value: 'start', text: 'Start' },
                        { value: 'center', text: 'Center' },
                        { value: 'end', text: 'End' },
                        { value: 'around', text: 'Space Around' },
                        { value: 'between', text: 'Space Between' },
                      ]"
              />
            </div>
          </div>

          <!-- Middle Align -->
          <div class="form-group mb-3">
            <label for="input-row-edit-valign">Vertical Align Middle</label>
            <div>
              <UnicornSwitcher name="row-edit-valign"
                v-model="options.valign"
                id="input-row-edit-valign"
                shape="circle"
                color="success"
                true-value="middle"
                false-value="top"></UnicornSwitcher>
            </div>
          </div>

          <!-- Fluid Row -->
          <div class="form-group mb-3">
            <label for="input-row-edit-fluid_row">Fluid Row</label>
            <div>
              <UnicornSwitcher name="row-edit-fluid_row"
                v-model="options.fluid_row"
                id="input-row-edit-fluid_row"
                shape="circle"
                color="success"
                :true-value="true"
                :false-value="false"></UnicornSwitcher>
            </div>
          </div>

          <!-- No Gutter -->
          <div class="form-group mb-3">
            <label for="input-row-edit-no_gutter">No Gutters</label>
            <div>
              <UnicornSwitcher name="row-edit-no_gutter"
                v-model="options.no_gutter"
                id="input-row-edit-no_gutter"
                shape="circle"
                color="success"
                :true-value="true"
                :false-value="false"></UnicornSwitcher>
            </div>
          </div>

          <hr />

          <!-- Hidden Mobile -->
          <div class="form-group mb-3">
            <label for="input-row-edit-hidden-mobile">Hide in Mobile</label>
            <div>
              <UnicornSwitcher name="row-edit-hidden-mobile" v-model="options.display.xs"
                id="input-row-edit-hidden-mobile"
                shape="circle"
                color="success"
                true-value="d-none"
                false-value="d-block"></UnicornSwitcher>
            </div>
          </div>

          <!-- Hidden Tablet -->
          <div class="form-group mb-3">
            <label for="input-row-edit-hidden-tablet">Hide in Tablet</label>
            <div>
              <UnicornSwitcher name="row-edit-hidden-tablet" v-model="options.display.md"
                id="input-row-edit-hidden-tablet"
                shape="circle"
                color="success"
                true-value="d-md-none"
                false-value="d-md-block"></UnicornSwitcher>
            </div>
          </div>

          <!-- Hidden Tablet -->
          <div class="form-group mb-3">
            <label for="input-row-edit-hidden-desktop">Hide in Desktop</label>
            <div>
              <UnicornSwitcher name="row-edit-hidden-desktop" v-model="options.display.lg"
                id="input-row-edit-hidden-desktop"
                shape="circle"
                color="success"
                true-value="d-lg-none"
                false-value="d-lg-block"></UnicornSwitcher>
            </div>
          </div>

          <hr />

          <!-- CSS -->
          <div class="form-group mb-3">
            <label for="input-row-edit-css">Custom CSS (SCSS)</label>
            <div class="text-muted small mb-3">
              Will auto prefix by <code>{{ `#luna-${content.id}` }}</code>, only works for this scope.
            </div>
            <div v-if="currentTab === 'layout'">
              <CssEditor ref="cssEditor" v-model="options.html_css" :height="350"></CssEditor>
            </div>
          </div>
        </div>

        <!-- Tab Animation -->
        <div class="tab-pane fade" id="row-edit-animation" role="tabpanel" aria-labelledby="row-edit-animation-tab">
          <Animations id="row-edit-anim" v-model="options.animation"></Animations>
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
    </BModal>
  </div>
</template>

<style scoped>

</style>
