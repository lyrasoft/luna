/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(() => {
  Vue.component('gradient', {
    template: `
<div class="c-box-offset">
    <div class="c-gradient-preview mb-3" style="height: 100px; border: 1px solid rgba(0, 0, 0, .2);" 
        :style="{'background-image': backgroundImage}">
    </div>

    <div class="form-row">
        <div class="col-6">
            <div class="form-group">
                <label :for="id + '-color1'">顏色 1</label>
                <input type="text" :id="id + '-color1'" v-model.lazy="gradient.start_color" v-color class="form-control" />
            </div>
            <div class="form-group">
                <label :for="id + '-color1-pos'">顏色 1 位置</label>
                <vue-slide-bar v-model="gradient.start_pos"></vue-slide-bar>
            </div>
        </div>
        <div class="col-6">
            <div class="form-group">
                <label :for="id + '-color2'">顏色 2</label>
                <input type="text" :id="id + '-color2'" v-model.lazy="gradient.end_color" v-color class="form-control" />
            </div>
            <div class="form-group">
                <label :for="id + '-color2-pos'">顏色 2 位置</label>
                <vue-slide-bar v-model="gradient.end_pos"></vue-slide-bar>
            </div>
        </div>
    </div>

    <div class="form-group">
        <label :for="id + '-type'">漸層模式</label>
        <select :id="id + '-type'" v-model.lazy="gradient.type" class="form-control">
            <option value="linear">線性 Linear</option>
            <option value="radial">放射 Radial</option>
        </select>
    </div>

    <div class="form-group">
        <label :for="id + '-angle'">角度</label>
        <div class="d-flex">
            <vue-slide-bar :id="id + '-angle'" class="flex-grow-1" v-model="gradient.angle" :max="360">
            </vue-slide-bar>
            <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                v-model="gradient.angle" />
        </div>
    </div>
</div>
    `,
    data() {
      return {
        gradient: {
          type: 'linear',
          angle: '0',
          start_color: '',
          start_pos: '0',
          end_color: '',
          end_pos: '100'
        }
      }
    },
    props: {
      id: String,
      value: Object
    },
    mounted() {
      // this.gradient = this.value;
    },
    methods: {
      updated() {
        this.$emit('change', this.gradient);
        this.$emit('input', this.gradient);
      }
    },
    watch: {
      gradient: {
        handler(gradient) {
          this.$emit('change', this.gradient);
          this.$emit('input', this.gradient);
        },
        deep: true
      }
    },
    computed: {
      backgroundImage() {
        const gradient = this.gradient;

        if (gradient.type === 'linear') {
          return `${gradient.type}-gradient(${gradient.angle}deg, ${gradient.start_color} ${gradient.start_pos}%, ` +
            `${gradient.end_color} ${gradient.end_pos}%)`;
        }

        return `${gradient.type}-gradient(${gradient.start_color} ${gradient.start_pos}%, ` +
          `${gradient.end_color} ${gradient.end_pos}%)`;
      }
    }
  });
});
