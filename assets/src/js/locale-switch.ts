
import '@main';

interface LocaleSwitchOptions {
  type: string;
  table: string;
  routeName: string;
  currentId: string;
  defaultId: string;
  inputId: string;
  langField: string;
  titleField: string;
  triggerInputName: string;
}

export class LocaleSwitchModal {
  public options: LocaleSwitchOptions = {
    type: '',
    table: '',
    routeName: '',
    currentId: '',
    defaultId: '',
    inputId: '',
    langField: '',
    titleField: '',
    triggerInputName: 'lang_assoc'
  };

  constructor(public el: HTMLElement, options: Partial<LocaleSwitchOptions> = {}) {
    // the modal element
    this.options = Object.assign({}, this.options, options);

    let buttons = this.el.querySelectorAll<HTMLButtonElement|HTMLAnchorElement>('[data-task=create_lang_version]');

    u.each(buttons, (button) => {
      button.addEventListener('click', (e) => {
        this.saveCurrentAndCreateLang(button);
      });
    });

    buttons = this.el.querySelectorAll<HTMLButtonElement|HTMLAnchorElement>('[data-task=switch_lang]');

    u.each(buttons, (button) => {
      button.addEventListener('click', (e) => {
        this.switchLang(button);
      });
    });
  }

  validateForm() {
    const input = document.querySelector<HTMLInputElement>('#' + this.options.inputId);

    const form = input.form;

    const validation = u.$validation.get(form);

    const valid = validation.validateAll();

    if (!valid) {
      alert(u.__('luna.field.locale.switch.message.form.invalid'));
      throw new Error('Form invalid');
    }

    return form;
  }

  /**
   * @param {HTMLButtonElement} button
   */
  saveCurrentAndCreateLang(button: HTMLButtonElement) {
    const form = this.validateForm();

    u.form(form).post(
      null,
      {
        [this.options.triggerInputName]: {
          task: 'create',
          type: this.options.type,
          table: this.options.table,
          routeName: this.options.routeName,
          code: button.dataset.lang,
          copy: button.dataset.copy,
          langField: this.options.langField,
          titleField: this.options.titleField,
          currentId: this.options.currentId,
          defaultId: this.options.defaultId
        }
      }
    );
  }

  /**
   * @param {HTMLButtonElement} button
   */
  switchLang(button: HTMLButtonElement) {
    const form = this.validateForm();

    u.form(form).post(
      null,
      {
        [this.options.triggerInputName]: {
          task: 'switch',
          table: this.options.table,
          routeName: this.options.routeName,
          targetId: button.dataset.targetId
        }
      }
    );
  }
}

u.directive(
  'locale-switch-modal',
  {
    mounted(el, { value }) {
      const options = JSON.parse(value);

      u.module(el, 'locale.switch', () => new LocaleSwitchModal(el as HTMLElement, options));
    }
  }
);

