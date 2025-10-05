import { useUniDirective, module, uid, addQuery, useScriptImport, simpleAlert, __ } from "@windwalker-io/unicorn-next";
class GragwarCaptcha {
  constructor($element, options = {}) {
    this.$element = $element;
    this.options = options;
    this.$image = this.$element.querySelector("[data-captcha-image]");
    this.$input = this.$element.querySelector("[data-captcha-input]");
    this.$refreshButton = this.$element.querySelector("[data-captcha-refresh]");
    this.$buttonIcon = this.$element.querySelector("[data-refresh-icon]");
    this.$refreshButton.addEventListener("click", () => {
      this.refresh();
    });
  }
  $image;
  $input;
  $refreshButton;
  $buttonIcon;
  refresh() {
    this.$buttonIcon.classList.add("fa-spin");
    let src = this.$image.dataset.image || "";
    const t = uid();
    src = addQuery(src, { t });
    this.$image.addEventListener("load", () => {
      this.$buttonIcon.classList.remove("fa-spin");
      this.$input.value = "";
    }, { once: true });
    this.$image.src = src;
  }
  clear() {
    this.$input.value = "";
  }
}
useUniDirective("captcha-gregwar", {
  mounted(el) {
    module(el, "captcha.grwgwar", (el2) => new GragwarCaptcha(el2));
  }
});
class RecaptchaCaptcha {
  constructor(el, type) {
    this.el = el;
    this.type = type;
    useScriptImport("https://www.google.com/recaptcha/api.js");
    this.key = this.el.dataset.key || "";
    this.callbackName = this.el.dataset.callback || "";
    this.jsVerify = this.el.dataset.jsVerify || "";
    if (this.jsVerify) {
      const form = this.el.closest("form");
      if (!form) {
        return;
      }
      if (type === "invisible") {
        form.addEventListener("submit", (e) => {
          if (form.dataset.passCaptcha) {
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          grecaptcha.execute();
        });
        window[this.callbackName] = function(response) {
          form.dataset.passCaptcha = "true";
          form.requestSubmit();
        };
      } else {
        form.addEventListener("submit", (e) => {
          if (form.dataset.passCaptcha) {
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          simpleAlert(__("luna.field.captcha.message.please.check.first"));
        });
        window[this.callbackName] = function(response) {
          form.dataset.passCaptcha = "true";
        };
      }
    }
  }
  key;
  callbackName;
  jsVerify;
}
useUniDirective("captcha-recaptcha", {
  mounted(el, { value }) {
    module(
      el,
      "captcha.recaptcha",
      (el2) => new RecaptchaCaptcha(el2, value)
    );
  }
});
//# sourceMappingURL=captcha.js.map
