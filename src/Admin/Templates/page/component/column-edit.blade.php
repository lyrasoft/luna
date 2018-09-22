{{-- Part of earth project. --}}

<column-edit inline-template ref="columnEdit">
    <div>
        <div class="modal fade" id="column-edit-modal" tabindex="-1" role="dialog" aria-labelledby="column-edit-modal-label"
            data-backdrop="static"
            aria-hidden="true" ref="modal">
            <div class="modal-dialog modal-lg" role="document">
                <h5 id="column-edit-modal-label" class="modal-title text-light mb-3">
                    欄選項
                </h5>

                <div class="modal-content">
                    <div class="modal-header pb-0">
                        <ul class="nav nav-tabs border-0">
                            <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" href="#column-edit-general" ref="generalTab">
                                    基本選項
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#column-edit-rwd">
                                    Responsive
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#column-edit-animation">
                                    動畫
                                </a>
                            </li>
                        </ul>
                        <button type="button" class="close" @click="close()" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" v-if="values.id">
                        <div class="tab-content" id="column-edit-tab-content">
                            {{-- Tab General --}}
                            <div class="tab-pane fade show active" id="column-edit-general" role="tabpanel" aria-labelledby="column-edit-general-tab">

                                {{-- Text Color --}}
                                <div class="form-group">
                                    <label for="input-column-edit-text-color">文字顏色</label>
                                    <input id="input-column-edit-text-color" type="text"
                                        v-model.lazy="options.text_color" v-color class="form-control" />
                                </div>

                                {{-- Background Toggler --}}
                                <div class="form-group">
                                    <label for="input-column-edit-background">背景樣式</label>
                                    <div class="mt-2">
                                        <radio-buttons v-model="options.background.type" class="btn-block">
                                            <radio-button value="none">
                                                無
                                            </radio-button>
                                            <radio-button value="color">
                                                顏色
                                            </radio-button>
                                            <radio-button value="image">
                                                圖片
                                            </radio-button>
                                            <radio-button value="gradient">
                                                漸層
                                            </radio-button>
                                        </radio-buttons>
                                    </div>
                                </div>

                                {{-- BG Color --}}
                                <transition name="fade">
                                    <div class="form-group" v-if="['color', 'image'].indexOf(options.background.type) !== -1">
                                        <label for="input-column-edit-bg-color">背景顏色</label>
                                        <input id="input-column-edit-bg-color" type="text"
                                            v-model.lazy="options.background.color" v-color class="form-control" />
                                    </div>
                                </transition>

                                <transition name="fade">
                                    <div v-if="['image'].indexOf(options.background.type) !== -1">
                                        {{-- BG Image --}}
                                        <div class="form-group">
                                            <label for="input-column-edit-bg-image">背景圖片</label>
                                            <input id="input-column-edit-bg-image" type="text"
                                                v-model="options.background.image.url" class="form-control" />
                                        </div>

                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="input-column-edit-bg-overlay">背景顏色覆蓋</label>
                                                <input id="input-column-edit-bg-overlay" type="text"
                                                    v-model.lazy="options.background.image.overlay" v-color class="form-control" />
                                            </div>

                                            <div class="form-group col-md-6">
                                                <label for="input-column-edit-bg-repeat">Background Repeat</label>
                                                <select id="input-column-edit-bg-repeat"
                                                    v-model.lazy="options.background.image.repeat" class="form-control">
                                                    <option value="no-repeat">No Repeat</option>
                                                    <option value="">Repeat All</option>
                                                    <option value="repeat-x">Repeat X</option>
                                                    <option value="repeat-y">Repeat Y</option>
                                                    <option value="inherit">Inherit</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="input-column-edit-bg-attachment">Background Attachment</label>
                                                <select id="input-column-edit-bg-attachment"
                                                    v-model.lazy="options.background.image.attachment" class="form-control">
                                                    <option value="fixed">Fixed</option>
                                                    <option value="scroll">Scroll</option>
                                                    <option value="inherit">Inherit</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-md-6">
                                                <label for="input-column-edit-bg-position">Background Position</label>
                                                <select id="input-column-edit-bg-position"
                                                    v-model.lazy="options.background.image.position" class="form-control">
                                                    <option value="left top">Left Top</option>
                                                    <option value="left center">Left Center</option>
                                                    <option value="left bottom">Left Bottom</option>
                                                    <option value="center top">Center Top</option>
                                                    <option value="center center">Center Center</option>
                                                    <option value="center bottom">Center Bottom</option>
                                                    <option value="right top">Right Top</option>
                                                    <option value="right center">Right Center</option>
                                                    <option value="right bottom">Right Bottom</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </transition>

                                <transition name="fade">
                                    <gradient v-if="options.background.type === 'gradient'" v-model="options.background.gradient"
                                        id="column-edit-gradient">

                                    </gradient>
                                </transition>

                                {{-- Middle Align --}}
                                <div class="form-group">
                                    <label for="input-column-edit-valign">垂直置中</label>
                                    <div>
                                        <phoenix-switch name="column-edit-align-middle" v-model="options.valign"
                                            id="input-column-edit-valign"
                                            shape="circle"
                                            color="success"
                                            true-value="middle" false-value="top"></phoenix-switch>
                                    </div>
                                </div>

                                <hr />

                                {{-- Padding --}}
                                <box-offset v-model="options.padding">
                                    <span slot="label">Padding</span>
                                </box-offset>

                                {{-- Margin --}}
                                <box-offset v-model="options.margin">
                                    <span slot="label">Margin</span>
                                </box-offset>

                                <hr />

                                {{-- Border --}}
                                <div class="form-group">
                                    <label for="input-column-edit-border-enabled">使用框線 Border</label>
                                    <div>
                                        <phoenix-switch name="column-edit-border-enabled" v-model="options.border.enabled"
                                            id="input-column-edit-border-enabled"
                                            shape="circle"
                                            color="success"></phoenix-switch>
                                    </div>
                                </div>

                                <div v-if="options.border.enabled == 1">
                                    {{-- Border Width --}}
                                    <rwd-group class-name="c-border-width">
                                        <label slot="label">
                                            Border Width
                                        </label>
                                        <div v-for="size of ['lg', 'md', 'xs']" class="form-group" :slot="size"
                                            :class="'c-border-width__' + size">
                                            <div class="d-flex">
                                                <vue-slide-bar v-model="options.border.width[size]" class="flex-grow-1"></vue-slide-bar>
                                                <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                                                    v-model="options.border.width[size]" />
                                            </div>
                                        </div>
                                    </rwd-group>

                                    {{-- Border Color --}}
                                    <div class="form-group">
                                        <label for="input-column-edit-border-color">Border Color</label>
                                        <input id="input-column-edit-border-color" type="text"
                                            v-model.lazy="options.border.color" v-color class="form-control" />
                                    </div>

                                    {{-- Border Style --}}
                                    <div class="form-group">
                                        <label for="input-column-edit-border-style">Border Style</label>
                                        <select id="input-column-edit-border-style"
                                            v-model="options.border.style" class="form-control">
                                            <option value="">None</option>
                                            <option value="solid">Solid</option>
                                            <option value="dotted">Dotted</option>
                                            <option value="dashed">Dashed</option>
                                            <option value="double">Double</option>
                                            <option value="groove">Groove</option>
                                            <option value="ridge">Ridge</option>
                                        </select>
                                    </div>
                                </div>

                                {{-- Border Radius --}}
                                <rwd-group class-name="c-border-radius">
                                    <label slot="label">
                                        圓角 Border Radius
                                    </label>
                                    <div v-for="size of ['lg', 'md', 'xs']" class="form-group" :slot="size"
                                        :class="'c-border-radius__' + size">
                                        <div class="d-flex">
                                            <vue-slide-bar v-model="options.border.radius[size]" class="flex-grow-1" :max="500"></vue-slide-bar>
                                            <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                                                v-model="options.border.radius[size]" />
                                        </div>
                                    </div>
                                </rwd-group>

                                <hr />

                                {{-- Box Shadow --}}
                                <div class="form-group">
                                    <label for="input-column-edit-box_shadow-enabled">陰影 Box Shadow</label>
                                    <div>
                                        <phoenix-switch name="column-edit-box_shadow-enabled" v-model="options.box_shadow.enabled"
                                            id="input-column-edit-box_shadow-enabled"
                                            shape="circle"
                                            color="success"></phoenix-switch>
                                    </div>
                                </div>

                                <div v-if="options.box_shadow.enabled == 1">
                                    <div class="form-group">
                                        <label for="input-column-edit-box-shadow-color">陰影顏色</label>
                                        <input id="input-column-edit-box-shadow-color" type="text"
                                            v-model.lazy="options.box_shadow.color" v-color class="form-control" />
                                    </div>

                                    <div class="form-row">
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label>
                                                    水平位移 (X Offset)
                                                </label>
                                                <div class="d-flex">
                                                    <vue-slide-bar v-model="options.box_shadow.hoffset" class="flex-grow-1"></vue-slide-bar>
                                                    <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                                                        v-model="options.box_shadow.hoffset" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label>
                                                    垂直位移 (Y Offset)
                                                </label>
                                                <div class="d-flex">
                                                    <vue-slide-bar v-model="options.box_shadow.voffset" class="flex-grow-1"></vue-slide-bar>
                                                    <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                                                        v-model="options.box_shadow.voffset" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-row">
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label>
                                                    模糊度 Blur
                                                </label>
                                                <div class="d-flex">
                                                    <vue-slide-bar v-model="options.box_shadow.blur" class="flex-grow-1"></vue-slide-bar>
                                                    <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                                                        v-model="options.box_shadow.blur" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label>
                                                    擴散 Spread
                                                </label>
                                                <div class="d-flex">
                                                    <vue-slide-bar v-model="options.box_shadow.spread" class="flex-grow-1"></vue-slide-bar>
                                                    <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                                                        v-model="options.box_shadow.spread" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr />

                                <div class="form-group">
                                    <label for="input-column-edit-html-class">CSS Class</label>
                                    <input id="input-column-edit-html-class" type="text"
                                        v-model="options.html_class" class="form-control" />
                                </div>

                            </div>

                            {{-- Tab RWD --}}
                            <div class="tab-pane fade" id="column-edit-rwd" role="tabpanel" aria-labelledby="column-edit-rwd-tab">

                            </div>

                            {{-- Tab Animation --}}
                            <div class="tab-pane fade" id="column-edit-animation" role="tabpanel" aria-labelledby="column-edit-animation-tab">

                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="close()">Close</button>
                        <button type="button" class="btn btn-primary" @click="save()">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</column-edit>
