System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      /**
       * Part of earth project.
       *
       * @copyright  Copyright (C) 2022 __ORGANIZATION__.
       * @license    __LICENSE__
       */
      document.addEventListener('alpine:init', function () {
        Alpine.data('LangDropdown', function (options) {
          return {
            options: options,
            dropdown: null,
            items: [],
            loaded: false,
            init: function init() {
              this.dropdown = bootstrap.Dropdown.getOrCreateInstance(this.$el, {
                autoClose: true
              });
            },
            buttonClicked: function buttonClicked(e) {
              var _this = this;

              if (this.loaded) {
                return;
              }

              u.$http.get(this.options.ajaxUrl, {
                params: {
                  id: this.options.id,
                  type: this.options.type,
                  table: this.options.table,
                  idName: this.options.idName,
                  langField: this.options.langField,
                  routeName: this.options.routeName
                }
              }).then(function (res) {
                _this.items = res.data.data;
                _this.loaded = true;
              });
            }
          };
        });
      });
    }
  };
});
//# sourceMappingURL=lang-dropdown.js.map
