<template>
  <div v-if="values.id">
    <div class="modal fade" id="column-edit-modal" tabindex="-1" role="dialog"
      aria-labelledby="column-edit-modal-label"
      data-backdrop="static"
      aria-hidden="true" ref="modal">
      <div class="modal-dialog modal-lg" role="document">
        <h5 id="column-edit-modal-label" class="modal-title text-light mb-3">
          Column Options
        </h5>

        <div class="modal-content">
          <div class="modal-header bg-white" :class="{'sticky-top': sticky}">
            <!-- Tabs -->
            <ul class="nav nav-pills border-0">
              <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#column-edit-general" ref="generalTab">
                  General
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#column-edit-layout">
                  Layout
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#column-edit-animation">
                  Animation
                </a>
              </li>
            </ul>
            <div class="ml-auto ms-auto">
              <button type="button" class="btn btn-primary" @click="save()">
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
          <div class="modal-body" v-if="values.id">
            <div class="tab-content" id="column-edit-tab-content">
              <!-- Tab General -->
              <div class="tab-pane fade show active" id="column-edit-general" role="tabpanel" aria-labelledby="column-edit-general-tab">

                <!-- Text Color -->
                <div class="form-group mb-3">
                  <label for="input-column-edit-text-color">Text Color</label>
                  <input id="input-column-edit-text-color" type="text"
                    v-model.lazy="options.text_color" v-color class="form-control" />
                </div>

                <!-- Background Toggler -->
                <div class="form-group mb-3">
                  <label for="input-column-edit-background">Background Style</label>
                  <div class="mt-2">
                    <b-form-radio-group v-model="options.background.type" class="btn-block"
                      buttons button-variant="outline-primary">
                      <b-form-radio value="none">
                        None
                      </b-form-radio>
                      <b-form-radio value="color">
                        Color
                      </b-form-radio>
                      <b-form-radio value="image">
                        Image
                      </b-form-radio>
                      <b-form-radio value="gradient">
                        Gradient
                      </b-form-radio>
                    </b-form-radio-group>
                  </div>
                </div>

                <!-- BG Color -->
                <transition name="fade">
                  <div class="form-group mb-3" v-if="['color', 'image'].indexOf(options.background.type) !== -1">
                    <label for="input-column-edit-bg-color">Background Color</label>
                    <input id="input-column-edit-bg-color" type="text"
                      v-model.lazy="options.background.color" v-color class="form-control" />
                  </div>
                </transition>

                <transition name="fade">
                  <div v-if="['image'].indexOf(options.background.type) !== -1">
                    <!-- BG Image -->
                    <div class="form-group mb-3">
                      <label for="input-column-edit-bg-image">Background Image</label>
                      <single-image v-model="options.background.image.url"
                        id="input-column-edit-bg-image"></single-image>
                    </div>

                    <div class="form-row">
                      <!-- BG Overlay -->
                      <div class="form-group mb-3 col-md-6">
                        <label for="input-column-edit-bg-overlay">Background Overlay</label>
                        <input id="input-column-edit-bg-overlay" type="text"
                          v-model.lazy="options.background.overlay" v-color class="form-control" />
                      </div>

                      <!-- BG Repeat -->
                      <div class="form-group mb-3 col-md-6">
                        <label for="input-column-edit-bg-repeat">Background Repeat</label>
                        <select id="input-column-edit-bg-repeat"
                          v-model.lazy="options.background.image.repeat" class="form-control">
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
                        <label for="input-column-edit-bg-attachment">Background Attachment</label>
                        <select id="input-column-edit-bg-attachment"
                          v-model.lazy="options.background.image.attachment" class="form-control">
                          <option value="fixed">Fixed</option>
                          <option value="scroll">Scroll</option>
                          <option value="inherit">Inherit</option>
                        </select>
                      </div>

                      <!-- BG Position -->
                      <div class="form-group mb-3 col-md-6">
                        <label for="input-column-edit-bg-position">Background Position</label>
                        <select id="input-column-edit-bg-position"
                          v-model.lazy="options.background.image.position" class="form-control">
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
                  <gradient v-if="options.background.type === 'gradient'" v-model="options.background.gradient"
                    id="column-edit-gradient">
                  </gradient>
                </transition>

                <!-- Content Align -->
                <div class="form-group mb-3">
                  <label for="input-addon-edit-text-align">Text Alignment</label>
                  <div class="mt-2">
                    <b-form-radio-group v-model="options.align" class="btn-block"
                      buttons button-variant="outline-primary">
                      <b-form-radio value="">
                        Default
                      </b-form-radio>
                      <b-form-radio value="left">
                        Left
                      </b-form-radio>
                      <b-form-radio value="center">
                        Center
                      </b-form-radio>
                      <b-form-radio value="right">
                        Right
                      </b-form-radio>
                    </b-form-radio-group>
                  </div>
                </div>

                <!-- Middle Align -->
                <div class="form-group mb-3">
                  <label for="input-column-edit-valign">Vertical Align Middle</label>
                  <div>
                    <unicorn-switcher name="column-edit-align-middle" v-model="options.valign"
                      id="input-column-edit-valign"
                      shape="circle"
                      color="success"
                      true-value="middle" false-value="top"></unicorn-switcher>
                  </div>
                </div>

                <hr />

                <!-- Padding -->
                <box-offset v-model="options.padding">
                  <span slot="label">Padding</span>
                </box-offset>

                <!-- Margin -->
                <box-offset v-model="options.margin">
                  <span slot="label">Margin</span>
                </box-offset>

                <hr />

                <!-- Border -->
                <div class="form-group mb-3">
                  <label for="input-column-edit-border-enabled">Border</label>
                  <div>
                    <unicorn-switcher name="column-edit-border-enabled" v-model="options.border.enabled"
                      id="input-column-edit-border-enabled"
                      shape="circle"
                      color="success"></unicorn-switcher>
                  </div>
                </div>

                <div v-if="options.border.enabled == 1">
                  <!-- Border Width -->
                  <rwd-group class-name="c-border-width">
                    <label slot="label">
                      Border Width
                    </label>
                    <div v-for="size of ['lg', 'md', 'xs']" class="form-group mb-3" :slot="size"
                      :class="'c-border-width__' + size">
                      <div class="d-flex">
                        <vue-slide-bar v-model="options.border.width[size]" class="flex-grow-1"></vue-slide-bar>
                        <input type="text" class="form-control ml-2 ms-2 mt-2" style="width: 3.5rem;"
                          v-model="options.border.width[size]" />
                      </div>
                    </div>
                  </rwd-group>

                  <!-- Border Color -->
                  <div class="form-group mb-3">
                    <label for="input-column-edit-border-color">Border Color</label>
                    <input id="input-column-edit-border-color" type="text"
                      v-model.lazy="options.border.color" v-color class="form-control" />
                  </div>

                  <!-- Border Style -->
                  <div class="form-group mb-3">
                    <label for="input-column-edit-border-style">Border Style</label>
                    <select id="input-column-edit-border-style"
                      v-model="options.border.style" class="form-control">
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
                <rwd-group class-name="c-border-radius">
                  <label slot="label">
                    Border Radius
                  </label>
                  <div v-for="size of ['lg', 'md', 'xs']" class="form-group mb-3" :slot="size"
                    :class="'c-border-radius__' + size">
                    <div class="d-flex">
                      <vue-slide-bar v-model="options.border.radius[size]" class="flex-grow-1" :max="500"></vue-slide-bar>
                      <input type="text" class="form-control ml-2 ms-2 mt-2" style="width: 3.5rem;"
                        v-model="options.border.radius[size]" />
                    </div>
                  </div>
                </rwd-group>

                <hr />

                <!-- Box Shadow -->
                <div class="form-group mb-3">
                  <label for="input-column-edit-box_shadow-enabled">Box Shadow</label>
                  <div>
                    <unicorn-switcher name="column-edit-box_shadow-enabled" v-model="options.box_shadow.enabled"
                      id="input-column-edit-box_shadow-enabled"
                      shape="circle"
                      color="success"></unicorn-switcher>
                  </div>
                </div>

                <div v-if="options.box_shadow.enabled == 1">
                  <!-- Shadow Color -->
                  <div class="form-group mb-3">
                    <label for="input-column-edit-box-shadow-color">Shadow Color</label>
                    <input id="input-column-edit-box-shadow-color" type="text"
                      v-model.lazy="options.box_shadow.color" v-color class="form-control" />
                  </div>

                  <div class="form-row">
                    <div class="col-6">
                      <!-- Shadow Offset X -->
                      <div class="form-group mb-3">
                        <label>
                          Shadow X Offset
                        </label>
                        <div class="d-flex">
                          <vue-slide-bar v-model="options.box_shadow.hoffset" class="flex-grow-1"></vue-slide-bar>
                          <input type="text" class="form-control ml-2 ms-2 mt-2" style="width: 3.5rem;"
                            v-model="options.box_shadow.hoffset" />
                        </div>
                      </div>
                    </div>
                    <div class="col-6">
                      <!-- Shadow Offset Y -->
                      <div class="form-group mb-3">
                        <label>
                          Shadow Y Offset
                        </label>
                        <div class="d-flex">
                          <vue-slide-bar v-model="options.box_shadow.voffset" class="flex-grow-1"></vue-slide-bar>
                          <input type="text" class="form-control ml-2 ms-2 mt-2" style="width: 3.5rem;"
                            v-model="options.box_shadow.voffset" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="col-6">
                      <!-- Shadow Blur -->
                      <div class="form-group mb-3">
                        <label>
                          Shadow Blur
                        </label>
                        <div class="d-flex">
                          <vue-slide-bar v-model="options.box_shadow.blur" class="flex-grow-1"></vue-slide-bar>
                          <input type="text" class="form-control ml-2 ms-2 mt-2" style="width: 3.5rem;"
                            v-model="options.box_shadow.blur" />
                        </div>
                      </div>
                    </div>
                    <div class="col-6">
                      <!-- Shadow Spread -->
                      <div class="form-group mb-3">
                        <label>
                          Shadow Spread
                        </label>
                        <div class="d-flex">
                          <vue-slide-bar v-model="options.box_shadow.spread" class="flex-grow-1"></vue-slide-bar>
                          <input type="text" class="form-control ml-2 ms-2 mt-2" style="width: 3.5rem;"
                            v-model="options.box_shadow.spread" />
                        </div>
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
                    v-model="options.width.lg" class="form-control">
                    <option v-for="w of widthRange()" :value="'col-lg-' + w">
                      col-lg-{{ w }}
                    </option>
                  </select>
                </div>

                <!-- Tablet Layout -->
                <div class="form-group mb-3">
                  <label for="input-column-edit-width-tablet">Tablet Width</label>
                  <select id="input-column-edit-width-tablet"
                    v-model="options.width.md" class="form-control">
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
                    v-model="options.width.xs" class="form-control">
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
                    <unicorn-switcher name="column-edit-hidden-mobile" v-model="options.display.xs"
                      id="input-column-edit-hidden-mobile"
                      shape="circle"
                      color="success"
                      true-value="d-none"
                      false-value="d-block"></unicorn-switcher>
                  </div>
                </div>

                <!-- Hidden Tablet -->
                <div class="form-group mb-3">
                  <label for="input-column-edit-hidden-tablet">Hide in Tablet</label>
                  <div>
                    <unicorn-switcher name="column-edit-hidden-tablet" v-model="options.display.md"
                      id="input-column-edit-hidden-tablet"
                      shape="circle"
                      color="success"
                      true-value="d-md-none"
                      false-value="d-md-block"></unicorn-switcher>
                  </div>
                </div>

                <!-- Hidden Tablet -->
                <div class="form-group mb-3">
                  <label for="input-column-edit-hidden-desktop">Hide in Desktop</label>
                  <div>
                    <unicorn-switcher name="column-edit-hidden-desktop" v-model="options.display.lg"
                      id="input-column-edit-hidden-desktop"
                      shape="circle"
                      color="success"
                      true-value="d-lg-none"
                      false-value="d-lg-block"></unicorn-switcher>
                  </div>
                </div>

                <hr />

                <!-- CSS -->
                <div class="form-group mb-3">
                  <label for="input-column-edit-css">Custom CSS</label>
                  <div class="text-muted small mb-3">
                    Will auto prefix with: <code>{{ `#luna-${values.id}` }}</code>, and only affected in this scope.
                  </div>
                  <div>
                    <codemirror ref="css-editor" v-model="options.html_css" :options="cmOptions"></codemirror>
                  </div>
                </div>
              </div>

              <!-- Tab Animation -->
              <div class="tab-pane fade" id="column-edit-animation" role="tabpanel" aria-labelledby="column-edit-animation-tab">
                <animations id="column-edit-anim" :value="options.animation"></animations>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" @click="save()">
              <span class="fa fa-save"></span>
              Save
            </button>
            <button type="button" class="btn btn-secondary" @click="close()">
              <span class="fa fa-times"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BFormRadio, BFormRadioGroup } from 'bootstrap-vue';
