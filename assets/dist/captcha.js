System.register([],(function(t,e){var a,i;function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var a=0;a<e.length;a++){var i=e[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function r(t,e,a){return e&&s(t.prototype,e),a&&s(t,a),Object.defineProperty(t,"prototype",{writable:!1}),t}return{setters:[],execute:function(){a=function(){function t(e,a){var i=this;n(this,t),this.$element=e,this.options=a,this.$image=this.$element.querySelector("[data-captcha-image]"),this.$input=this.$element.querySelector("[data-captcha-input]"),this.$refreshButton=this.$element.querySelector("[data-captcha-refresh]"),this.$buttonIcon=this.$element.querySelector("[data-refresh-icon]"),this.$refreshButton.addEventListener("click",(function(){i.refresh()}))}return r(t,[{key:"refresh",value:function(){var t=this;this.$buttonIcon.classList.add("fa-spin");var e=this.$image.dataset.image,a=(new Date).getTime().toString()+"."+1e4*Math.random();-1!==e.indexOf("?")?e+="&t="+a:e+="?t="+a,this.$image.addEventListener("load",(function(){t.$buttonIcon.classList.remove("fa-spin"),t.$input.value=""}),{once:!0}),this.$image.src=e}},{key:"clear",value:function(){this.$input.value=""}}]),t}(),u.directive("captcha-gregwar",{mounted:function(t){u.module(t,"captcha.grwgwar",(function(t){return new a(t)}))}}),i=r((function t(e,a){if(n(this,t),u.import("https://www.google.com/recaptcha/api.js?d76e7994a1a971d682fa5f8b"),this.el=e,this.type=a,this.key=this.el.dataset.key,this.callbackName=this.el.dataset.callback,this.jsVerify=this.el.dataset.jsVerify,this.jsVerify){var i=this.el.closest("form");"invisible"===a?(i.addEventListener("submit",(function(t){i.dataset.passCaptcha||(t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation(),grecaptcha.execute())})),window[this.callbackName]=function(t){i.dataset.passCaptcha="true",i.requestSubmit()}):(i.addEventListener("submit",(function(t){i.dataset.passCaptcha||(t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation(),alert(u.__("luna.field.captcha.message.please.check.first")))})),window[this.callbackName]=function(t){i.dataset.passCaptcha="true"})}})),u.directive("captcha-recaptcha",{mounted:function(t,e){var a=e.value;u.module(t,"captcha.recaptcha",(function(t){return new i(t,a)}))}})}}}));
//# sourceMappingURL=captcha.js.map
