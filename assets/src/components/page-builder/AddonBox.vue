<script lang="ts" setup>
import { deleteConfirm, useUnicorn } from '@windwalker-io/unicorn-next';
import { Tooltip } from 'bootstrap';
import { defineEmits, defineProps, ref, watch } from 'vue';
import { usePageBuilderUtilities } from '~luna/composables/usePageBuilderUtilities';
import { Addon, AddonOptions, Column } from '~luna/types';

const { addTextToClipboard } = usePageBuilderUtilities();

const props = defineProps<{
  content: Addon;
  column: Column;
  index: number;
}>();
const emits = defineEmits<{
  duplicate: [];
  delete: [];
}>();
const u = useUnicorn();

const options = ref<AddonOptions>(props.content.options);

function edit() {
  u.trigger('addon:edit', props.content, props.column);
}

function toggleDisabled(e: MouseEvent) {
  const button = e.currentTarget as HTMLElement & { blur: () => void };

  const tt = Tooltip.getOrCreateInstance(button);
  tt.hide();

  button.blur();
  props.content.disabled = !props.content.disabled;
}

function copy() {
  addTextToClipboard(props.content);
}

function duplicate() {
  emits('duplicate');
}

async function remove() {
  const v = await deleteConfirm('Are you sure you want to delete??');
  if (v) {
    emits('delete');
  }
  return v;
}

watch(() => props.content, () => {
  options.value = props.content.options;
}, { deep: true });
</script>

<template>
  <div class="card c-addon-instance border-2 move-handle" style="cursor: move;"
    :disabled="content.disabled ? true : null">
    <div class="card-body d-flex">
      <div class="c-addon-instance__icon">
        <span :class="content.icon"></span>
      </div>
      <div class="c-addon-instance__title ms-2">
        <h6 class="m-0">
          {{ addonProp('name', content.type) }}
        </h6>
        <small class="text-muted">
          {{ options.label || options.title?.text }}
        </small>
        <code v-if="$debug" class="small">{{ content.id }}</code>
      </div>
      <div class="c-addon-instance__toolbar">
        <a href="#" class="text-dark"
          v-tooltip
          title="Edit"
          @click.prevent="edit"
          v-if="!content.disabled">
          <span class="fa fa-fw fa-edit"></span>
        </a>
        <a href="#" class="text-dark"
          v-tooltip
          title="Duplicate"
          v-if="!content.disabled" @click.prevent="duplicate">
          <span class="fa fa-fw fa-clone"></span>
        </a>
        <a href="#" class="text-dark"
          v-tooltip
          title="Copy"
          v-if="!content.disabled" @click.prevent="copy">
          <span class="fa fa-fw fa-copy"></span>
        </a>
        <a href="#" class="text-dark"
          v-if="content.disabled"
          v-tooltip
          title="Enable"
          @click.prevent="toggleDisabled">
          <span class="fa fa-fw fa-eye-slash"></span>
        </a>
        <a href="#" class="text-dark"
          v-else
          v-tooltip
          title="Disable"
          @click.prevent="toggleDisabled">
          <span class="fa fa-fw fa-eye"></span>
        </a>
        <div class="dropdown d-inline-block">
          <button
            type="button"
            class="btn btn-link btn-mini p-0 d-inline-block"
            data-toggle="dropdown"
            data-bs-toggle="dropdown"
          >
            <span class="fa fa-fw fa-gear text-dark"></span>
          </button>
          <div class="dropdown-menu dropdown-menu-end dropdown-menu-right">
            <button type="button" class="dropdown-item" @click="$trigger('tmpl.save', content, 'addon')">
              <span class="fa fa-fw fa-save"></span>
              Save as Template
            </button>
            <button type="button" class="dropdown-item" @click="remove">
              <span class="fa fa-fw fa-trash"></span>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.c-addon-instance {
  position: relative;

  &__toolbar {
    position: absolute;
    top: .5rem;
    right: .5rem;
  }
}
</style>
