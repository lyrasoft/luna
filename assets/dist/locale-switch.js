System.register(["@main"], function (_export, _context) {
  "use strict";

  var LocaleSwitchModal;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_main) {}],
    execute: function () {
      _export("LocaleSwitchModal", LocaleSwitchModal = /*#__PURE__*/function () {
        function LocaleSwitchModal(el, options) {
          var _this = this;

          _classCallCheck(this, LocaleSwitchModal);

          _defineProperty(this, "options", {
            type: '',
            table: '',
            routeName: '',
            currentId: '',
            defaultId: '',
            inputId: '',
            langField: '',
            titleField: '',
            triggerInputName: 'lang_assoc'
          });

          // the modal element
          this.el = el;
          this.options = Object.assign({}, this.options, options);
          var buttons = this.el.querySelectorAll('[data-task=create_lang_version]');
          u.each(buttons, function (button) {
            button.addEventListener('click', function (e) {
              _this.saveCurrentAndCreateLang(button);
            });
          });
          buttons = this.el.querySelectorAll('[data-task=switch_lang]');
          u.each(buttons, function (button) {
            button.addEventListener('click', function (e) {
              _this.switchLang(button);
            });
          });
        }

        _createClass(LocaleSwitchModal, [{
          key: "validateForm",
          value: function validateForm() {
            var input = document.querySelector('#' + this.options.inputId);
            var form = input.form;
            var validation = u.$validation.get(form);
            var valid = validation.validateAll();

            if (!valid) {
              alert(u.__('luna.field.locale.switch.message.form.invalid'));
              throw new Error('Form invalid');
            }

            return form;
          }
          /**
           * @param {HTMLButtonElement} button
           */

        }, {
          key: "saveCurrentAndCreateLang",
          value: function saveCurrentAndCreateLang(button) {
            var form = this.validateForm();
            u.form(form).post(null, _defineProperty({}, this.options.triggerInputName, {
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
            }));
          }
          /**
           * @param {HTMLButtonElement} button
           */

        }, {
          key: "switchLang",
          value: function switchLang(button) {
            var form = this.validateForm();
            u.form(form).post(null, _defineProperty({}, this.options.triggerInputName, {
              task: 'switch',
              table: this.options.table,
              routeName: this.options.routeName,
              targetId: button.dataset.targetId
            }));
          }
        }]);

        return LocaleSwitchModal;
      }());

      u.directive('locale-switch-modal', {
        mounted: function mounted(el, _ref) {
          var value = _ref.value;
          var options = JSON.parse(value);
          u.module(el, 'locale.switch', function () {
            return new LocaleSwitchModal(el, options);
          });
        }
      });
    }
  };
});
//# sourceMappingURL=locale-switch.js.map
