<template>
  <div class="card c-addon-instance move-handle" style="cursor: move;" :disabled="content.disabled">
    <div class="card-body d-flex">
      <div class="c-addon-instance__icon">
        <span :class="content.icon"></span>
      </div>
      <div class="c-addon-instance__title ml-2">
        <h6 class="m-0">
          {{ 'name' | addonProp(content.type) }}
        </h6>
        <small class="text-muted">
          {{ options.label || options.title.text }}
        </small>

        <code v-if="debug" class="small">{{ content.id }}</code>
      </div>

      <div class="c-addon-instance__toolbar">
        <a href="#" class="text-dark" @click.prevent="edit()"
          v-if="!content.disabled">
          <span class="fa fa-fw fa-edit"></span>
        </a>
        <a href="#" class="text-dark"
          v-if="!content.disabled" @click.prevent="copy()">
          <span class="fa fa-fw fa-copy"></span>
        </a>
        <a href="#" class="text-dark" @click.prevent="toggleDisabled()">
          <span class="fa fa-fw" :class="[content.disabled ? 'fa-eye-slash' : 'fa-eye']"></span>
        </a>
        <a href="#" class="text-dark" @click.prevent="remove()">
          <span class="fa fa-fw fa-trash"></span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addon',

  data() {
    return {
      options: {}
    }
  },

  props: {
    content: Object,
    column: Object,
    index: Number
  },

  created() {
    this.options = this.content.options;
  },

  methods: {
    edit() {
      Phoenix.trigger('addon:edit', this.content, this.column);
    },

    toggleDisabled() {
      this.content.disabled = !this.content.disabled;
    },

    copy() {
      this.$emit('copy');
    },

    remove() {
      Phoenix.confirm('確定要刪除嗎?')
        .then(() => this.$emit('delete'));
    },

    addAddon() {
      Phoenix.trigger('addon:add', this.content);
    },

    deleteAddon(i) {
      this.addons.splice(i, 1);
    }
  },

  watch: {
    content: {
      handler() {
        this.options = this.content.options;
      },
      deep: true
    }
  },

  computed: {
    debug() {
      return Phoenix.isDebug();
    }
  }
};
</script>

<style scoped>

</style>
