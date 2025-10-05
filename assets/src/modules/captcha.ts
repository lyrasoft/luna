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


