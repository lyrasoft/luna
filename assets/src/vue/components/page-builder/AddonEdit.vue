<template>
  <div>
    <div class="modal fade" id="addon-edit-modal" role="dialog" aria-labelledby="addon-edit-modal-label"
      data-backdrop="static"
      aria-hidden="true" ref="modal">
      <div class="modal-dialog modal-lg" role="document">
        <h5 id="addon-edit-modal-label" class="modal-title text-light mb-3">
          Addon Edit
        </h5>

        <div class="modal-content">
          <div class="modal-header bg-white" :class="{'sticky-top': sticky}">
            <!-- Tabs -->
            <ul class="nav nav-pills border-0">
              <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#addon-edit-general" ref="generalTab">
                  General
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#addon-edit-layout">
                  Layout
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#addon-edit-animation">
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
                <span :class="this.saving ? 'spinner-border spinner-border-sm' : 'fa fa-save'"></span>
                Save Page
              </button>
              <button type="button" class="btn btn-secondary" @click="close()">
                <span class="fa fa-times"></span>
              </button>
            </div>
          </div>
          <div class="modal-body" v-if="values.id">
            <div class="tab-content" id="addon-edit-tab-content">
              <!-- Tab General -->
              <div class="tab-pane fade show active" id="addon-edit-general" role="tabpanel" aria-labelledby="addon-edit-general-tab">
                <!-- Admin Label -->
                <div class="form-group mb-3">
                  <label for="input-addon-edit-label">Label</label>
                  <input id="input-addon-edit-label" type="text"
                    v-model="options.label" class="form-control" />
                  <small class="form-text text-muted">Only show when editing page.</small>
                </div>

                <!-- Addon Edit Form -->
                <div :is="values.componentName" v-model="values.options" :addon-id="values.id"></div>

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
                <box-offset v-model="options.padding">
                  <span slot="label">Padding</span>
                </box-offset>

                <!-- Margin -->
                <box-offset v-model="options.margin">
                  <span slot="label">Margin</span>
                </box-offset>

                <!-- Text Color -->
                <div class="form-group mb-3">
                  <label for="input-addon-edit-text-color">Text Color</label>
                  <input id="input-addon-edit-text-color" type="text"
                    v-model.lazy="options.text_color" v-color class="form-control" />
                </div>

                <!-- Background Toggler -->
                <div class="form-group mb-3">
                  <label for="input-addon-edit-background">Background Type</label>
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
                      <b-form-radio value="video">
                        Video
                      </b-form-radio>
                    </b-form-radio-group>
                  </div>
                </div>

                <!-- BG Color -->
                <transition name="fade">
                  <div class="form-group mb-3" v-if="['color', 'image'].indexOf(options.background.type) !== -1">
                    <label for="input-addon-edit-bg-color">Background Color</label>
                    <input id="input-addon-edit-bg-color" type="text"
                      v-model.lazy="options.background.color" v-color class="form-control" />
                  </div>
                </transition>

                <transition name="fade">
                  <div v-if="['image'].indexOf(options.background.type) !== -1">
                    <!-- BG Image -->
                    <div class="form-group mb-3">
                      <label for="input-addon-edit-bg-image">Background Image</label>
                      <single-image v-model="options.background.image.url"
                        id="input-addon-edit-bg-image"></single-image>
                    </div>

                    <div class="form-row">
                      <!-- BG Repeat -->
                      <div class="form-group mb-3 col-md-6">
                        <label for="input-addon-edit-bg-repeat">Background Repeat</label>
                        <select id="input-addon-edit-bg-repeat"
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
                        <label for="input-addon-edit-bg-attachment">Background Attachment</label>
                        <select id="input-addon-edit-bg-attachment"
                          v-model.lazy="options.background.image.attachment" class="form-control">
                          <option value="fixed">Fixed</option>
                          <option value="scroll">Scroll</option>
                          <option value="inherit">Inherit</option>
                        </select>
                      </div>

                      <!-- BG Position -->
                      <div class="form-group mb-3 col-md-6">
                        <label for="input-addon-edit-bg-position">Background Position</label>
                        <select id="input-addon-edit-bg-position"
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
                  <gradient v-if="options.background.type === 'gradient'" v-model="options.background.gradient">
                  </gradient>
                </transition>

                <transition name="fade">
                  <div v-if="['video'].indexOf(options.background.type) !== -1">
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

                <transition name="fade">
                  <div v-if="['video', 'image'].indexOf(options.background.type) !== -1">
                    <!-- BG Overlay -->
                    <div class="form-group mb-3">
                      <label for="input-addon-edit-bg-overlay">Background Overlay</label>
                      <input id="input-addon-edit-bg-overlay" type="text"
                        v-model.lazy="options.background.overlay" v-color class="form-control" />
                    </div>

                    <!-- Parallax Background -->
                    <div class="form-group mb-3">
                      <label for="input-addon-edit-hidden-mobile">Parallel Scroll</label>
                      <div>
                        <unicorn-switcher name="addon-edit-bg-parallax"
                          v-model="options.background.parallax"
                          id="input-addon-edit-bg-parallax"
                          shape="circle"
                          color="success"
                          :true-value="true"
                          :false-value="false"
                        ></unicorn-switcher>
                      </div>
                    </div>
                  </div>
                </transition>

                <hr />

                <!-- Hidden Mobile -->
                <div class="form-group mb-3">
                  <label for="input-addon-edit-hidden-mobile">Hide in Mobile</label>
                  <div>
                    <unicorn-switcher name="addon-edit-hidden-mobile" v-model="options.display.xs"
                      id="input-addon-edit-hidden-mobile"
                      shape="circle"
                      color="success"
                      true-value="d-none"
                      false-value="d-block"></unicorn-switcher>
                  </div>
                </div>

                <!-- Hidden Tablet -->
                <div class="form-group mb-3">
                  <label for="input-addon-edit-hidden-tablet">Hide in Tablet</label>
                  <div>
                    <unicorn-switcher name="addon-edit-hidden-tablet" v-model="options.display.md"
                      id="input-addon-edit-hidden-tablet"
                      shape="circle"
                      color="success"
                      true-value="d-md-none"
                      false-value="d-md-block"></unicorn-switcher>
                  </div>
                </div>

                <!-- Hidden Tablet -->
                <div class="form-group mb-3">
                  <label for="input-addon-edit-hidden-desktop">Hide in Desktop</label>
                  <div>
                    <unicorn-switcher name="addon-edit-hidden-desktop" v-model="options.display.lg"
                      id="input-addon-edit-hidden-desktop"
                      shape="circle"
                      color="success"
                      true-value="d-lg-none"
                      false-value="d-lg-block"></unicorn-switcher>
                  </div>
                </div>

                <hr />

                <!-- CSS -->
                <div class="form-group mb-3">
                  <label for="input-addon-edit-css">Custom CSS</label>
                  <div class="text-muted small mb-3">
                    Will auto prefix with: <code>{{ `#luna-${values.id}` }}</code>, and only affected in this scope.
                  </div>
                  <div>
                    <codemirror ref="css-editor" v-model="options.html_css" :options="cmOptions"></codemirror>
                  </div>
                </div>
              </div>

              <!-- Tab Animation -->
              <div class="tab-pane fade" id="addon-edit-animation" role="tabpanel" aria-labelledby="addon-edit-animation-tab">
                <animations id="addon-edit-anim" :value="options.animation"></animations>
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
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageBuilderService from '../../services/page-builder/page-builder.services';
import BoxOffset from "./form/box-offset";
import Animations from "./form/animations";
import SingleImage from "./form/single-image";
import Gradient from "./form/gradient";
import { CodeMirrorOptions, refreshCodeMirror } from '@/services/page-builder/codemirror.js';

