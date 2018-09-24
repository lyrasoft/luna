/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(() => {
  Vue.component('title-options', {
    template: `
<div class="c-title-options">
    <div class="form-row">
        <div class="col-6">
            <!-- Title Element -->
            <div class="form-group">
                <label :for="id + 'title-element'">
                    標題元素
                </label>
                <select :id="id + 'title-element'"
                    v-model="options.title.element" class="form-control">
                    <option v-for="i of [1, 2, 3, 4, 5, 6]" :value="'h' + i">
                        h{{ i }}
                    </option>
                </select>
            </div>
        </div>
        <div class="col-6">
            <!-- Title Color -->
            <div class="form-group">
                <label :for="id + 'title-color'">標題顏色</label>
                <input :id="id + 'title-color'" type="text"
                    v-model.lazy="options.title.color" v-color class="form-control" />
            </div>
        </div>
    </div>

    <div class="form-row">
        <div class="col-6">
            <!-- Title Font Size -->
            <rwd-group class-name="c-title-font-size">
                <label slot="label">
                    標題字體大小
                </label>
                <div v-for="size of ['lg', 'md', 'xs']" class="form-group" :slot="size"
                    :class="'c-title-font-size__' + size">
                    <div class="d-flex">
                        <vue-slide-bar v-model="options.title.font_size[size]" class="flex-grow-1" :max="500"></vue-slide-bar>
                        <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                            v-model="options.title.font_size[size]" />
                    </div>
                </div>
            </rwd-group>
        </div>
        <div class="col-6">
            <!-- Title Font Weight -->
            <div class="form-group">
                <label>
                    標題字體粗細
                </label>
                <div class="d-flex" v-if="prepared">
                    <vue-slide-bar v-model="options.title.font_weight" class="flex-grow-1"
                        :data="['', 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000]"
                        :max="1000" :min="100"></vue-slide-bar>
                    <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                        v-model="options.title.font_weight" />
                </div>
            </div>
        </div>
    </div>

    <div class="form-row">
        <div class="col-6">
            <!-- Title Margin Top -->
            <rwd-group class-name="c-title-margin_top">
                <label slot="label">
                    標題上方間距 Margin Top
                </label>
                <div v-for="size of ['lg', 'md', 'xs']" class="form-group" :slot="size"
                    :class="'c-title-margin_top__' + size">
                    <input type="number" v-model="options.title.margin_top[size]" class="form-control" />
                </div>
            </rwd-group>
        </div>
        <div class="col-6">
            <!-- Title Margin Bottom -->
            <rwd-group class-name="c-title-margin_bottom">
                <label slot="label">
                    標題下方間距 Margin Bottom
                </label>
                <div v-for="size of ['lg', 'md', 'xs']" class="form-group" :slot="size"
                    :class="'c-title-margin_bottom__' + size">
                    <input type="number" v-model="options.title.margin_bottom[size]" class="form-control" />
                </div>
            </rwd-group>
        </div>
    </div>
</div>
    `,
    data() {
      return {
        options: {},
        prepared: false
      };
    },
    props: {
      id: String,
      value: Object
    },
    created() {
      this.options = this.value;
    },
    mounted() {
      // Set a delay time then show slider to fix bug
      setTimeout(() => {
        this.prepared = true;
      }, 150);
    },
    methods: {

    },
    watch: {
      options: {
        handler() {
          this.$emit('change', this.options);
          this.$emit('input', this.options);
        },
        deep: true
      }
    }
  });
});
