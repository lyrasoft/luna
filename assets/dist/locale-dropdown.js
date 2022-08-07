System.register(["@main"], function (_export, _context) {
  "use strict";

  var LocaleDropdown;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_main) {}],
    execute: function () {
      _export("LocaleDropdown", LocaleDropdown = /*#__PURE__*/_createClass(function LocaleDropdown(el, options) {
        _classCallCheck(this, LocaleDropdown);

        _defineProperty(this, "options", {
          ajaxUrl: '',
          currentId: ''
        });

        // the modal element
        this.el = el;
        this.options = Object.assign({}, this.options, options);
      }));

      u.directive('locale-dropdown', {
        mounted: function mounted(el, _ref) {
          var value = _ref.value;
          var options = JSON.parse(value);
          u.module(el, 'locale.dropdown', function () {
            return new LocaleDropdown(el, options);
          });
        }
      });
    }
  };
});
//# sourceMappingURL=locale-dropdown.js.map