export default {
  name: 'addon-edit',
  components: {
    Animations,
    BoxOffset,
    SingleImage,
    Gradient,
    // BFormRadioGroup,
    // BFormRadio
  },
  data() {
    return {
      values: {},
      sticky: false,
      cmOptions: CodeMirrorOptions,
      saving: false,
      langs
    }
  },

  props: {
  },

  created() {
  },

  mounted() {
    $('[href="#addon-edit-layout"]').on('shown.bs.tab', () => {
      refreshCodeMirror(this.$refs['css-editor']);
    });
  },

  methods: {
    edit(data) {
      const editData = JSON.parse(JSON.stringify(data));

      if (typeof editData.options === 'undefined') {
        Vue.set(editData, 'options', this.getAddonBasicOptions());
      }

      if (typeof editData.disabled === 'undefined') {
        Vue.set(editData, 'disabled', false);
      }

      this.dataMigration(editData);

      this.values = editData;

      $(this.$refs.generalTab).click();
      $(this.$refs.modal).modal('show');

      this.sticky = true;
    },

    save() {
      u.trigger('addon:save', JSON.parse(JSON.stringify(this.values)));

      this.values = {};

      this.sticky = false;

      $(this.$refs.modal).modal('hide');
    },

    savePage() {
      u.trigger('addon:save', JSON.parse(JSON.stringify(this.values)));

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

    getAddonBasicOptions() {
      return {
        html_class: '',
        html_css: '',
        label: '',
        title: {
          text: '',
          element: 'h3',
          font_size: {
            lg: '',
            md: '',
            xs: ''
          },
          font_weight: '',
          color: '',
          margin_top: {
            lg: '',
            md: '',
            xs: ''
          },
          margin_bottom: {
            lg: '',
            md: '',
            xs: ''
          }
        },
        align: '',
        // valign: 'top',
        padding: {
          xs: '',
          md: '',
          lg: '',
        },
        margin: {
          xs: '',
          md: '',
          lg: '',
        },
        text_color: '',
        display: {
          xs: 'd-block',
          md: 'd-md-block',
          lg: 'd-lg-block'
        },
        box_shadow: {
          enabled: 0,
          color: 'rgba(0, 0, 0, 1)',
          hoffset: 0,
          voffset: 0,
          blur: 0,
          spread: 0
        },
        border: {
          enabled: 0,
          width: {
            lg: 1,
            md: 1,
            xs: 1,
          },
          color: '',
          style: '',
          radius: {
            lg: 0,
            md: 0,
            xs: 0,
          }
        },
        background: {
          type: 'none',
          color: '',
          overlay: '',
          image: {
            url: '',
            repeat: '',
            position: 'center center',
            attachment: 'inherit',
            size: 'cover'
          },
          gradient: {
            type: 'liner',
            angle: '',
            start_color: '',
            start_pos: '',
            end_color: '',
            end_pos: ''
          },
          video: {
            url: ''
          }
        },
        animation: {
          name: '',
          duration: 300,
          delay: 0
        }
      };
    },

    dataMigration(data) {
      if (typeof data.options.background.video === 'string') {
        data.options.background.video = { url: data.options.background.video };
      }

      // initLangKey(data.id, 'title');
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
