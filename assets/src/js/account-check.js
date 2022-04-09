/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2022 __ORGANIZATION__.
 * @license    __LICENSE__
 */

import '@main';

class LunaUserAccountChecker extends Unicorn.mix(class {}).with(Unicorn.EventMixin) {
  static defaultOptions = {
    field: null,
    validate_name: 'user-account'
  };

  constructor(el, options = {}) {
    super();

    this.el = el;
    this.options = u.defaultsDeep(options, this.constructor.defaultOptions);

    if (!this.el.dataset.customErrorMessage) {
      this.el.dataset.customErrorMessage = u.__('luna.message.user.account.exists');
    }

    this.el.dataset.validate = this.el.dataset.validate + '|' + this.options.validate_name;
    this.form = this.el.closest('form');

    this.registerEvents();

    setTimeout(() => {
      this.registerHandler();
    }, 300);
  }

  check(account) {
    this.trigger('start', { account });

    return u.$http.get(u.route('@account_check', { field: this.options.field, value: account }))
      .then((res) => {
        this.trigger('done', { account, exists: res.data.exists, res });

        return res.data.data.exists;
      })
      .catch((xhr) => {
        console.error(xhr);
        this.trigger('error', { account, xhr });
      })
      .finally(() => {
        this.trigger('end', { account });
      });
  }

  registerEvents() {
    this.el.addEventListener('change', (e) => {
      this.check(this.el.value)
        .then((exists) => {
          this.el.dataset.accountExists = exists;

          if (!exists) {
            this.el.setCustomValidity(u.__('luna.message.user.account.exists'));
            console.log(this.el.validationMessage);
          } else {
            this.el.setCustomValidity('');
          }

          let fv = u.module(this.el, 'field.validation');

          if (!fv) {
            fv = u.module(this.el.closest('[uni-field-validate]'), 'field.validation');
          }

          fv.checkValidity();
        });
    });
  }

  getValidation() {
    return u.$validation.get(this.form);
  }

  registerHandler() {
    this.getValidation().addValidator(this.options.validate_name, (value, element) => {
      const r = element.dataset.accountExists === 'false';

      if (!r) {
        element.setCustomValidity(u.__('luna.message.user.account.exists'));
      }

      return r;
    });
  }
}

u.directive('account-check', {
  mounted(el, { value }) {
    const options = JSON.parse(value || '{}');

    u.getBoundedInstance(el, 'account.check', (el) => new LunaUserAccountChecker(el, options));
  }
});
