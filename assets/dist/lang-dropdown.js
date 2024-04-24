"use strict";
document.addEventListener('alpine:init', () => {
    Alpine.data('LangDropdown', (options) => ({
        options,
        dropdown: null,
        items: [],
        loaded: false,
        init() {
            this.dropdown = bootstrap.Dropdown.getOrCreateInstance(this.$el, {
                autoClose: true
            });
        },
        buttonClicked(e) {
            if (this.loaded) {
                return;
            }
            const options = this.options;
            u.$http.get(options.ajaxUrl, {
                params: {
                    id: options.id,
                    type: options.type,
                    table: options.table,
                    idName: options.idName,
                    langField: options.langField,
                    routeName: options.routeName,
                }
            }).then((res) => {
                this.items = res.data.data;
                this.loaded = true;
            });
        }
    }));
});

//# sourceMappingURL=lang-dropdown.js.map
