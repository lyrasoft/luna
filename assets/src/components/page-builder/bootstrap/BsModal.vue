<script lang="ts" setup>
import { uid } from '@windwalker-io/unicorn-next';
import { Modal } from 'bootstrap';
import { onMounted, ref, watch, useSlots } from 'vue';

const props = withDefaults(
  defineProps<{
    id?: string,
    open?: boolean,
    size?: string,
    title?: string,
    backdrop?: string | boolean
  }>(),
  {
    open: false,
    backdrop: true
  }
);
const emits = defineEmits<{
  show: [Event],
  shown: [Event],
  hide: [Event],
  hidden: [Event]
}>();
const slots = useSlots();
const modal = ref<HTMLDivElement>();
const idName = ref(props.id || 'modal-' + uid());
const visible = ref(props.open);

watch(visible, (v, oldValue) => {
  if (!oldValue && v) {
    getModalInstance().show();
  }

  if (oldValue && !v) {
    getModalInstance().hide();
  }
});

watch(() => props.open, (v) => {
  visible.value = v;
});

watch(() => props.id, (val) => {
  idName.value = val || 'modal-' + uid();
});

onMounted(() => {
  if (!modal.value) {
    return;
  }

  modal.value.addEventListener('show.bs.modal', (e) => {
    emits('show', e);
  });

  modal.value.addEventListener('shown.bs.modal', (e) => {
    emits('shown', e);
  });

  modal.value.addEventListener('hide.bs.modal', (e) => {
    emits('hide', e);
  });

  modal.value.addEventListener('hidden.bs.modal', (e) => {
    emits('hidden', e);
  });
});

function getModalInstance() {
  return Modal.getOrCreateInstance(modal.value!);
}

function hasSlots(name: string) {
  return !!slots[name];
}
</script>

<template>
  <teleport to="body">
    <div ref="modal" class="modal fade" :id="idName"
      v-bind="$attrs"
      tabindex="-1"
      role="dialog"
      :aria-labelledby="idName + '-label'"
      :aria-hidden="visible ? 'true' : 'false'"
      :data-bs-backdrop="backdrop"
    >
      <div class="modal-dialog"
        role="document"
        :class="size ? 'modal-' + size : null">
        <div class="modal-content">
          <template v-if="visible">
            <template v-if="hasSlots('header-element')">
              <slot name="header-element"></slot>
            </template>
            <div v-else class="modal-header">
              <slot name="header">
                <div class="modal-title" :id="idName + '-label'">
                    <h4>{{ title }}</h4>
                </div>
              </slot>
              <button type="button" class="close btn-close" data-bs-dismiss="modal" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" class="visually-hidden">&times;</span>
              </button>
            </div>
          </template>
          <div v-if="visible" class="modal-body">
            <slot></slot>
          </div>
          <div v-if="visible && hasSlots('footer')" class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>

</style>
