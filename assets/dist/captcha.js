"use strict";class GragwarCaptcha{constructor(e,t={}){Object.defineProperty(this,"$element",{enumerable:!0,configurable:!0,writable:!0,value:e}),Object.defineProperty(this,"options",{enumerable:!0,configurable:!0,writable:!0,value:t}),Object.defineProperty(this,"$image",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"$input",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"$refreshButton",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"$buttonIcon",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.$image=this.$element.querySelector("[data-captcha-image]"),this.$input=this.$element.querySelector("[data-captcha-input]"),this.$refreshButton=this.$element.querySelector("[data-captcha-refresh]"),this.$buttonIcon=this.$element.querySelector("[data-refresh-icon]"),this.$refreshButton.addEventListener("click",(()=>{this.refresh()}))}refresh(){this.$buttonIcon.classList.add("fa-spin");let e=this.$image.dataset.image||"";const t=(new Date).getTime().toString()+"."+1e4*Math.random();-1!==e.indexOf("?")?e+="&t="+t:e+="?t="+t,this.$image.addEventListener("load",(()=>{this.$buttonIcon.classList.remove("fa-spin"),this.$input.value=""}),{once:!0}),this.$image.src=e}clear(){this.$input.value=""}}u.directive("captcha-gregwar",{mounted(e){u.module(e,"captcha.grwgwar",(e=>new GragwarCaptcha(e)))}});class RecaptchaCaptcha{constructor(e,t){if(Object.defineProperty(this,"el",{enumerable:!0,configurable:!0,writable:!0,value:e}),Object.defineProperty(this,"type",{enumerable:!0,configurable:!0,writable:!0,value:t}),Object.defineProperty(this,"key",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"callbackName",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"jsVerify",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),u.import("https://www.google.com/recaptcha/api.js"),this.key=this.el.dataset.key||"",this.callbackName=this.el.dataset.callback||"",this.jsVerify=this.el.dataset.jsVerify||"",this.jsVerify){const e=this.el.closest("form");if(!e)return;"invisible"===t?(e.addEventListener("submit",(t=>{e.dataset.passCaptcha||(t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation(),grecaptcha.execute())})),window[this.callbackName]=function(t){e.dataset.passCaptcha="true",e.requestSubmit()}):(e.addEventListener("submit",(t=>{e.dataset.passCaptcha||(t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation(),alert(u.__("luna.field.captcha.message.please.check.first")))})),window[this.callbackName]=function(t){e.dataset.passCaptcha="true"})}}}u.directive("captcha-recaptcha",{mounted(e,{value:t}){u.module(e,"captcha.recaptcha",(e=>new RecaptchaCaptcha(e,t)))}});