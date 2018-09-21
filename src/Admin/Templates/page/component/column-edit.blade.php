{{-- Part of earth project. --}}

<column-edit id="column-edit-component-tmpl" inline-template ref="columnEdit">
    <div class="modal fade" id="column-edit-modal" tabindex="-1" role="dialog" aria-labelledby="column-edit-modal-label" aria-hidden="true"
        ref="modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="column-edit-modal-label">欄選項</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h1>Hello</h1>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close()">Close</button>
                    <button type="button" class="btn btn-primary" @click="save()">Save</button>
                </div>
            </div>
        </div>
    </div>
</column-edit>
