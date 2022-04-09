System.register(["@main"],(function(e,t){var n;function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function a(e,t){return a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},a(e,t)}function c(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=l(e);if(t){var o=l(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return s(this,n)}}function s(e,t){if(t&&("object"==typeof t||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function l(e){return l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},l(e)}return{setters:[function(e){}],execute:function(){var e,t,o;n=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&a(e,t)}(n,e);var t=c(n);function n(e){var o,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return r(this,n),(o=t.call(this)).el=e,o.options=u.defaultsDeep(i,o.constructor.defaultOptions),o.el.dataset.customErrorMessage||(o.el.dataset.customErrorMessage=u.__("luna.message.user.account.exists")),o.el.dataset.validate=o.el.dataset.validate+"|"+o.options.validate_name,o.form=o.el.closest("form"),o.registerEvents(),setTimeout((function(){o.registerHandler()}),300),o}return i(n,[{key:"check",value:function(e){var t=this;return this.trigger("start",{account:e}),u.$http.get(u.route("@account_check",{field:this.options.field,value:e})).then((function(n){return t.trigger("done",{account:e,exists:n.data.exists,res:n}),n.data.data.exists})).catch((function(n){console.error(n),t.trigger("error",{account:e,xhr:n})})).finally((function(){t.trigger("end",{account:e})}))}},{key:"registerEvents",value:function(){var e=this;this.el.addEventListener("change",(function(t){e.check(e.el.value).then((function(t){e.el.dataset.accountExists=t,t?e.el.setCustomValidity(""):(e.el.setCustomValidity(u.__("luna.message.user.account.exists")),console.log(e.el.validationMessage));var n=u.module(e.el,"field.validation");n||(n=u.module(e.el.closest("[uni-field-validate]"),"field.validation")),n.checkValidity()}))}))}},{key:"getValidation",value:function(){return u.$validation.get(this.form)}},{key:"registerHandler",value:function(){this.getValidation().addValidator(this.options.validate_name,(function(e,t){var n="false"===t.dataset.accountExists;return n||t.setCustomValidity(u.__("luna.message.user.account.exists")),n}))}}]),n}(Unicorn.mix(i((function e(){r(this,e)}))).with(Unicorn.EventMixin)),o={field:null,validate_name:"user-account"},(t="defaultOptions")in(e=n)?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,u.directive("account-check",{mounted:function(e,t){var r=t.value,o=JSON.parse(r||"{}");u.getBoundedInstance(e,"account.check",(function(e){return new n(e,o)}))}})}}}));
//# sourceMappingURL=account-check.js.map