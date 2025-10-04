<script lang="ts" setup>
import { simpleAlert, uid, useHttpClient } from '@windwalker-io/unicorn-next';
import { TemplateCallback, TemplateItem } from '~luna/types';
import BsModal from '~luna/components/page-builder/bootstrap/BsModal.vue';
import SingleImage from '~luna/components/page-builder/form/SingleImage.vue';
import ButtonRadio from '~luna/components/page-builder/form/ButtonRadio.vue';
import { computed, ref } from 'vue';
import { usePageBuilderUtilities } from '~luna/services/page-builder/usePageBuilderUtilities';
import { useLoading } from '@lyrasoft/ts-toolkit/vue';

const { toFormData } = usePageBuilderUtilities();
const emits = defineEmits<{
  selected: Parameters<TemplateCallback>;
}>();

const q = ref('');
const filterType = ref('');
const items = ref<TemplateItem[]>([]);
const callback = ref<TemplateCallback>();
const type = ref('');
const i = ref(0);
const saveData = ref<{
  id: number | null;
  type: string | null;
  title: string;
  description: string;
  image: string;
  content: any;
}>({
  id: null,
  type: null,
  title: '',
  description: '',
  image: '',
  content: null,
});

const { loading, wrap } = useLoading();
const { loading: saving, wrap: wrapSave } = useLoading();

const tmplModalShow = ref(false);
const saveModalShow = ref(false);

function open(cb: TemplateCallback, t: string, idx: number) {
  callback.value = cb;
  type.value = t;
  i.value = idx;
  filterType.value = '';
  loadItems();
  tmplModalShow.value = true;
}

const loadItems = wrap(async () => {
  items.value = [];

  const { get } = await useHttpClient();

  try {
    let res = await get(`@page_ajax/getTemplate?type=${type.value}`);
    items.value = res.data.data.map((item: TemplateItem) => {
      item.key = uid();
      return item;
    });
  } catch (e) {
    console.error(e);
  }
});

function selected(item: TemplateItem) {
  tmplModalShow.value = false;

  if (callback.value) {
    callback.value(item, type.value, i.value);
  }

  emits('selected', item, type.value, i.value);

  callback.value = undefined;
  type.value = '';
  i.value = 0;
}

async function remove(item: any, idx: number) {
  const { post, isAxiosError } = await useHttpClient();

  try {
    await post(
      '@page_ajax/removeTemplate',
      { id: item.id }
    );
    items.value.splice(idx, 1);
  } catch (e) {
    if (isAxiosError(e)) {
      simpleAlert(e.message, '', 'warning');
    }
  }
}

function badgeColor(t: string) {
  switch (t) {
    case 'page': return 'dark';
    case 'row': return 'primary';
    case 'column': return 'warning';
    case 'addon': return 'danger';
  }
}

const saveContent = wrapSave(async () => {
  const { post, isAxiosError } = await useHttpClient();

  try {
    await post(
      '@page_ajax/saveTemplate',
      toFormData({
        id: saveData.value.id,
        type: saveData.value.type,
        image: saveData.value.image,
        title: saveData.value.title,
        description: saveData.value.description,
        content: JSON.stringify(saveData.value.content)
      })
    );
    saveModalShow.value = false;
    resetSaveData();
  } catch (e) {
    if (isAxiosError(e)) {
      simpleAlert(e.response?.statusText || e.message, '', 'warning');
    }

    console.error(e);
  }
});

function openSave(content: any, t: string) {
  resetSaveData();
  saveData.value.type = t;
  saveData.value.content = content;
  saveModalShow.value = true;
}

function resetSaveData() {
  saveData.value.type = null;
  saveData.value.content = null;
  saveData.value.image = '';
  saveData.value.title = '';
}

const filterButtons = computed(() => {
  let types = type.value ? type.value.split(',').map((t: string) => t.trim()) : [];
  const options = [ { text: 'All', value: '' } ];
  types.forEach((t: string) => {
    options.push({ text: t, value: t });
  });
  return options;
});

const filteredItems = computed(() => {
  return items.value.filter((item: any) => {
    if (filterType.value && item.type !== filterType.value) return false;
    if (q.value !== '') {
      if (item.title?.toUpperCase().indexOf(q.value.toUpperCase()) !== -1) return true;
      if (item.description && item.description.toUpperCase().indexOf(q.value.toUpperCase()) !== -1) return true;
      return false;
    }
    return true;
  });
});

defineExpose({
  open,
  openSave
})
</script>

<template>
  <div>
    <BsModal :open="tmplModalShow"
      title="Template"
      :size="'xl'"
      @hidden="tmplModalShow = false"
      class-name="c-template-manager"
    >
      <div class="form-group mb-3 d-flex align-items-center">
          <span class="me-2">
            Filter:
          </span>
        <ButtonRadio
          id="input-filter"
          color="primary"
          variant="outline"
          size="sm"
          class="me-2"
          v-model="filterType"
          :options="filterButtons"
        ></ButtonRadio>
        <div>
          <input type="search" placeholder="Search" v-model="q" class="form-control form-control-sm" />
        </div>
      </div>

      <div class="c-template-manager__items row">
        <transition-group name="fade">
          <div v-for="(item, idx) of filteredItems" class="col-md-6" :key="item.id || item.key"
            :data-id="item.id"
            style="animation-duration: .3s">
            <div class="c-template-item card my-3" @click.prevent="selected(item)" style="cursor: pointer;">
              <div class="c-template-item__preview card-img-top" :style="{ 'background-image': `url(${item.image})` }"></div>
              <div class="card-footer">
                <div class="d-flex">
                  <h5 class="mb-0 me-2">
                    {{ item.title || 'No title' }}
                  </h5>
                  <div>
                    <div class="badge" :class="`bg-${badgeColor(item.type)}`">{{ item.type }}</div>
                  </div>
                  <div class="ml-auto ms-auto">
                    <a v-if="item.can_delete === true"
                      href="#" class="text-dark" @click.prevent.stop="remove(item, idx)">
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

      <div v-if="items.length === 0 && loading" class="d-flex justify-content-center py-5 my-5">
        <span class="spinner spinner-border"></span>
      </div>
    </BsModal>

    <!-- Save Modal -->
    <BsModal :open="saveModalShow" @hidden="saveModalShow = false"
      title="Save as Template">
      <div>
        Save as: <div class="badge" :class="`bg-${badgeColor(saveData.type!)}`">{{ saveData.type }}</div>
      </div>
      <div class="form-group mb-3">
        <label for="input-tmpl-title">Title</label>
        <div>
          <input id="input-tmpl-title" type="text" class="form-control" v-model="saveData.title" />
        </div>
      </div>

      <div class="form-group mb-3">
        <label for="input-tmpl-description">Description</label>
        <div>
            <textarea id="input-tmpl-description" type="text"
              class="form-control"
              v-model="saveData.description"
              rows="3"
            />
        </div>
      </div>

      <div class="form-group mb-3">
        <label for="input-tmpl-image">Cover</label>
        <div>
          <SingleImage v-model="saveData.image" id="input-tmpl-image"></SingleImage>
        </div>

        <div class="form-group mb-3">
          <button type="button" class="btn btn-primary btn-block"
            :disabled="saving"
            @click="saveContent">
            <span :class="saving ? 'spinner-border spinner-border-sm' : 'fa fa-save'"></span>
            Save
          </button>
        </div>
      </div>
    </BsModal>

  </div>
</template>

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
