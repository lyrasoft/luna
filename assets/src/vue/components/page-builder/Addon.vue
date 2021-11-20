<template>
  <div class="card c-addon-instance move-handle" style="cursor: move;" :disabled="content.disabled ? true : null">
    <div class="card-body d-flex">
      <div class="c-addon-instance__icon">
        <span :class="content.icon"></span>
      </div>
      <div class="c-addon-instance__title ml-2 ms-2">
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
          v-c-tooltip.hover="'Edit'"
          @click.prevent="edit()"
          v-if="!content.disabled">
          <span class="fa fa-fw fa-edit"></span>
        </a>
        <a href="#" class="text-dark"
          v-c-tooltip="'Duplicate'"
          v-if="!content.disabled" @click.prevent="duplicate()">
          <span class="fa fa-fw fa-clone"></span>
        </a>
        <a href="#" class="text-dark"
          v-c-tooltip="'Copy'"
          v-if="!content.disabled" @click.prevent="copy()">
          <span class="fa fa-fw fa-copy"></span>
        </a>
        <a href="#" class="text-dark"
          v-c-tooltip.hover="content.disabled ? 'Enabled' : 'Disabled'"
          @click.prevent="toggleDisabled()">
          <span class="fa fa-fw" :class="[content.disabled ? 'fa-eye-slash' : 'fa-eye']"></span>
        </a>

        <CDropdown
          right
          toggle-class="px-0"
          @click="openTemplates(content.length)">
          <CDropdownToggle
            varient="link"
            class="p-0 d-inline-block"
            :caret="false"
          >
            <span class="fa fa-fw fa-gear text-dark"></span>
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem @click="$trigger('tmpl.save', content, 'addon')">
              <span class="fa fa-fw fa-save"></span>
              Save as Template
            </CDropdownItem>
            <CDropdownItem @click="remove">
              <span class="fa fa-fw fa-trash"></span>
              Delete
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </div>
    </div>
  </div>
</template>

<script>
import {
  vctooltip,
  CDropdown,
  CDropdownItem,
  CDropdownToggle,
  CDropdownMenu,
} from '@coreui/vue';
import { emptyRow, addTextToClipboard, readClipboard } from '../../services/page-builder/page-builder.service';
import { computed, reactive, watch, toRefs } from 'vue';

export default {
  name: 'addon',

  components: {
    CDropdown,
    CDropdownItem,
    CDropdownToggle,
    CDropdownMenu,
  },
  directives: {
    'c-tooltip': vctooltip
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

    function toggleDisabled() {
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
