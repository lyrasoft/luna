{{-- Part of earth project. --}}

<script id="column-component-tmpl" type="text/template">
    <div class="column__wrapper">
        <div class="card column__body">
            <div class="column__top-bar d-flex card-header">
                <div class="column__title mb-2">
                    <div class="badge badge-secondary column-move-handle mr-2" style="cursor: move">
                        <span class="fa fa-fw fa-arrows-alt"></span>
                    </div>
                    Column: <code>@{{ content.id }}</code>
                </div>

                <div class="column__actions ml-auto">
                    <div class="dropdown">
                        <button href="javascript://" class="btn btn-mini btn-outline-secondary"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="fa fa-cog fa-fw"></span>
                        </button>

                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="javascript://" @click="edit()">選項</a>
                            <a class="dropdown-item" href="javascript://" @click="disable()">關閉</a>
                            <a class="dropdown-item" href="javascript://" @click="remove()">刪除</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                Column: <code>@{{ content.id }}</code>
            </div>
        </div>
    </div>
</script>
