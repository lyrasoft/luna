import { __, addQuery, module, simpleAlert, uid, useScriptImport, useUniDirective } from '@windwalker-io/unicorn-next';

class GragwarCaptcha {
  public $image!: HTMLImageElement;
  public $input!: HTMLInputElement;
  public $refreshButton!: HTMLButtonElement;
  public $buttonIcon!: HTMLSpanElement;

  constructor(public $element: Element, public options: any = {}) {
    this.$image = this.$element.querySelector<HTMLImageElement>('[data-captcha-image]')!;
    this.$input = this.$element.querySelector<HTMLInputElement>('[data-captcha-input]')!;
    this.$refreshButton = this.$element.querySelector<HTMLButtonElement>('[data-captcha-refresh]')!;
    this.$buttonIcon = this.$element.querySelector<HTMLSpanElement>('[data-refresh-icon]')!;

    this.$refreshButton.addEventListener('click', () => {
      this.refresh();
    });
  }

  refresh() {
    this.$buttonIcon.classList.add('fa-spin');

    let src = this.$image.dataset.image || '';
    const t = uid();

    src = addQuery(src, { t });

    this.$image.addEventListener('load', () => {
      this.$buttonIcon.classList.remove('fa-spin');
      this.$input.value = '';
    }, { once: true });

    this.$image.src = src;
  }

  clear() {
    this.$input.value = '';
  }
}

useUniDirective<HTMLElement>('captcha-gregwar', {
  mounted(el) {
    module(el, 'captcha.grwgwar', (el) => new GragwarCaptcha(el));
  }
});

class RecaptchaCaptcha {
  public key: string;
  public callbackName: string;
  public jsVerify: string;

  constructor(public el: HTMLElement, public type: string) {
    useScriptImport('https://www.google.com/recaptcha/api.js');

    this.key = this.el.dataset.key || '';
    this.callbackName = this.el.dataset.callback || '';

    this.jsVerify = this.el.dataset.jsVerify || '';

    if (this.jsVerify) {
      const form = this.el.closest('form');

      if (!form) {
        return;
      }

      if (type === 'invisible') {
        form.addEventListener('submit', (e) => {
          if (form.dataset.passCaptcha) {
            return;
          }

          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();

          grecaptcha.execute();
        });

        // @ts-ignore
        window[this.callbackName] = function (response: any) {
          form.dataset.passCaptcha = 'true';
          form.requestSubmit();
        };
      } else {
        form.addEventListener('submit', (e) => {
          if (form.dataset.passCaptcha) {
            return;
          }

          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();

          simpleAlert(__('luna.field.captcha.message.please.check.first'));
        });

        // @ts-ignore
        window[this.callbackName] = function (response: any) {
          form.dataset.passCaptcha = 'true';
        };
      }
    }
  }
}

useUniDirective<HTMLElement>('captcha-recaptcha', {
  mounted(el, { value }) {
    module(
      el,
      'captcha.recaptcha',
      (el) => new RecaptchaCaptcha(el as HTMLElement, value)
    );
  }
});

let recaptchaEnterpriseLoading: Promise<void> | null = null;

function loadRecaptchaEnterprise(): Promise<void> {
  if (window.grecaptcha?.enterprise?.render) {
    return Promise.resolve();
  }

  recaptchaEnterpriseLoading ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/enterprise.js?render=explicit';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      recaptchaEnterpriseLoading = null;
      reject(new Error('Failed to load reCAPTCHA Enterprise.'));
    };
    document.head.append(script);
  });

  return recaptchaEnterpriseLoading;
}

class RecaptchaEnterpriseCaptcha {
  public key: string;
  public form: HTMLFormElement | null;
  public invisible: boolean;
  public jsVerify: boolean;
  public widgetId: number | null = null;

  constructor(public el: HTMLElement, public type: string) {
    this.key = this.el.dataset.sitekey || '';
    this.form = this.el.closest('form');
    this.invisible = type === 'invisible';
    this.jsVerify = !!this.el.dataset.jsVerify;

    if (this.form && (this.invisible || this.jsVerify)) {
      this.hookForm(this.form);
    }

    this.render();
  }

  async render() {
    try {
      await loadRecaptchaEnterprise();
    } catch (e) {
      console.error(e);
      return;
    }

    this.widgetId = grecaptcha.enterprise.render(this.el, {
      sitekey: this.key,
      size: this.invisible ? 'invisible' : undefined,
      callback: (token: string) => this.onSuccess(token),
      'expired-callback': () => this.onExpired(),
      'error-callback': () => this.onExpired(),
    } as any);
  }

  hookForm(form: HTMLFormElement) {
    form.addEventListener('submit', (e) => {
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
        simpleAlert(__('luna.field.captcha.message.please.check.first'));
      }
    });
  }

  onSuccess(token: string) {
    if (this.form && (this.invisible || this.jsVerify)) {
      this.form.dataset.passCaptcha = 'true';

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

useUniDirective<HTMLElement>('captcha-recaptcha-enterprise', {
  mounted(el, { value }) {
    module(
      el,
      'captcha.recaptcha-enterprise',
      (el) => new RecaptchaEnterpriseCaptcha(el as HTMLElement, value)
    );
  }
});

let turnstileLoading: Promise<void> | null = null;

function loadTurnstile(): Promise<void> {
  if (window.turnstile) {
    return Promise.resolve();
  }

  turnstileLoading ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      turnstileLoading = null;
      reject(new Error('Failed to load Cloudflare Turnstile.'));
    };
    document.head.append(script);
  });

  return turnstileLoading;
}

class CloudflareCaptcha {
  public key: string;
  public form: HTMLFormElement | null;
  public invisible: boolean;
  public jsVerify: boolean;
  public widgetId: string | null = null;

  constructor(public el: HTMLElement, public type: string) {
    this.key = this.el.dataset.sitekey || '';
    this.form = this.el.closest('form');
    this.invisible = type === 'invisible';
    this.jsVerify = !!this.el.dataset.jsVerify;

    if (this.form && (this.invisible || this.jsVerify)) {
      this.hookForm(this.form);
    }

    this.render();
  }

  async render() {
    try {
      await loadTurnstile();
    } catch (e) {
      console.error(e);
      return;
    }

    const options: Record<string, any> = {
      sitekey: this.key,
      callback: (token: string) => this.onSuccess(token),
      'expired-callback': () => this.onExpired(),
      'error-callback': () => this.onExpired(),
    };

    for (const name of ['theme', 'size', 'language']) {
      const value = this.el.dataset[name];

      if (value) {
        options[name] = value;
      }
    }

    options.appearance = this.invisible ? 'execute' : (this.el.dataset.appearance || 'always');

    this.widgetId = turnstile.render(this.el, options);
  }

  hookForm(form: HTMLFormElement) {
    form.addEventListener('submit', (e) => {
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
        simpleAlert(__('luna.field.captcha.message.please.check.first'));
      }
    });
  }

  onSuccess(token: string) {
    if (this.form && (this.invisible || this.jsVerify)) {
      this.form.dataset.passCaptcha = 'true';

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

useUniDirective<HTMLElement>('captcha-cloudflare', {
  mounted(el, { value }) {
    module(
      el,
      'captcha.cloudflare',
      (el) => new CloudflareCaptcha(el as HTMLElement, value)
    );
  }
});


