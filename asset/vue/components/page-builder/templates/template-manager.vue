<template>
  <b-modal ref="tmpl-modal" title="模版" size="xl" hide-footer>
    <div class="c-template-manager">

      <div class="c-template-manager__items">
        <transition-group name="fade" class="row" style="animation-duration: .3s">
          <div v-for="(item, i) of items" class="col-md-6" :key="item.key">
            <div class="c-template-item card" @click.prevent="selected(item)" style="cursor: pointer;">
              <div class="c-template-item__preview card-img-top" :style="{ 'background-image': `url(${item.image})` }"></div>
              <div class="card-footer d-flex">
                <h5 class="mb-0 mr-2">
                  {{ item.title || 'No title' }}
                </h5>
                <div>
                  <div class="badge" :class="`badge-${badgeColor(item.type)}`">{{ item.type }}</div>
                </div>
                <div class="ml-auto">
                  <a href="#" class="text-dark" @click="remove(item, i)">
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
</template>

<script>
export default {
  name: 'template-manager',
  data() {
    return {
      items: [],
      loading: false,
      callback: null,
      type: '',
      i: 0
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
