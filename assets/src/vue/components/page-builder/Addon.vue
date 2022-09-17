<template>
  <div class="card c-addon-instance border-2 move-handle" style="cursor: move;" :disabled="content.disabled ? true : null">
    <div class="card-body d-flex">
      <div class="c-addon-instance__icon">
        <span :class="content.icon"></span>
      </div>
      <div class="c-addon-instance__title ms-2">
        <h6 class="m-0">
          {{ addonProp('name', content.type) }}
        </h6>
        <small class="text-muted">
          {{ options.label || options.title.text }}
        </small>

        <code v-if="debug" class="small">{{ content.id }}</code>
      </div>

      <div class="c-addon-instance__toolbar">
        <a href="#" class="text-dark"
          v-tooltip
          title="Edit"
          @click.prevent="edit()"
          v-if="!content.disabled">
          <span class="fa fa-fw fa-edit"></span>
        </a>
        <a href="#" class="text-dark"
          v-tooltip
          title="Duplicate"
          v-if="!content.disabled" @click.prevent="duplicate()">
          <span class="fa fa-fw fa-clone"></span>
        </a>
        <a href="#" class="text-dark"
          v-tooltip
          title="Copy"
          v-if="!content.disabled" @click.prevent="copy()">
          <span class="fa fa-fw fa-copy"></span>
        </a>
        <a href="#" class="text-dark"
          v-if="content.disabled"
          v-tooltip
          title="Enable"
          @click.prevent="toggleDisabled($event)">
          <span class="fa fa-fw fa-eye-slash"></span>
        </a>
        <a href="#" class="text-dark"
          v-else
          v-tooltip
          title="Disable"
          @click.prevent="toggleDisabled($event)">
          <span class="fa fa-fw fa-eye"></span>
        </a>

        <div class="dropdown d-inline-block">
          <button
            type="button"
            class="btn btn-link btn-mini p-0 d-inline-block"
            data-bs-toggle="dropdown"
          >
            <span class="fa fa-fw fa-gear text-dark"></span>
          </button>
          <div class="dropdown-menu dropdown-menu-end dropdown-menu-right"
            >
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

<script>
import { emptyRow, addTextToClipboard, readClipboard } from '@/services/page-builder/page-builder.service';
import { computed, reactive, watch, toRefs } from 'vue';

export default {
  name: 'addon',
  components: {
  },
  props: {
    content: Object,
    column: Object,
    index: Number
  },

  setup(props, { emit }) {
    const state = reactive({
      options: {}
    });

    state.options = props.content.options;

    function edit() {
      u.trigger('addon:edit', props.content, props.column);
    }

    function toggleDisabled(e) {
      const button = e.currentTarget;

      const tt = bootstrap.Tooltip.getInstance(button);

      tt.hide();

      props.content.disabled = !props.content.disabled;
    }

    function copy() {
      addTextToClipboard(props.content);
    }

    function duplicate() {
      emit('duplicate');
    }

    function remove() {
      u.confirm('Are you sure to delete it?')
        .then(() => emit('delete'));
    }

    // function addAddon() {
    //   u.trigger('addon:add', props.content);
    // }
    //
    // function deleteAddon(i) {
    //   this.addons.splice(i, 1);
    // }

    watch(() => props.content, () => {
      state.options = props.content.options;
    }, { deep: true });

    const debug = computed(() => {
      return u.isDebug();
    });

    return {
      ...toRefs(state),
      debug,

      edit,
      toggleDisabled,
      copy,
      duplicate,
      remove,
      // addAddon,
      // deleteAddon,
    }
  },
};
</script>

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
