<template>
  <div>
    <!-- Title -->
    <div class="form-group">
      <label for="input-addon-edit-title-text">主標題</label>
      <textarea id="input-addon-edit-title-text"
        v-model="options.title.text" class="form-control"></textarea>
      <small class="form-text text-muted">這個區塊的標題，不需要的話保持空白即可</small>
    </div>

    <title-options v-if="options.title.text !== ''"
      id="input-addon-edit" v-model="options" />

    <hr />

    <div class="form-group">
      <label for="addon-edit-content">內文</label>
      <textarea id="addon-edit-content" v-model="options.content" v-tinymce class="form-control"></textarea>
    </div>

    <!-- Content Align -->
    <div class="form-group">
      <label for="input-addon-edit-title-align">內文靠齊</label>
      <div class="mt-2">
        <b-form-radio-group v-model="options.align" class="btn-block" buttons button-variant="outline-primary">
          <b-form-radio value="">
            頁面預設
          </b-form-radio>
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

    <!-- Content Font Size -->
    <rwd-group class-name="c-title-font-size">
      <label slot="label">
        內文字體大小
      </label>
      <div v-for="size of ['lg', 'md', 'xs']" class="form-group" :slot="size"
        :class="'c-content-font-size-height__' + size">
        <div class="d-flex">
          <vue-slide-bar v-model="options.content_font_size[size]" class="flex-grow-1" :max="500"></vue-slide-bar>
          <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
            v-model="options.content_font_size[size]" />
        </div>
      </div>
    </rwd-group>

    <!-- Content Line Height -->
    <rwd-group class-name="c-title-line-height">
      <label slot="label">
        內文行距
      </label>
      <div v-for="size of ['lg', 'md', 'xs']" class="form-group" :slot="size"
        :class="'c-content-line-height__' + size">
        <div class="d-flex">
          <vue-slide-bar v-model="options.content_line_height[size]" class="flex-grow-1" :max="500"></vue-slide-bar>
          <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
            v-model="options.content_line_height[size]" />
        </div>
      </div>
    </rwd-group>
  </div>

</template>

<script>
import TitleOptions from "../form/title-options";
import RwdGroup from "../form/rwd-group";
export default {
  name: "addon-text",
  components: { TitleOptions, RwdGroup },
  mixins: [LunaAddonMixin],
  data() {
    return {
      options: {
        content: '大哉乾元，萬物資始，山風蠱，山火賁，先天而天弗違，風澤中孚，水地比利見大人，雷天大壯，堅冰至，' +
          '風澤中孚，利永貞，元亨利貞，山天大畜天雷無妄，地澤臨，地山謙，履霜，水火既濟，水火既濟，利永貞聖人作，' +
          '積善之家，六二之動，風地觀，山澤損，賢人在下，火山旅必有餘慶，山水蒙，同氣相求，厚德載物，天風姤，風天小畜，' +
          '無咎無譽龍戰於野，雷水解，風從虎，天地否，地天泰，元亨利貞',
        content_font_size: {
          lg: '',
          md: '',
          xs: ''
        },
        content_line_height: {
          lg: '',
          md: '',
          xs: ''
        },
      }
    }
  }
}
</script>

<style scoped>

</style>
