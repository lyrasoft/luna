<template>
  <div>
    <CModal :visible="modalShow" size="lg" @close="modalShow = false">
      <CModalHeader class="d-flex bg-white" :class="{'sticky-top': sticky}"
        :close-button="false">
        <!-- Tabs -->
        <ul class="nav nav-pills border-0">
          <li class="nav-item">
            <a ref="generalTab" class="nav-link active" data-bs-toggle="tab" href="#row-edit-general">
              General
            </a>
          </li>
          <li class="nav-item">
            <a ref="layoutTab" class="nav-link" data-bs-toggle="tab" href="#row-edit-layout">
              Layout
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#row-edit-animation">
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
          <button type="button" class="btn btn-secondary" @click="close">
            <span class="fa fa-times"></span>
          </button>
        </div>
      </CModalHeader>

      <CModalBody v-if="values.id">
        <div class="tab-content" id="row-edit-tab-content">
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

            <TitleOptions v-if="options.title.text !== ''"
              id="input-row-edit" v-model="values.options"></TitleOptions>

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
                    v-model="options.subtitle.font_size[size]"
                    class="mt-2"
                    :max="500"
                  />
                </template>
              </RwdGroup>
            </div>

            <!-- Title Align -->
            <div class="form-group mb-3">
              <label for="input-row-edit-title-align">Title/Subtitle Text Alignment</label>
              <div class="mt-2">
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
            <box-offset v-model="options.padding">
              <span slot="label">Padding</span>
            </box-offset>

            <!-- Margin -->
            <box-offset v-model="options.margin">
              <span slot="label">Margin</span>
            </box-offset>

            <!-- Background Toggler -->
            <div class="form-group mb-3">
              <label for="input-row-edit-background">Background Type</label>
              <div class="mt-2">
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

                <div class="form-row">
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

                <div class="form-row">
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
              <label for="input-row-edit-css">Custom CSS</label>
              <div class="text-muted small mb-3">
                Will auto prefix by <code>{{ `#luna-${values.id}` }}</code>, only works for this scope.
              </div>
              <div>
                <codemirror ref="css-editor" v-model="options.html_css" :options="cmOptions" :height="350"></codemirror>
              </div>
            </div>
          </div>

          <!-- Tab Animation -->
          <div class="tab-pane fade" id="row-edit-animation" role="tabpanel" aria-labelledby="row-edit-animation-tab">
            <Animations id="row-edit-anim" :value="options.animation"></Animations>
          </div>
        </div>
      </CModalBody>

      <CModalFooter>
        <button type="button" class="btn btn-success" @click="saveClose()">
          <span class="fa fa-save"></span>
          Save
        </button>
        <button type="button" class="btn btn-secondary" @click="close()">
          <span class="fa fa-times"></span>
          Cancel
        </button>
      </CModalFooter>
    </CModal>
  </div>
</template>

<script>
import { computed, nextTick, onMounted, reactive, ref, toRefs } from 'vue';
import { savePage as doSavePage } from '../../services/page-builder/page-builder.service';
import UnicornSwitcher from '../form/unicorn-switcher';
import ColorInput from './form/ColorInput';
import RwdGroup from "./form/RwdGroup";
import Animations from "./form/Animations";
import BoxOffset from "./form/BoxOffset";
import ButtonRadio from './form/ButtonRadio';
import SingleImage from "./form/SingleImage";
import Gradient from "./form/Gradient";
import SliderInput from './form/SliderInput';
import TitleOptions from './form/TitleOptions';
import { CodeMirrorOptions, refreshCodeMirror } from "../../services/page-builder/codemirror";
import { CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter } from '@coreui/vue';

export default {
  name: 'RowEdit',
  components: {
    ColorInput,
    UnicornSwitcher,
    SliderInput,
    RwdGroup,
    ButtonRadio,
    TitleOptions,
    Animations,
    BoxOffset,
    SingleImage,
    Gradient,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
  },
  setup() {
    const state = reactive({
      values: {},
      sticky: false,
      cmOptions: CodeMirrorOptions,
      saving: false,
      modalShow: false,
    });

    const generalTab = ref(null);
    const layoutTab = ref(null);

    onMounted(() => {
      // $('[href="#row-edit-layout"]').on('shown.bs.tab', () => {
      //   refreshCodeMirror(this.$refs['css-editor']);
      // });
    });

    function edit(data) {
      state.values = JSON.parse(JSON.stringify(data));
      state.modalShow = true;
      state.sticky = true;

      nextTick(() => {
        generalTab.value.dispatchEvent(new Event('click'));
      });
    }

    function saveClose() {
      u.trigger('row:save', JSON.parse(JSON.stringify(state.values)));

      close();
    }

    function savePage() {
      u.trigger('row:save', JSON.parse(JSON.stringify(state.values)));

      state.saving = true;
      nextTick(() => {
        doSavePage(state.saving)
          .finally(() => {
            state.saving = false;
          });
      });
    }

    function close() {
      state.modalShow = false;
      state.sticky = false;

      nextTick(() => {
        state.values = {};
      });
    }

    const options = computed(() => state.values.options);

    return {
      ...toRefs(state),
      options,
      generalTab,
      layoutTab,

      edit,
      saveClose,
      savePage,
      close,
    }
  },
};
</script>

<style scoped>

</style>
