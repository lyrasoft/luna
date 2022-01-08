System.register([], function (_export, _context) {
  "use strict";

  var GragwarCaptcha, RecaptchaCaptcha;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [],
    execute: function () {
      /**
       * Part of earth project.
       *
       * @copyright  Copyright (C) 2022 __ORGANIZATION__.
       * @license    __LICENSE__
       */
      GragwarCaptcha = /*#__PURE__*/function () {
        function GragwarCaptcha(el, options) {
          var _this = this;

          _classCallCheck(this, GragwarCaptcha);

          this.$element = el;
          this.options = options;
          this.$image = this.$element.querySelector('[data-captcha-image]');
          this.$input = this.$element.querySelector('[data-captcha-input]');
          this.$refreshButton = this.$element.querySelector('[data-captcha-refresh]');
          this.$buttonIcon = this.$element.querySelector('[data-refresh-icon]');
          this.$refreshButton.addEventListener('click', function () {
            _this.refresh();
          });
        }

        _createClass(GragwarCaptcha, [{
          key: "refresh",
          value: function refresh() {
            var _this2 = this;

            this.$buttonIcon.classList.add('fa-spin');
            var src = this.$image.dataset.image;
            var t = new Date().getTime().toString() + '.' + Math.random() * 10000;

            if (src.indexOf('?') !== -1) {
              src += '&t=' + t;
            } else {
              src += '?t=' + t;
            }

            this.$image.addEventListener('load', function () {
              _this2.$buttonIcon.classList.remove('fa-spin');

              _this2.$input.value = '';
            }, {
              once: true
            });
            this.$image.src = src;
          }
        }, {
          key: "clear",
          value: function clear() {
            this.$input.value = '';
          }
        }]);

        return GragwarCaptcha;
      }();

      u.directive('captcha-gregwar', {
        mounted: function mounted(el) {
          u.module(el, 'captcha.grwgwar', function (el) {
            return new GragwarCaptcha(el);
          });
        }
      });

      RecaptchaCaptcha = function RecaptchaCaptcha(el, type) {
        _classCallCheck(this, RecaptchaCaptcha);

        u["import"]('https://www.google.com/recaptcha/api.js?2375b7ebe2064e704bc2a781');
        this.el = el;
        this.type = type;
        this.callbackName = this.el.dataset.callback;
        this.key = this.el.dataset.key;
        var form = this.el.closest('form');

        if (type === 'invisible') {
          form.addEventListener('submit', function (e) {
            if (form.dataset.passCaptcha) {
              return;
            }

            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            grecaptcha.execute();
          });

          window[this.callbackName] = function (response) {
            form.dataset.passCaptcha = 'true';
            form.requestSubmit();
          };
        } else {
          form.addEventListener('submit', function (e) {
            if (form.dataset.passCaptcha) {
              return;
            }

            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            alert(u.__('luna.field.captcha.message.please.check.first'));
          });

          window[this.callbackName] = function (response) {
            form.dataset.passCaptcha = 'true';
          };
        }
      };

      u.directive('captcha-recaptcha', {
        mounted: function mounted(el, _ref) {
          var value = _ref.value;
          u.module(el, 'captcha.recaptcha', function (el) {
            return new RecaptchaCaptcha(el, value);
          });
        }
      });
    }
  };
});
//# sourceMappingURL=captcha.js.map
