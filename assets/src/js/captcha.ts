
class GragwarCaptcha {
  public $image: HTMLImageElement;
  public $input: HTMLInputElement;
  public $refreshButton: HTMLButtonElement;
  public $buttonIcon: HTMLSpanElement;

  constructor(public $element: Element, public options: any = {}) {
    this.$image = this.$element.querySelector('[data-captcha-image]')!;
    this.$input = this.$element.querySelector('[data-captcha-input]')!;
    this.$refreshButton = this.$element.querySelector('[data-captcha-refresh]')!;
    this.$buttonIcon = this.$element.querySelector('[data-refresh-icon]')!;

    this.$refreshButton.addEventListener('click', () => {
      this.refresh();
    });
  }

  refresh() {
    this.$buttonIcon.classList.add('fa-spin');

    let src = this.$image.dataset.image || '';
    const t = (new Date).getTime().toString() + '.' + (Math.random() * 10000);

    if (src.indexOf('?') !== -1) {
      src += '&t=' + t;
    } else {
      src += '?t=' + t;
    }

    this.$image.addEventListener('load', () => {
      this.$buttonIcon.classList.remove('fa-spin');
      this.$input.value= '';
    }, { once: true });

    this.$image.src = src;
  }

  clear() {
    this.$input.value = '';
  }
}

u.directive('captcha-gregwar', {
  mounted(el) {
    u.module(el, 'captcha.grwgwar', (el) => new GragwarCaptcha(el));
  }
});

class RecaptchaCaptcha {
  public key: string | undefined;
  public callbackName: string | undefined;
  public jsVerify: string | undefined;

  constructor(public el: HTMLElement, public type: string) {
    u.import('https://www.google.com/recaptcha/api.js');

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
        window[this.callbackName] = function(response: any) {
          form.dataset.passCaptcha = 'true';
          form.requestSubmit();
        }
      } else {
        form.addEventListener('submit', (e) => {
          if (form.dataset.passCaptcha) {
            return;
          }

          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();

          alert(u.__('luna.field.captcha.message.please.check.first'));
        });

        // @ts-ignore
        window[this.callbackName] = function(response: any) {
          form.dataset.passCaptcha = 'true';
        }
      }
    }
  }
}

u.directive('captcha-recaptcha', {
  mounted(el, { value }) {
    u.module(
      el,
      'captcha.recaptcha',
      (el) => new RecaptchaCaptcha(el as HTMLElement, value)
    );
  }
});
