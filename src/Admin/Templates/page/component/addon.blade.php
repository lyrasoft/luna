{{-- Part of earth project. --}}

<script id="addon-component-tmpl" type="text/template">
    <div class="card c-addon-instance move-handle" style="cursor: move;" :disabled="content.disabled">
        <div class="card-body d-flex">
            <div class="c-addon-instance__icon">
                <span :class="content.icon"></span>
            </div>
            <div class="c-addon-instance__title ml-2">
                <h6 class="m-0">
                    @{{ content.name }}
                </h6>
                <small class="text-muted">
                    @{{ options.label || options.title.text }}
                </small>

                @if (WINDWALKER_DEBUG)
                    <code class="small">@{{ content.id }}</code>
                @endif
            </div>

            <div class="c-addon-instance__toolbar">
                <a href="javascript://" class="text-dark" @click="edit()"
                    v-if="!content.disabled">
                    <span class="fa fa-fw fa-edit"></span>
                </a>
                <a href="javascript://" class="text-dark"
                    v-if="!content.disabled" @click="copy()">
                    <span class="fa fa-fw fa-copy"></span>
                </a>
                <a href="javascript://" class="text-dark" @click="toggleDisabled()">
                    <span class="fa fa-fw" :class="[content.disabled ? 'fa-eye-slash' : 'fa-eye']"></span>
                </a>
                <a href="javascript://" class="text-dark" @click="remove()">
                    <span class="fa fa-fw fa-trash"></span>
                </a>
            </div>
        </div>
    </div>
</script>
