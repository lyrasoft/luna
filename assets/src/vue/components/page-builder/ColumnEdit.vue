<template>
  <div>
    <BsModal :open="modalShow" size="lg" @hidden="modalShow = false"
      backdrop="static" class="c-modal-column-edit">
      <template #header-element>
        <div class="modal-header bg-white sticky-top">
          <ul ref="tab" class="nav nav-pills border-0">
            <li class="nav-item">
              <a ref="generalTab" class="nav-link active" data-toggle="tab" data-bs-toggle="tab" href="#column-edit-general">
                General
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" data-bs-toggle="tab" href="#column-edit-layout">
                Layout
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" data-bs-toggle="tab" href="#column-edit-animation">
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

      <div class="tab-content" id="column-edit-tab-content">
        <!-- Tab General -->
        <div class="tab-pane fade show active" id="column-edit-general" role="tabpanel" aria-labelledby="column-edit-general-tab">

          <!-- Text Color -->
          <div class="form-group mb-3">
            <label for="input-column-edit-text-color">Text Color</label>
            <ColorInput id="input-column-edit-text-color"
              v-model.lazy="options.text_color" />
          </div>

          <!-- Background Toggler -->
          <div class="form-group mb-3">
            <label for="input-column-edit-background">Background Style</label>
            <div class="">
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
                  ]"
              />
            </div>
          </div>

          <!-- BG Color -->
          <transition name="fade" mode="out-in">
            <div class="form-group mb-3"
              v-if="['color', 'image'].indexOf(options.background.type) !== -1"
              style="animation-duration: .3s">
              <label for="input-column-edit-bg-color">Background Color</label>
              <ColorInput id="input-column-edit-bg-color"
                v-model.lazy="options.background.color" />
            </div>
          </transition>

          <transition name="fade" mode="out-in">
            <div v-if="['image'].indexOf(options.background.type) !== -1"
              style="animation-duration: .3s">
              <!-- BG Image -->
              <div class="form-group mb-3">
                <label for="input-column-edit-bg-image">Background Image</label>
                <SingleImage v-model="options.background.image.url"
                  id="input-column-edit-bg-image"
                />
              </div>

              <div class="form-row row">
                <!-- BG Overlay -->
                <div class="form-group mb-3 col-md-6">
                  <label for="input-column-edit-bg-overlay">Background Overlay</label>
                  <ColorInput id="input-column-edit-bg-overlay"
                    v-model.lazy="options.background.overlay" />
                </div>

                <!-- BG Repeat -->
                <div class="form-group mb-3 col-md-6">
                  <label for="input-column-edit-bg-repeat">Background Repeat</label>
                  <select id="input-column-edit-bg-repeat"
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
                  <label for="input-column-edit-bg-attachment">Background Attachment</label>
                  <select id="input-column-edit-bg-attachment"
                    v-model.lazy="options.background.image.attachment" class="form-select custom-select">
                    <option value="fixed">Fixed</option>
                    <option value="scroll">Scroll</option>
                    <option value="inherit">Inherit</option>
                  </select>
                </div>

                <!-- BG Position -->
                <div class="form-group mb-3 col-md-6">
                  <label for="input-column-edit-bg-position">Background Position</label>
                  <select id="input-column-edit-bg-position"
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
              id="column-edit-gradient"
              style="animation-duration: .3s"
            >
            </Gradient>
          </transition>

          <!-- Content Align -->
          <div class="form-group mb-3">
            <label for="input-addon-edit-text-align">Text Alignment</label>
            <div class="">
              <ButtonRadio
                color="primary"
                variant="outline"
                class="w-100"
                v-model="options.align"
                :options="[
                    { text: 'Default', value: '' },
                    { text: 'Left', value: 'left' },
                    { text: 'Center', value: 'center' },
                    { text: 'Right', value: 'right' },
                  ]"
              />
            </div>
          </div>

          <!-- Middle Align -->
          <div class="form-group mb-3">
            <label for="input-column-edit-valign">Vertical Align Middle</label>
            <div>
              <UnicornSwitcher
                name="column-edit-align-middle"
                v-model="options.valign"
                id="input-column-edit-valign"
                shape="circle"
                color="success"
                true-value="middle" false-value="top"
              />
            </div>
          </div>

          <hr />

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

          <hr />

          <!-- Border -->
          <div class="form-group mb-3">
            <label for="input-column-edit-border-enabled">Border</label>
            <div>
              <UnicornSwitcher
                name="column-edit-border-enabled"
                v-model="options.border.enabled"
                id="input-column-edit-border-enabled"
                shape="circle"
                color="success"
              />
            </div>
          </div>

          <div v-if="options.border.enabled == 1">
            <!-- Border Width -->
            <RwdGroup class-name="c-border-width">
              <template #label>
                <label>
                  Border Width
                </label>
              </template>
              <template v-for="size of ['lg', 'md', 'xs']" class="form-group mb-3"
                v-slot:[size]
                :class="'c-border-width__' + size">
                <SliderInput
                  v-model="options.border.width[size]"
                />
              </template>
            </RwdGroup>

            <!-- Border Color -->
            <div class="form-group mb-3">
              <label for="input-column-edit-border-color">Border Color</label>
              <ColorInput id="input-column-edit-border-color"
                v-model.lazy="options.border.color"
              />
            </div>

            <!-- Border Style -->
            <div class="form-group mb-3">
              <label for="input-column-edit-border-style">Border Style</label>
              <select id="input-column-edit-border-style"
                v-model="options.border.style" class="form-select custom-select">
                <option value="">None</option>
                <option value="solid">Solid</option>
                <option value="dotted">Dotted</option>
                <option value="dashed">Dashed</option>
                <option value="double">Double</option>
                <option value="groove">Groove</option>
                <option value="ridge">Ridge</option>
              </select>
            </div>
          </div>

          <!-- Border Radius -->
          <RwdGroup class-name="c-border-radius">
            <template #label>
              <label>
                Border Radius
              </label>
            </template>
            <template v-for="size of ['lg', 'md', 'xs']" class="form-group mb-3"
              v-slot:[size]
              :class="'c-border-radius__' + size">
              <SliderInput
                v-model="options.border.radius[size]"
                :max="500"
              />
            </template>
          </RwdGroup>

          <hr />

          <!-- Box Shadow -->
          <div class="form-group mb-3">
            <label for="input-column-edit-box_shadow-enabled">Box Shadow</label>
            <div>
              <UnicornSwitcher name="column-edit-box_shadow-enabled"
                v-model="options.box_shadow.enabled"
                id="input-column-edit-box_shadow-enabled"
                shape="circle"
                color="success" />
            </div>
          </div>

          <div v-if="options.box_shadow.enabled == 1">
            <!-- Shadow Color -->
            <div class="form-group mb-3">
              <label for="input-column-edit-box-shadow-color">Shadow Color</label>
              <ColorInput id="input-column-edit-box-shadow-color"
                v-model.lazy="options.box_shadow.color"
              />
            </div>

            <div class="form-row row">
              <div class="col-6">
                <!-- Shadow Offset X -->
                <div class="form-group mb-3">
                  <label>
                    Shadow X Offset
                  </label>
                  <SliderInput
                    v-model="options.box_shadow.hoffset"
                  />
                </div>
              </div>
              <div class="col-6">
                <!-- Shadow Offset Y -->
                <div class="form-group mb-3">
                  <label>
                    Shadow Y Offset
                  </label>
                  <SliderInput
                    v-model="options.box_shadow.voffset"
                  />
                </div>
              </div>
            </div>

            <div class="form-row row">
              <div class="col-6">
                <!-- Shadow Blur -->
                <div class="form-group mb-3">
                  <label>
                    Shadow Blur
                  </label>
                  <SliderInput
                    v-model="options.box_shadow.blur"
                  />
                </div>
              </div>
              <div class="col-6">
                <!-- Shadow Spread -->
                <div class="form-group mb-3">
                  <label>
                    Shadow Spread
                  </label>
                  <SliderInput
                    v-model="options.box_shadow.spread"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr />

          <!-- Class -->
          <div class="form-group mb-3">
            <label for="input-column-edit-html-class">CSS Class</label>
            <input id="input-column-edit-html-class" type="text"
              v-model="options.html_class" class="form-control" />
          </div>

        </div>

        <!-- Tab RWD -->
        <div class="tab-pane fade" id="column-edit-layout" role="tabpanel" aria-labelledby="column-edit-layout-tab">
          <!-- Desktop Layout -->
          <div class="form-group mb-3">
            <label for="input-column-edit-width-desktop">Desktop Width</label>
            <select id="input-column-edit-width-desktop"
              v-model="options.width.lg" class="form-select custom-select">
              <option v-for="w of widthRange()" :value="'col-lg-' + w">
                col-lg-{{ w }}
              </option>
            </select>
          </div>

          <!-- Tablet Layout -->
          <div class="form-group mb-3">
            <label for="input-column-edit-width-tablet">Tablet Width</label>
            <select id="input-column-edit-width-tablet"
              v-model="options.width.md" class="form-select custom-select">
              <option value="">- None -</option>
              <option v-for="w of widthRange()" :value="'col-md-' + w">
                col-md-{{ w }}
              </option>
            </select>
          </div>

          <!-- Mobile Layout -->
          <div class="form-group mb-3">
            <label for="input-column-edit-width-mobile">Mobile Width</label>
            <select id="input-column-edit-width-mobile"
              v-model="options.width.xs" class="form-select custom-select">
              <option value="">- None -</option>
              <option v-for="w of widthRange()" :value="'col-' + w">
                col-{{ w }}
              </option>
            </select>
          </div>

          <hr />

          <!-- Hidden Mobile -->
          <div class="form-group mb-3">
            <label for="input-column-edit-hidden-mobile">Hide in Mobile</label>
            <div>
              <UnicornSwitcher name="column-edit-hidden-mobile" v-model="options.display.xs"
                id="input-column-edit-hidden-mobile"
                shape="circle"
                color="success"
                true-value="d-none"
                false-value="d-block"
              />
            </div>
          </div>

          <!-- Hidden Tablet -->
          <div class="form-group mb-3">
            <label for="input-column-edit-hidden-tablet">Hide in Tablet</label>
            <div>
              <UnicornSwitcher name="column-edit-hidden-tablet" v-model="options.display.md"
                id="input-column-edit-hidden-tablet"
                shape="circle"
                color="success"
                true-value="d-md-none"
                false-value="d-md-block"
              />
            </div>
          </div>

          <!-- Hidden Tablet -->
          <div class="form-group mb-3">
            <label for="input-column-edit-hidden-desktop">Hide in Desktop</label>
            <div>
              <UnicornSwitcher name="column-edit-hidden-desktop"
                v-model="options.display.lg"
                id="input-column-edit-hidden-desktop"
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
            <label for="input-column-edit-css">Custom CSS (SCSS)</label>
            <div class="text-muted small mb-3">
              Will auto prefix with: <code>{{ `#luna-${values.id}` }}</code>, and only affected in this scope.
            </div>
            <div v-if="currentTab === 'layout'">
              <CssEditor ref="cssEditor" v-model="options.html_css" :options="cmOptions" :height="350"></CssEditor>
            </div>
          </div>
        </div>

        <!-- Tab Animation -->
        <div class="tab-pane fade" id="column-edit-animation" role="tabpanel" aria-labelledby="column-edit-animation-tab">
          <Animations id="column-edit-anim" :value="options.animation"></Animations>
        </div>
      </div>

      <template #footer>
        <button type="button" class="btn btn-success" @click="saveClose()">
          <span class="fa fa-save"></span>
          Save
        </button>
        <button type="button" class="btn btn-secondary" @click="close()">
          <span class="fa fa-times"></span>
        </button>
      </template>
    </BsModal>
  </div>
