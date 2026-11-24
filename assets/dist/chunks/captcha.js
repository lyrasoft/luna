import { useUniDirective, module as module$1, uid, addQuery, useScriptImport, simpleAlert, __ } from "@windwalker-io/unicorn-next";
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
  $element;
  options;
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
    module$1(el, "captcha.grwgwar", (el2) => new GragwarCaptcha(el2));
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
  el;
  type;
  key;
  callbackName;
  jsVerify;
}
useUniDirective("captcha-recaptcha", {
  mounted(el, { value }) {
    module$1(
      el,
      "captcha.recaptcha",
      (el2) => new RecaptchaCaptcha(el2, value)
    );
  }
});
let recaptchaEnterpriseLoading = null;
function loadRecaptchaEnterprise() {
  if (window.grecaptcha?.enterprise?.render) {
    return Promise.resolve();
  }
  recaptchaEnterpriseLoading ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/enterprise.js?render=explicit";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      recaptchaEnterpriseLoading = null;
      reject(new Error("Failed to load reCAPTCHA Enterprise."));
    };
    document.head.append(script);
  });
  return recaptchaEnterpriseLoading;
}
class RecaptchaEnterpriseCaptcha {
  constructor(el, type) {
    this.el = el;
    this.type = type;
    this.key = this.el.dataset.sitekey || "";
    this.form = this.el.closest("form");
    this.invisible = type === "invisible";
    this.jsVerify = !!this.el.dataset.jsVerify;
    if (this.form && (this.invisible || this.jsVerify)) {
      this.hookForm(this.form);
    }
    this.render();
  }
  el;
  type;
  key;
  form;
  invisible;
  jsVerify;
  widgetId = null;
  async render() {
    try {
      await loadRecaptchaEnterprise();
    } catch (e) {
      console.error(e);
      return;
    }
    this.widgetId = grecaptcha.enterprise.render(this.el, {
      sitekey: this.key,
      size: this.invisible ? "invisible" : void 0,
      callback: (token) => this.onSuccess(token),
      "expired-callback": () => this.onExpired(),
      "error-callback": () => this.onExpired()
    });
  }
  hookForm(form) {
    form.addEventListener("submit", (e) => {
      if (form.dataset.passCaptcha) {
        delete form.dataset.passCaptcha;
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      if (this.invisible) {
        if (this.widgetId !== null) {
          grecaptcha.enterprise.execute(this.widgetId);
        }
      } else {
        simpleAlert(__("luna.field.captcha.message.please.check.first"));
      }
    });
  }
  onSuccess(token) {
    if (this.form && (this.invisible || this.jsVerify)) {
      this.form.dataset.passCaptcha = "true";
      if (this.invisible) {
        this.form.requestSubmit();
      }
    }
  }
  onExpired() {
    if (this.form) {
      delete this.form.dataset.passCaptcha;
    }
  }
}
useUniDirective("captcha-recaptcha-enterprise", {
  mounted(el, { value }) {
    module$1(
      el,
      "captcha.recaptcha-enterprise",
      (el2) => new RecaptchaEnterpriseCaptcha(el2, value)
    );
  }
});
let turnstileLoading = null;
function loadTurnstile() {
  if (window.turnstile) {
    return Promise.resolve();
  }
  turnstileLoading ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      turnstileLoading = null;
      reject(new Error("Failed to load Cloudflare Turnstile."));
    };
    document.head.append(script);
  });
  return turnstileLoading;
}
class CloudflareCaptcha {
  constructor(el, type) {
    this.el = el;
    this.type = type;
    this.key = this.el.dataset.sitekey || "";
    this.form = this.el.closest("form");
    this.invisible = type === "invisible";
    this.jsVerify = !!this.el.dataset.jsVerify;
    if (this.form && (this.invisible || this.jsVerify)) {
      this.hookForm(this.form);
    }
    this.render();
  }
  el;
  type;
  key;
  form;
  invisible;
  jsVerify;
  widgetId = null;
  async render() {
    try {
      await loadTurnstile();
    } catch (e) {
      console.error(e);
      return;
    }
    const options = {
      sitekey: this.key,
      callback: (token) => this.onSuccess(token),
      "expired-callback": () => this.onExpired(),
      "error-callback": () => this.onExpired()
    };
    for (const name of ["theme", "size", "language"]) {
      const value = this.el.dataset[name];
      if (value) {
        options[name] = value;
      }
    }
    options.appearance = this.invisible ? "execute" : this.el.dataset.appearance || "always";
    this.widgetId = turnstile.render(this.el, options);
  }
  hookForm(form) {
    form.addEventListener("submit", (e) => {
      if (form.dataset.passCaptcha) {
        delete form.dataset.passCaptcha;
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      if (this.invisible) {
        if (this.widgetId !== null) {
          turnstile.execute(this.widgetId);
        }
      } else {
        simpleAlert(__("luna.field.captcha.message.please.check.first"));
      }
    });
  }
  onSuccess(token) {
    if (this.form && (this.invisible || this.jsVerify)) {
      this.form.dataset.passCaptcha = "true";
      if (this.invisible) {
        this.form.requestSubmit();
      }
    }
  }
  onExpired() {
    if (this.form) {
      delete this.form.dataset.passCaptcha;
    }
  }
}
useUniDirective("captcha-cloudflare", {
  mounted(el, { value }) {
    module$1(
      el,
      "captcha.cloudflare",
      (el2) => new CloudflareCaptcha(el2, value)
    );
  }
});
//# sourceMappingURL=captcha.js.map
