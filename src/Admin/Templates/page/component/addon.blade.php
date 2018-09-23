{{-- Part of earth project. --}}

<script id="addon-component-tmpl" type="text/template">
    <div class="card c-addon-instance move-handle" style="cursor: move;">
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
            </div>

            <div class="c-addon-instance__toolbar">
                <a href="javascript://" class="text-dark" @click="edit()">
                    <span class="fa fa-edit"></span>
                </a>
                <a href="javascript://" class="text-dark">
                    <span class="fa fa-copy"></span>
                </a>
            </div>
        </div>
    </div>
</script>
