
import '@main';
import type { SRPOptions } from '../../types/srp';

const defaultOptions: Partial<SRPOptions> = {
  identitySelector: '[data-input-identity]',
  passwordSelector: '[data-input-password]',
  size: 256,
};

class SRPRegistration {
  identityInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  saltInput: HTMLInputElement;
  verifierInput: HTMLInputElement;

  public submitting = false;

  constructor(public el: HTMLFormElement, public options: Partial<SRPOptions> = {}) {
    this.options = Object.assign({}, defaultOptions, this.options);

    this.init();
  }

  init() {
    this.identityInput = this.el.querySelector(this.options.identitySelector);
    this.passwordInput = this.el.querySelector(this.options.passwordSelector);

    if (!this.identityInput || !this.passwordInput) {
      throw new Error('Identity or password input not found.');
    }

    this.el.addEventListener('submit', async (e) => {
      if (!this.submitting) {
        e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation();

        await this.register();

        this.disablePasswords();

        this.submitting = true;

        this.el.requestSubmit();

        return;
      }
    });

    this.el.addEventListener('invalid', () => {
      this.submitting = false;
    }, true);
  }

  async registerSubmit() {
    await this.register();

    this.disablePasswords();

    setTimeout(() => {
      this.submitting = true;
      this.el.requestSubmit();
    }, 0);
  }

  disablePasswords() {
    if (this.passwordInput.value) {
      this.passwordInput.disabled = true;

      setTimeout(() => {
        this.passwordInput.disabled = false;
      }, 1000);
    }

    const inputs = this.el.querySelectorAll<HTMLInputElement>('[data-srp-override]');

    for (const input of inputs) {
      if (input.value) {
        input.disabled = true;

        setTimeout(() => {
          input.disabled = false;
        }, 1000);
      }
    }
  }

  createClient(): InstanceType<typeof SRPClient> {
    const client = SRPClient.create(
      this.options.prime,
      this.options.generator,
      this.options.key,
    );

    client.setSize(this.options.size);
    client.setHasher(async (buffer) => {
      return new Uint8Array(
        // SHA256
        await crypto.subtle.digest("SHA-256", buffer)
      );
    });

    return client;
  }

  async register() {
    const client = this.createClient();

    const identity = this.identityInput.value;
    const password = this.passwordInput.value;

    let { salt, verifier } = await client.register(identity, password);

    const srpInput = this.saltInput ??= this.createHiddenInput('srp[salt]');
    srpInput.value = salt.toString(16);

    const verifierInput = this.verifierInput ??= this.createHiddenInput('srp[verifier]');
    verifierInput.value = verifier.toString(16);
  }

  createHiddenInput(name: string) {
    const input = document.createElement('input');

    input.type = 'hidden';
    input.name = name;

    this.el.appendChild(input);

    return input;
  }
}

function hexToBigint(hex: string) {
  return BigInt(`0x${hex}`);
}

u.directive('srp-registration', {
  mounted(el, { value }) {
    const options = JSON.parse(value);
    u.module(
      el,
      'srp.registration',
      (el) => new SRPRegistration(el as HTMLFormElement, options)
    );
  }
});
