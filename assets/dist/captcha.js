System.register([],(function(t,e){var a,s;return{setters:[],execute:function(){a=class{constructor(t,e){this.$element=t,this.options=e,this.$image=this.$element.querySelector("[data-captcha-image]"),this.$input=this.$element.querySelector("[data-captcha-input]"),this.$refreshButton=this.$element.querySelector("[data-captcha-refresh]"),this.$buttonIcon=this.$element.querySelector("[data-refresh-icon]"),this.$refreshButton.addEventListener("click",(()=>{this.refresh()}))}refresh(){this.$buttonIcon.classList.add("fa-spin");let t=this.$image.dataset.image;const e=(new Date).getTime().toString()+"."+1e4*Math.random();-1!==t.indexOf("?")?t+="&t="+e:t+="?t="+e,this.$image.addEventListener("load",(()=>{this.$buttonIcon.classList.remove("fa-spin"),this.$input.value=""}),{once:!0}),this.$image.src=t}clear(){this.$input.value=""}},u.directive("captcha-gregwar",{mounted(t){u.module(t,"captcha.grwgwar",(t=>new a(t)))}}),s=class{constructor(t,e){if(u.import("https://www.google.com/recaptcha/api.js?96a5011cd07503030e4865a1"),this.el=t,this.type=e,this.key=this.el.dataset.key,this.callbackName=this.el.dataset.callback,this.jsVerify=this.el.dataset.jsVerify,this.jsVerify){const t=this.el.closest("form");"invisible"===e?(t.addEventListener("submit",(e=>{t.dataset.passCaptcha||(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),grecaptcha.execute())})),window[this.callbackName]=function(e){t.dataset.passCaptcha="true",t.requestSubmit()}):(t.addEventListener("submit",(e=>{t.dataset.passCaptcha||(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),alert(u.__("luna.field.captcha.message.please.check.first")))})),window[this.callbackName]=function(e){t.dataset.passCaptcha="true"})}}},u.directive("captcha-recaptcha",{mounted(t,e){let{value:a}=e;u.module(t,"captcha.recaptcha",(t=>new s(t,a)))}})}}}));
//# sourceMappingURL=captcha.js.map