import { range } from 'lodash-es';
import PageBuilderService from '../../services/page-builder-services';
import { CodeMirrorOptions, refreshCodeMirror } from '../../services/page-builder/codemirror';
import Animations from "./form/animations";
import BoxOffset from "./form/box-offset";
import SingleImage from "./form/single-image";
import Gradient from "./form/gradient";
import RwdGroup from "./form/rwd-group";

export default {
  name: 'column-edit',
  components: {
    Animations,
    BoxOffset,
    SingleImage,
    Gradient,
    RwdGroup,
    BFormRadioGroup,
    BFormRadio
  },
  data() {
    return {
      values: {},
      sticky: false,
      cmOptions: CodeMirrorOptions,
      saving: false
    }
  },

  props: {
  },

  created() {
  },

  mounted() {
    $('[href="#column-edit-layout"]').on('shown.bs.tab', () => {
      refreshCodeMirror(this.$refs['css-editor']);
    });
  },

  methods: {
    edit(data) {
      this.values = JSON.parse(JSON.stringify(data));

      $(this.$refs.generalTab).click();

      this.$nextTick(() => {
        $(this.$refs.modal).modal('show');
      });

      this.sticky = true;
    },

    save() {
      u.trigger('column:save', JSON.parse(JSON.stringify(this.values)));

      this.values = {};

      this.sticky = false;

      $(this.$refs.modal).modal('hide');
    },

    savePage() {
      u.trigger('column:save', JSON.parse(JSON.stringify(this.values)));

      this.saving = true;
      this.$nextTick(() => {
        PageBuilderService.save(this.saving)
          .finally(() => {
            this.saving = false;
          });
      });
    },

    close() {
      $(this.$refs.modal).modal('hide');

      setTimeout(() => {
        this.values = {};
      }, 300);

      this.sticky = false;
    },

    widthRange() {
      return range(1, 13); // 1 to 12 in array
    }
  },

  watch: {

  },

  computed: {
    options() {
      return this.values.options;
    }
  }
};
</script>

<style scoped>

</style>
