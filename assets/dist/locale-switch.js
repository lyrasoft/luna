System.register(["@main"], function (exports_1, context_1) {
    "use strict";
    var LocaleSwitchModal;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (_1) {
            }
        ],
        execute: function () {
            LocaleSwitchModal = class LocaleSwitchModal {
                constructor(el, options = {}) {
                    Object.defineProperty(this, "el", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: el
                    });
                    Object.defineProperty(this, "options", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: {
                            type: '',
                            table: '',
                            routeName: '',
                            currentId: '',
                            defaultId: '',
                            inputId: '',
                            langField: '',
                            titleField: '',
                            triggerInputName: 'lang_assoc'
                        }
                    });
                    // the modal element
                    this.options = Object.assign({}, this.options, options);
                    let buttons = this.el.querySelectorAll('[data-task=create_lang_version]');
                    u.each(buttons, (button) => {
                        button.addEventListener('click', (e) => {
                            this.saveCurrentAndCreateLang(button);
                        });
                    });
                    buttons = this.el.querySelectorAll('[data-task=switch_lang]');
                    u.each(buttons, (button) => {
                        button.addEventListener('click', (e) => {
                            this.switchLang(button);
                        });
                    });
                }
                validateForm() {
                    const input = document.querySelector('#' + this.options.inputId);
                    const form = input.form;
                    if (!form) {
                        return undefined;
                    }
                    const validation = u.$validation.get(form);
                    const valid = validation.validateAll();
                    if (!valid) {
                        alert(u.__('luna.field.locale.switch.message.form.invalid'));
                        throw new Error('Form invalid');
                    }
                    return form;
                }
                /**
                 * @param {HTMLButtonElement} button
                 */
                saveCurrentAndCreateLang(button) {
                    const form = this.validateForm();
                    u.form(form).post(null, {
                        [this.options.triggerInputName]: {
                            task: 'create',
                            type: this.options.type,
                            table: this.options.table,
                            routeName: this.options.routeName,
                            code: button.dataset.lang,
                            copy: button.dataset.copy,
                            langField: this.options.langField,
                            titleField: this.options.titleField,
                            currentId: this.options.currentId,
                            defaultId: this.options.defaultId
                        }
                    });
                }
                switchLang(button) {
                    const form = this.validateForm();
                    u.form(form).post(null, {
                        [this.options.triggerInputName]: {
                            task: 'switch',
                            table: this.options.table,
                            routeName: this.options.routeName,
                            targetId: button.dataset.targetId
                        }
                    });
                }
            };
            exports_1("LocaleSwitchModal", LocaleSwitchModal);
            u.directive('locale-switch-modal', {
                mounted(el, { value }) {
                    const options = JSON.parse(value);
                    u.module(el, 'locale.switch', () => new LocaleSwitchModal(el, options));
                }
            });
        }
    };
});

//# sourceMappingURL=locale-switch.js.map
