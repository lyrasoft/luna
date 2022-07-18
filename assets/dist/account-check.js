System.register(["@main"], function (_export, _context) {
  "use strict";

  var LunaUserAccountChecker;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_main) {}],
    execute: function () {
      LunaUserAccountChecker = /*#__PURE__*/function (_Unicorn$mix$with) {
        _inherits(LunaUserAccountChecker, _Unicorn$mix$with);

        var _super = _createSuper(LunaUserAccountChecker);

        function LunaUserAccountChecker(el) {
          var _this;

          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          _classCallCheck(this, LunaUserAccountChecker);

          _this = _super.call(this);
          _this.el = el;
          _this.options = u.defaultsDeep(options, _this.constructor.defaultOptions);

          if (!_this.el.dataset.customErrorMessage) {
            _this.el.dataset.customErrorMessage = u.__('luna.message.user.account.exists');
          }

          _this.el.dataset.validate = _this.el.dataset.validate + '|' + _this.options.validate_name;
          _this.form = _this.el.closest('form');

          _this.registerEvents();

          setTimeout(function () {
            _this.registerHandler();
          }, 300);
          return _this;
        }

        _createClass(LunaUserAccountChecker, [{
          key: "check",
          value: function check(account) {
            var _this2 = this;

            this.trigger('start', {
              account: account
            });
            return u.$http.get(u.route('@account_check', {
              field: this.options.field,
              value: account
            })).then(function (res) {
              _this2.trigger('done', {
                account: account,
                exists: res.data.exists,
                res: res
              });

              return res.data.data.exists;
            })["catch"](function (xhr) {
              console.error(xhr);

              _this2.trigger('error', {
                account: account,
                xhr: xhr
              });
            })["finally"](function () {
              _this2.trigger('end', {
                account: account
              });
            });
          }
        }, {
          key: "registerEvents",
          value: function registerEvents() {
            var _this3 = this;

            this.el.addEventListener('change', function (e) {
              _this3.check(_this3.el.value).then(function (exists) {
                _this3.el.dataset.accountExists = exists;

                if (!exists) {
                  _this3.el.setCustomValidity(u.__('luna.message.user.account.exists'));

                  console.log(_this3.el.validationMessage);
                } else {
                  _this3.el.setCustomValidity('');
                }

                var fv = u.module(_this3.el, 'field.validation');

                if (!fv) {
                  fv = u.module(_this3.el.closest('[uni-field-validate]'), 'field.validation');
                }

                fv.checkValidity();
              });
            });
          }
        }, {
          key: "getValidation",
          value: function getValidation() {
            return u.$validation.get(this.form);
          }
        }, {
          key: "registerHandler",
          value: function registerHandler() {
            this.getValidation().addValidator(this.options.validate_name, function (value, element) {
              var r = element.dataset.accountExists === 'false';

              if (!r) {
                element.setCustomValidity(u.__('luna.message.user.account.exists'));
              }

              return r;
            });
          }
        }]);

        return LunaUserAccountChecker;
      }(Unicorn.mix( /*#__PURE__*/function () {
        function _class() {
          _classCallCheck(this, _class);
        }

        return _createClass(_class);
      }())["with"](Unicorn.EventMixin));

      _defineProperty(LunaUserAccountChecker, "defaultOptions", {
        field: null,
        validate_name: 'user-account'
      });

      u.directive('account-check', {
        mounted: function mounted(el, _ref) {
          var value = _ref.value;
          var options = JSON.parse(value || '{}');
          u.getBoundedInstance(el, 'account.check', function (el) {
            return new LunaUserAccountChecker(el, options);
          });
        }
      });
    }
  };
});
//# sourceMappingURL=account-check.js.map