</template>

<script>
import BsModal from '@/components/page-builder/bootstrap/BsModal';
import CssEditor from '@/components/page-builder/CssEditor';
import { range } from 'lodash-es';
import { computed, nextTick, onMounted, reactive, ref, toRefs } from 'vue';
import { savePage as doSavePage } from '../../services/page-builder/page-builder.service';
import { CodeMirrorOptions, refreshCodeMirror } from '../../services/page-builder/codemirror';
import UnicornSwitcher from '../form/UnicornSwitcher';
import Animations from "./form/Animations";
import BoxOffset from "./form/BoxOffset";
import ButtonRadio from './form/ButtonRadio';
import ColorInput from './form/ColorInput';
import SingleImage from "./form/SingleImage";
import Gradient from "./form/Gradient";
import RwdGroup from "./form/RwdGroup";
import SliderInput from './form/SliderInput';
import TitleOptions from './form/TitleOptions';

export default {
  name: 'ColumnEdit',
  components: {
    BsModal,
    CssEditor,
    ColorInput,
    UnicornSwitcher,
    SliderInput,
    RwdGroup,
    ButtonRadio,
    TitleOptions,
    Animations,
    BoxOffset,
    SingleImage,
    Gradient
  },
  setup(props, { emit }) {
    const state = reactive({
      values: {},
      cmOptions: CodeMirrorOptions,
      saving: false,
      modalShow: false
    });

    const cssEditor = ref(null);

    onMounted(() => {
      // u.selectOne('[href="#column-edit-layout"]').addEventListener('shown.bs.tab', () => {
      //   refreshCodeMirror(cssEditor.value);
      // });
    });

    const tab = ref(null);
    const currentTab = ref('general');

    function edit(data) {
      state.values = JSON.parse(JSON.stringify(data));
      state.modalShow = true;

      nextTick(() => {
        tab.value.addEventListener('shown.bs.tab', () => {
          updateCurrentTab();
        });

        updateCurrentTab();
      });
    }

    function updateCurrentTab() {
      currentTab.value = tab.value.querySelector('a.nav-link.active')
        .getAttribute('href')
        .replace('#column-edit-', '');
    }

    function saveClose() {
      u.trigger('column:save', JSON.parse(JSON.stringify(state.values)));

      close();
    }

    function savePage() {
      u.trigger('column:save', JSON.parse(JSON.stringify(state.values)));

      state.saving = true;
      nextTick(() => {
        doSavePage(state.saving)
          .finally(() => {
            state.saving = false;
          });
      });
    }

    function close() {
      state.sticky = false;
      state.modalShow = false;

      setTimeout(() => {
        state.values = {};
      }, 300);

      state.sticky = false;
    }

    function widthRange() {
      return range(1, 13); // 1 to 12 in array
    }

    const options = computed(() => {
      return state.values.options;
    });

    return {
      cssEditor,
      options,
      ...toRefs(state),
      tab,
      currentTab,

      edit,
      saveClose,
      savePage,
      close,
      widthRange
    }
  },
};
</script>

<style scoped>

</style>
