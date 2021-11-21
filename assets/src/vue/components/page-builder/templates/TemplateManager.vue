<template>
  <div>
    <CModal :visible="tmplModalShow"
      :size="'xl'"
      @close="tmplModalShow = false"
    >
      <CModalHeader>
        <CModalTitle>
          Template
        </CModalTitle>
      </CModalHeader>
      <CModalBody class="c-template-manager">

        <div class="form-group mb-3 d-flex align-items-center">
          <span class="mr-2 me-2">
            Filter:
          </span>
          <ButtonRadio
            id="input-filter"
            color="primary"
            variant="outline"
            size="sm"
            class="mr-2 me-2"
            v-model="filter.type"
            :options="filterButtons"
          ></ButtonRadio>
          <div>
            <input type="search" placeholder="Search" v-model="q" class="form-control form-control-sm" />
          </div>
        </div>

        <div class="c-template-manager__items row">
          <transition-group name="fade">
            <div v-for="(item, i) of filteredItems" class="col-md-6" :key="item.id || item.key"
              :data-id="item.id"
              style="animation-duration: .3s">
              <div class="c-template-item card my-3" @click.prevent="selected(item)" style="cursor: pointer;">
                <div class="c-template-item__preview card-img-top" :style="{ 'background-image': `url(${item.image})` }"></div>
                <div class="card-footer">
                  <div class="d-flex">
                    <h5 class="mb-0 mr-2 me-2">
                      {{ item.title || 'No title' }}
                    </h5>
                    <div>
                      <div class="badge" :class="`bg-${badgeColor(item.type)}`">{{ item.type }}</div>
                    </div>
                    <div class="ml-auto ms-auto">
                      <a v-if="item.can_delete === true"
                        href="#" class="text-dark" @click.prevent.stop="remove(item, i)">
                        <span class="fa fa-trash"></span>
                        Delete
                      </a>
                    </div>
                  </div>
                  <div class="small mt-2">
                    {{ item.description || 'No description' }}
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>

        <div v-if="items.length === 0 && this.loading" class="d-flex justify-content-center py-5 my-5">
          <span class="spinner spinner-border"></span>
        </div>

      </CModalBody>
    </CModal>

    <!-- Save Modal -->
    <CModal :visible="saveModalShow" @close="saveModalShow = false">
      <CModalHeader>
        <CModalTitle>
          Save as Template
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div>
          Save as: <div class="badge" :class="`bg-${badgeColor(save.type)}`">{{ save.type }}</div>
        </div>
        <div class="form-group mb-3">
          <label for="input-tmpl-title">Title</label>
          <div>
            <input id="input-tmpl-title" type="text" class="form-control" v-model="save.title" />
          </div>
        </div>

        <div class="form-group mb-3">
          <label for="input-tmpl-description">Description</label>
          <div>
            <textarea id="input-tmpl-description" type="text"
              class="form-control"
              v-model="save.description"
              rows="3"
            />
          </div>
        </div>

        <div class="form-group mb-3">
          <label for="input-tmpl-image">Cover</label>
          <div>
            <SingleImage v-model="save.image" id="input-tmpl-image"></SingleImage>
          </div>

          <div class="form-group mb-3">
            <button type="button" class="btn btn-primary btn-block"
              :disabled="save.loading"
              @click="saveContent">
              <span :class="save.loading ? 'spinner-border spinner-border-sm' : 'fa fa-save'"></span>
              Save
            </button>
          </div>
        </div>
      </CModalBody>
    </CModal>

  </div>
</template>

<script>
import SingleImage from '@/components/page-builder/form/SingleImage';
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/vue';
import ButtonRadio from '@/components/page-builder/form/ButtonRadio';
import { computed, reactive, ref, toRefs } from 'vue';
import { toFormData } from '../../../services/page-builder/page-builder.service';
export default {
  name: 'TemplateManager',
  components: {
    SingleImage,
    ButtonRadio,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
  },
  setup(props, { emit }) {
    const state = reactive({
      q: '',
      filter: {
        type: '',
      },
      items: [],
      loading: false,
      callback: null,
      type: '',
      i: 0,
      save: {
        id: null,
        type: null,
        title: '',
        description: '',
        image: '',
        content: null,
        loading: false
      },
    });

    const tmplModalShow = ref(false);
    const saveModalShow = ref(false);

    function open(callback, type, i) {
      state.callback = callback;
      state.type = type;
      state.i = i;
      state.filter.type = '';
      loadItems();

      tmplModalShow.value = true;
    }
    function loadItems() {
      state.loading = true;
      state.items = [];

      return u.$http.get(
          u.route('@page_ajax', { task: 'getTemplates', type: state.type })
        )
        .then((res) => {
          state.items = res.data.data.map(item => {
            item.key = u.uid();
            return item;
          });
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          state.loading = false;
        });
    }

    function selected(item) {
      tmplModalShow.value = false;
      state.callback(item, state.type, state.i);

      emit('selected', item, state.type, state.i);

      state.callback = null;
      state.type = null;
      state.i = null;
    }

    function remove(item, i) {
      return u.$http.post(
          '@page_ajax/removeTemplate',
          { id: item.id }
        )
        .then((res) => {
          state.items.splice(i, 1);
        })
        .catch((e) => {
          u.alert(e.statusText, '', 'warning');
        })
        .finally(() => {

        });
    }

    function badgeColor(type) {
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

    function saveContent() {
      state.save.loading = true;

      return u.$http.post(
          '@page_ajax/saveTemplate',
          toFormData(
            {
              id: state.save.id,
              type: state.save.type,
              image: state.save.image,
              title: state.save.title,
              description: state.save.description,
              content: JSON.stringify(this.save.content)
            }
          )
        )
        .then((res) => {
          saveModalShow.value = false;
          resetSaveData();
        })
        .catch((e) => {
          u.alert(e.statusText, '', 'warning');
        })
        .finally(() => {
          state.save.loading = false;
        });
    }

    function openSave(content, type) {
      resetSaveData();

      state.save.type = type;
      state.save.content = content;

      saveModalShow.value = true;
    }

    function resetSaveData() {
      state.save.type = null;
      state.save.content = null;
      state.save.image = '';
      state.save.title = '';
    }

    const filterButtons = computed(() => {
      let types = state.type ? state.type.split(',').map(type => type.trim()) : [];

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
    });

    const filteredItems = computed(() => {
      return state.items.filter((item) => {
        if (state.filter.type && item.type !== state.filter.type) {
          return false;
        }

        if (state.q !== '') {
          if (item.title.toUpperCase().indexOf(state.q.toUpperCase()) !== -1) {
            return true;
          }

          if (item.description && item.description.toUpperCase().indexOf(state.q.toUpperCase()) !== -1) {
            return true;
          }

          return false;
        }

        return true;
      });
    });

    return {
      ...toRefs(state),
      tmplModalShow,
      saveModalShow,
      filterButtons,
      filteredItems,

      open,
      selected,
      remove,
      badgeColor,
      saveContent,
      openSave,
      resetSaveData
    };
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
