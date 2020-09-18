<template>
  <div>
    <div class="modal fade" id="row-edit-modal" tabindex="-1" role="dialog" aria-labelledby="row-edit-modal-label"
      data-backdrop="static"
      aria-hidden="true" ref="modal">
      <div class="modal-dialog modal-lg" role="document">
        <h5 id="row-edit-modal-label" class="modal-title text-light mb-3">
          編輯列
        </h5>

        <div class="modal-content">
          <div class="modal-header bg-white" :class="{'sticky-top': sticky}">
            <!-- Tabs -->
            <ul class="nav nav-pills border-0">
              <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#row-edit-general" ref="generalTab">
                  基本選項
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#row-edit-layout">
                  版面
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#row-edit-animation">
                  動畫
                </a>
              </li>
            </ul>
            <div class="ml-auto">
              <button type="button" class="btn btn-primary" @click="save()">
                <span class="fa fa-check"></span>
                完成
              </button>
              <button type="button" class="btn btn-success" @click="savePage()"
                :disabled="saving">
                <span :class="saving ? 'spinner-border spinner-border-sm' : 'fa fa-save'"></span>
                儲存頁面
              </button>
              <button type="button" class="btn btn-secondary" @click="close()">
                <span class="fa fa-times"></span>
              </button>
            </div>
          </div>
          <div class="modal-body" v-if="values.id">
            <div class="tab-content" id="row-edit-tab-content">
              <!-- Tab General -->
              <div class="tab-pane fade show active" id="row-edit-general" role="tabpanel" aria-labelledby="row-edit-general-tab">
                <!-- Admin Label -->
                <div class="form-group">
                  <label for="input-row-edit-label">管理用標題</label>
                  <input id="input-row-edit-label" type="text"
                    v-model="options.label" class="form-control" />
                  <small class="form-text text-muted">用來在編輯頁面辨識的標題</small>
                </div>

                <hr />

                <!-- Title -->
                <div class="form-group">
                  <label for="input-row-edit-title-text">主標題</label>
                  <textarea id="input-row-edit-title-text"
                    v-model="options.title.text" class="form-control"></textarea>
                  <small class="form-text text-muted">這個 Section 的大標題，不需要的話保持空白即可</small>
                </div>

                <title-options v-if="options.title.text !== ''"
                  id="input-row-edit" v-model="values.options"></title-options>

                <hr />

                <!-- Subtitle -->
                <div class="form-group">
                  <label for="input-row-edit-subtitle-text">子標題</label>
                  <textarea id="input-row-edit-subtitle-text"
                    v-model="options.subtitle.text" class="form-control"></textarea>
                  <small class="form-text text-muted">這個 Section 的子標題，不需要的話保持空白即可</small>
                </div>

                <div v-if="options.subtitle.text !== ''">
                  <!-- Title Font Size -->
                  <rwd-group class-name="c-title-font-size">
                    <label slot="label">
                      子標題字體大小
                    </label>
                    <div v-for="size of ['lg', 'md', 'xs']" class="form-group" :slot="size"
                      :class="'c-subtitle-font-size__' + size">
                      <div class="d-flex">
                        <vue-slide-bar v-model="options.subtitle.font_size[size]" class="flex-grow-1" :max="500"></vue-slide-bar>
                        <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                          v-model="options.subtitle.font_size[size]" />
                      </div>
                    </div>
                  </rwd-group>
                </div>

                <!-- Title Align -->
                <div class="form-group">
                  <label for="input-row-edit-title-align">標題/子標題文字靠齊 (Align)</label>
                  <div class="mt-2">
                    <b-form-radio-group v-model="options.title_align" class="btn-block"
                      buttons button-variant="outline-primary">
                      <b-form-radio value="left">
                        左
                      </b-form-radio>
                      <b-form-radio value="center">
                        中
                      </b-form-radio>
                      <b-form-radio value="right">
                        右
                      </b-form-radio>
                    </b-form-radio-group>
                  </div>
                </div>

                <!-- Text Color -->
                <div class="form-group">
                  <label for="input-row-edit-text-color">文字顏色</label>
                  <input id="input-row-edit-text-color" type="text"
                    v-model.lazy="options.text_color" v-color class="form-control" />
                </div>

                <!-- ID -->
                <div class="form-group">
                  <label for="input-row-edit-html-id">CSS ID</label>
                  <input id="input-row-edit-html-id" type="text"
                    v-model="options.html_id" class="form-control" />
                </div>

                <!-- Class -->
                <div class="form-group">
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
                <div class="form-group">
                  <label for="input-row-edit-background">背景樣式</label>
                  <div class="mt-2">
                    <b-form-radio-group v-model="options.background.type" class="btn-block"
                      buttons button-variant="outline-primary">
                      <b-form-radio value="none">
                        無
                      </b-form-radio>
                      <b-form-radio value="color">
                        顏色
                      </b-form-radio>
                      <b-form-radio value="image">
                        圖片
                      </b-form-radio>
                      <b-form-radio value="gradient">
                        漸層
                      </b-form-radio>
                      <b-form-radio value="video">
                        影片
                      </b-form-radio>
                    </b-form-radio-group>
                  </div>
                </div>

                <!-- BG Color -->
                <transition name="fade">
                  <div class="form-group" v-if="['color', 'image'].indexOf(options.background.type) !== -1">
                    <label for="input-row-edit-bg-color">背景顏色</label>
                    <input id="input-row-edit-bg-color" type="text"
                      v-model.lazy="options.background.color" v-color class="form-control" />
                  </div>
                </transition>

                <transition name="fade">
                  <div v-if="['image'].indexOf(options.background.type) !== -1">
                    <!-- BG Image -->
                    <div class="form-group">
                      <label for="input-row-edit-bg-image">背景圖片</label>
                      <single-image v-model="options.background.image.url"
                        id="input-row-edit-bg-image"></single-image>
                    </div>

                    <div class="form-row">
                      <!-- BG Size -->
                      <div class="form-group col-md-6">
                        <label for="input-row-edit-bg-repeat">Background Size</label>
                        <select id="input-row-edit-bg-repeat"
                          v-model.lazy="options.background.image.size" class="form-control">
                          <option value="">Default</option>
                          <option value="cover">Cover</option>
                          <option value="contain">Contain</option>
                          <option value="auto">Auto</option>
                        </select>
                      </div>

                      <!-- BG Repeat -->
                      <div class="form-group col-md-6">
                        <label for="input-row-edit-bg-repeat">Background Repeat</label>
                        <select id="input-row-edit-bg-repeat"
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
                      <div class="form-group col-md-6">
                        <label for="input-row-edit-bg-attachment">Background Attachment</label>
                        <select id="input-row-edit-bg-attachment"
                          v-model.lazy="options.background.image.attachment" class="form-control">
                          <option value="fixed">Fixed</option>
                          <option value="scroll">Scroll</option>
                          <option value="inherit">Inherit</option>
                        </select>
                      </div>

                      <!-- BG Position -->
                      <div class="form-group col-md-6">
                        <label for="input-row-edit-bg-position">Background Position</label>
                        <select id="input-row-edit-bg-position"
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
                    <div class="form-group">
                      <label for="input-row-edit-bg-video-url">影片網址</label>
                      <input id="input-row-edit-bg-video-url" type="text"
                        v-model="options.background.video.url" class="form-control" />
                      <small class="form-text text-muted">
                        可直接貼上 mp4 影片網址，或 Youtube / Vimeo 連結
                      </small>
                    </div>
                  </div>
                </transition>

                <transition name="fade">
                  <div v-if="['video', 'image'].indexOf(options.background.type) !== -1">
                    <!-- BG Overlay -->
                    <div class="form-group">
                      <label for="input-row-edit-bg-overlay">背景顏色覆蓋</label>
                      <input id="input-row-edit-bg-overlay" type="text"
                        v-model.lazy="options.background.overlay" v-color class="form-control" />
                    </div>

                    <!-- Parallax Background -->
                    <div class="form-group">
                      <label for="input-row-edit-hidden-mobile">視差特效</label>
                      <div>
                        <phoenix-switch name="row-edit-bg-parallax"
                          v-model="options.background.parallax"
                          id="input-row-edit-bg-parallax"
                          shape="circle"
                          color="success"
                          :true-value="true"
                          :false-value="false"></phoenix-switch>
                      </div>
                    </div>
                  </div>
                </transition>

                <hr />

                <!-- Justify Content -->
                <div class="form-group">
                  <label for="input-row-edit-justify-content">容器水平對齊</label>
                  <div>
                    <b-form-radio-group v-model="options.justify_content" class="btn-block"
                      buttons button-variant="outline-primary">
                      <b-form-radio value="start">
                        前方
                      </b-form-radio>
                      <b-form-radio value="center">
                        中央
                      </b-form-radio>
                      <b-form-radio value="end">
                        後方
                      </b-form-radio>
                      <b-form-radio value="around">
                        平均
                      </b-form-radio>
                      <b-form-radio value="between">
                        平均（對齊邊緣）
                      </b-form-radio>
                    </b-form-radio-group>
                  </div>
                </div>

                <!-- Middle Align -->
                <div class="form-group">
                  <label for="input-row-edit-valign">垂直置中</label>
                  <div>
                    <phoenix-switch name="row-edit-valign"
                      v-model="options.valign"
                      id="input-row-edit-valign"
                      shape="circle"
                      color="success"
                      true-value="middle"
                      false-value="top"></phoenix-switch>
                  </div>
                </div>

                <!-- Fluid Row -->
                <div class="form-group">
                  <label for="input-row-edit-fluid_row">左右滿版 Fluid Row</label>
                  <div>
                    <phoenix-switch name="row-edit-fluid_row"
                      v-model="options.fluid_row"
                      id="input-row-edit-fluid_row"
                      shape="circle"
                      color="success"
                      :true-value="true"
                      :false-value="false"></phoenix-switch>
                  </div>
                </div>

                <!-- No Gutter -->
                <div class="form-group">
                  <label for="input-row-edit-no_gutter">移除欄位間距</label>
                  <div>
                    <phoenix-switch name="row-edit-no_gutter"
                      v-model="options.no_gutter"
                      id="input-row-edit-no_gutter"
                      shape="circle"
                      color="success"
                      :true-value="true"
                      :false-value="false"></phoenix-switch>
                  </div>
                </div>

                <hr />

                <!-- Hidden Mobile -->
                <div class="form-group">
                  <label for="input-row-edit-hidden-mobile">手機板隱藏</label>
                  <div>
                    <phoenix-switch name="row-edit-hidden-mobile" v-model="options.display.xs"
                      id="input-row-edit-hidden-mobile"
                      shape="circle"
                      color="success"
                      true-value="d-none"
                      false-value="d-block"></phoenix-switch>
                  </div>
                </div>

                <!-- Hidden Tablet -->
                <div class="form-group">
                  <label for="input-row-edit-hidden-tablet">平板隱藏</label>
                  <div>
                    <phoenix-switch name="row-edit-hidden-tablet" v-model="options.display.md"
                      id="input-row-edit-hidden-tablet"
                      shape="circle"
                      color="success"
                      true-value="d-md-none"
                      false-value="d-md-block"></phoenix-switch>
                  </div>
                </div>

                <!-- Hidden Tablet -->
                <div class="form-group">
                  <label for="input-row-edit-hidden-desktop">桌面版隱藏</label>
                  <div>
                    <phoenix-switch name="row-edit-hidden-desktop" v-model="options.display.lg"
                      id="input-row-edit-hidden-desktop"
                      shape="circle"
                      color="success"
                      true-value="d-lg-none"
                      false-value="d-lg-block"></phoenix-switch>
                  </div>
                </div>

                <hr />

                <!-- CSS -->
                <div class="form-group">
                  <label for="input-row-edit-css">自訂 CSS</label>
                  <div class="text-muted small mb-3">
                    會自動前綴 <code>{{ `#luna-${values.id}` }}</code>，只會作用在這個區塊內
                  </div>
                  <div>
                    <codemirror ref="css-editor" v-model="options.html_css" :options="cmOptions"></codemirror>
                  </div>
                </div>
              </div>

              <!-- Tab Animation -->
              <div class="tab-pane fade" id="row-edit-animation" role="tabpanel" aria-labelledby="row-edit-animation-tab">
                <animations id="row-edit-anim" :value="options.animation"></animations>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" @click="save()">
              <span class="fa fa-save"></span>
              儲存
            </button>
            <button type="button" class="btn btn-secondary" @click="close()">
              <span class="fa fa-times"></span>
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageBuilderService from '../../services/page-builder-services';
import Animations from "./form/animations";
import BoxOffset from "./form/box-offset";
import SingleImage from "./form/single-image";
import Gradient from "./form/gradient";
import TitleOptions from './form/title-options';
import {CodeMirrorOptions, refreshCodeMirror} from "../../services/page-builder/codemirror";

export default {
  name: 'row-edit',
  components: { TitleOptions, Animations, BoxOffset, SingleImage, Gradient },
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
    $('[href="#row-edit-layout"]').on('shown.bs.tab', () => {
      refreshCodeMirror(this.$refs['css-editor']);
    });
  },

  methods: {
    edit(data) {
      this.values = JSON.parse(JSON.stringify(data));

      $(this.$refs.generalTab).click();
      $(this.$refs.modal).modal('show');

      this.sticky = true;
    },

    save() {
      Phoenix.trigger('row:save', JSON.parse(JSON.stringify(this.values)));

      $(this.$refs.modal).modal('hide');

      this.sticky = false;
    },

    savePage() {
      Phoenix.trigger('row:save', JSON.parse(JSON.stringify(this.values)));

      this.saving = true;
      this.$nextTick(() => {
        PageBuilderService.save(this.saving)
          .always(() => {
            this.saving = false;
          });
      });
    },

    close() {
      $(this.$refs.modal).modal('hide');

      this.sticky = false;

      setTimeout(() => {
        this.values = {};
      }, 300);
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
