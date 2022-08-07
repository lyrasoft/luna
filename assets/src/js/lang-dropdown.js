/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2022 __ORGANIZATION__.
 * @license    __LICENSE__
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('LangDropdown', (options) => ({
    options,
    dropdown: null,
    items: [],
    loaded: false,
    
    init() {
      this.dropdown = bootstrap.Dropdown.getOrCreateInstance(
        this.$el,
        {
          autoClose: true
        }
      );
    },
    buttonClicked(e) {
      if (this.loaded) {
        return;
      }

      u.$http.get(
        this.options.ajaxUrl,
        {
          params: {
            id: this.options.id,
            type: this.options.type,
            table: this.options.table,
            idName: this.options.idName,
            langField: this.options.langField,
            routeName: this.options.routeName,
          }
        }
      ).then((res) => {
        this.items = res.data.data;

        this.loaded = true;
      });
    }
  }))
});

