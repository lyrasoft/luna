<template>
  <div>
    <b-modal ref="tmpl-modal" title="模版" size="xl" hide-footer>
      <div class="c-template-manager">

        <div class="form-group d-flex">
          <span class="mr-2">
            過濾:
          </span>
          <b-form-radio-group
            id="input-filter"
            buttons
            button-variant="outline-primary"
            size="sm"
            v-model="filter.type"
            :options="filterButtons"
          ></b-form-radio-group>
        </div>

        <div class="c-template-manager__items">
          <transition-group name="fade" class="row">
            <div v-for="(item, i) of filteredItems" class="col-md-6" :key="item.key"
              style="animation-duration: .3s">
              <div class="c-template-item card my-3" @click.prevent="selected(item)" style="cursor: pointer;">
                <div class="c-template-item__preview card-img-top" :style="{ 'background-image': `url(${item.image})` }"></div>
                <div class="card-footer d-flex">
                  <h5 class="mb-0 mr-2">
                    {{ item.title || 'No title' }}
                  </h5>
                  <div>
                    <div class="badge" :class="`badge-${badgeColor(item.type)}`">{{ item.type }}</div>
                  </div>
                  <div class="ml-auto">
                    <a v-if="item.can_delete"
                      href="#" class="text-dark" @click.prevent.stop="remove(item, i)">
                      <span class="fa fa-trash"></span>
                      刪除
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>

        <div v-if="items.length === 0 && this.loading" class="d-flex justify-content-center py-5 my-5">
          <span class="spinner spinner-border"></span>
        </div>

      </div>
    </b-modal>


    <b-modal ref="save-modal" title="儲存為模版" hide-footer>
      <div>
        <div>
          儲存格式: <div class="badge" :class="`badge-${badgeColor(save.type)}`">{{ save.type }}</div>
        </div>
        <div class="form-group">
          <label for="input-tmpl-title">標題</label>
          <div>
            <input id="input-tmpl-title" type="text" class="form-control" v-model="save.title" />
          </div>
        </div>

        <div class="form-group">
          <label for="input-tmpl-image">圖片</label>
          <div>
            <single-image v-model="save.image" id="input-tmpl-image"></single-image>
          </div>

          <div class="form-group">
            <button type="button" class="btn btn-primary btn-block"
              :disabled="save.loading"
              @click="saveContent">
              <span :class="save.loading ? 'spinner-border spinner-border-sm' : 'fa fa-save'"></span>
              儲存
            </button>
          </div>
        </div>
      </div>
    </b-modal>

  </div>
</template>

<script>
import SingleImage from '../form/single-image';
export default {
  name: 'template-manager',
  components: { SingleImage },
  data() {
    return {
      filter: {
        type: '',
      },
      items: [],
      loading: false,
      callback: null,
      type: '',
      i: 0,
      save: {
        type: null,
        title: '',
        image: '',
        content: null,
        loading: false
      }
    };
  },
  created() {
    //
  },
  methods: {
    open(callback, type, i) {
      this.callback = callback;
      this.type = type;
      this.i = i;
      this.filter.type = '';
      this.loadItems();

      this.$refs['tmpl-modal'].show();
    },
    loadItems() {
      this.loading = true;
      this.items = [];

      Phoenix.Ajax.get(
        Phoenix.route('page_ajax', { task: 'getTemplates', type: this.type })
        )
        .done((res) => {
          this.items = res.data.map(item => {
            item.key = Phoenix.uniqid();
            return item;
          });
        })
        .fail((e) => {
          console.error(e);
        })
        .always(() => {
          this.loading = false;
        });
    },

    selected(item) {
      this.$refs['tmpl-modal'].hide();
      this.callback(item, this.type, this.i);

      this.$emit('selected', item, this.type, this.i);

      this.callback = null;
      this.type = null;
      this.i = null;
    },

    remove(item, i) {
      Phoenix.Ajax.post(
        Phoenix.route('page_ajax', { task: 'removeTemplate' }),
        {
          title: item.title
        }
      )
        .done((res) => {
          this.items.splice(i, 1);
        })
        .fail((e) => {
          swal(e.statusText, '', 'warning');
        })
        .always(() => {

        });
    },

    badgeColor(type) {
      switch (type) {
        case 'page':
          return 'dark';
        case 'row':
          return 'primary';
        case 'column':
          return 'warning';
        case 'addon':
          return 'danger';
      }
    },

    saveContent() {
      this.save.loading = true;

      Phoenix.Ajax.post(
        Phoenix.route('page_ajax', { task: 'saveTemplate' }),
        {
          type: this.save.type,
          image: this.save.image,
          title: this.save.title,
          content: JSON.stringify(this.save.content)
        }
      )
        .done((res) => {
          this.$refs['save-modal'].hide();
          this.resetSaveData();
        })
        .fail((e) => {
          swal(e.statusText, '', 'warning');
        })
        .always(() => {
          this.save.loading = false;
        });
    },

    openSave(content, type) {
      this.resetSaveData();

      this.save.type = type;
      this.save.content = content;

      this.$refs['save-modal'].show();
    },

    resetSaveData() {
      this.save.type = null;
      this.save.content = null;
      this.save.image = '';
      this.save.title = '';
    }
  },

  computed: {
    filterButtons() {
      let types = this.type.split(',').map(type => type.trim());

      const options = [
        { text: 'All', value: '' },
      ];

      types.forEach((type) => {
        options.push({
          text: type,
          value: type
        });
      });

      return options;
    },

    filteredItems() {
      if (!this.filter.type) {
        return this.items;
      }

      return this.items.filter(item => item.type === this.filter.type);
    }
  }
};
</script>

<style scoped lang="scss">
  .c-template-item {
    transition: all .3s;
    &:hover {
      opacity: .85;
    }

    &__preview {
      width: 100%;
      padding-top: 50%;
      background: no-repeat center center;
      background-size: cover;
    }
  }
</style>
