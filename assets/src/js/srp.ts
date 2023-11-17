import '@main';
import type { SRPOptions } from '../types/srp';

const defaultOptions: Partial<SRPOptions> = {
  identitySelector: '[data-input-identity]',
  passwordSelector: '[data-input-password]',
  size: 256,
  hasher: 'sha256'
};

const $http = u.$http;

class SRPRegistration {
  identityInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  saltInput: HTMLInputElement;
  verifierInput: HTMLInputElement;

  public submitting = false;
  public disabledInputs = [];

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
      this.release();
    }, true);
  }

  release() {
    this.submitting = false;

    for (const disabledInput of this.disabledInputs) {
      disabledInput.disabled = false;
    }
  }

  getPasswordInputs() {
    return [
      this.passwordInput,
      ...this.el.querySelectorAll<HTMLInputElement>('[data-srp-override]')
    ];
  }

  disablePasswords() {
    this.disabledInputs = [];

    for (const input of this.getPasswordInputs()) {
      if (input.value && !input.disabled) {
        input.disabled = true;

        this.disabledInputs.push(input);

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
    client.setHasher(this.options?.hasher);

    return client;
  }

  async register() {
    const client = this.createClient();

    const identity = this.identityInput.value;
    const password = this.passwordInput.value;

    let { salt, verifier } = await client.register(identity, password);

    const saltInput = this.getHiddenInput('srp[salt]');
    saltInput.value = salt.toString(16);

    const verifierInput = this.getHiddenInput('srp[verifier]');
    verifierInput.value = verifier.toString(16);
  }

  getHiddenInput(name: string) {
    return this.el.querySelector<HTMLInputElement>(`[name="${name}"]`)
      || this.createHiddenInput(name);
  }

  createHiddenInput(name: string) {
    const input = document.createElement('input');

    input.type = 'hidden';
    input.name = name;

    this.el.appendChild(input);

    return input;
  }
}

class SRPLogin {
  identityInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  saltInput: HTMLInputElement;
  verifierInput: HTMLInputElement;

  public fallback = false;
  public submitting = false;
  public submitter: HTMLButtonElement;

  public disabledInputs = [];

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
      this.submitter = e.submitter as HTMLButtonElement;

      if (!this.submitting) {
        e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation();

        try {
          await this.auth();
        } catch (e) {
          console.warn(e);
        }

        if (!this.fallback) {
          this.disablePasswords();
        }

        this.submitting = true;

        this.el.requestSubmit();

        return;
      }
    });

    this.el.addEventListener('invalid', () => {
      this.release();
    }, true);
  }

  release() {
    if (this.submitter) {
      this.submitter.disabled = false;
    }

    this.submitting = false;
    this.fallback = false;
    this.getHiddenInput('srp[M2]').value = '';

    for (const disabledInput of this.disabledInputs) {
      disabledInput.disabled = false;
    }
  }

  async auth() {
    if (!this.identityInput.value || !this.passwordInput.value) {
      return;
    }

    if (this.submitter) {
      this.submitter.disabled = true;
    }

    const identity = this.identityInput.value;
    const password = this.passwordInput.value;

    const client = this.createClient();

    // Challenge
    const res = await $http.get(
      '@auth_ajax/srpChallenge{?identity}',
      {
        vars: {
          identity
        }
      }
    );

    const r = res.data.data;

    if (r == null) {
      return;
    }

    this.fallback = !!r.fallback;
    this.getHiddenInput('srp[fallback]').value = this.fallback ? '1' : '0';

    if (this.fallback) {
      return;
    }

    let { salt, B } = r;

    // Step1
    salt = hexToBigint(salt);
    B = hexToBigint(B);

    // Step 1
    const a = await client.generateRandomSecret();
    const A = await client.generatePublic(a);
    const x = await client.generatePasswordHash(salt, identity, password);

    // Step 2
    const u = await client.generateCommonSecret(A, B);
    const S = await client.generatePreMasterSecret(a, B, x, u);
    const K = await client.hash(S);
    const M1 = await client.generateClientSessionProof(identity, salt, A, B, K);

    const res2 = await $http.post(
      '@auth_ajax/srpAuthenticate',
      {
        identity,
        A: A.toString(16),
        M1: M1.toString(16)
      }
    );

    const { proof } = res2.data.data;

    const M2 = await client.generateServerSessionProof(A, M1, K);

    if (M2 !== hexToBigint(proof)) {
      // Just return
      return;
    }

    this.getHiddenInput('srp[M2]').value = M2.toString(16);
  }

  getPasswordInputs() {
    return [
      this.passwordInput,
      ...this.el.querySelectorAll<HTMLInputElement>('[data-srp-override]')
    ];
  }

  disablePasswords() {
    this.disabledInputs = [];

    for (const input of this.getPasswordInputs()) {
      if (input.value && !input.disabled) {
        input.disabled = true;

        this.disabledInputs.push(input);

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
    client.setHasher(this.options.hasher);

    return client;
  }

  getHiddenInput(name: string) {
    return this.el.querySelector<HTMLInputElement>(`[name="${name}"]`)
      || this.createHiddenInput(name);
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

u.directive('srp-login', {
  mounted(el, { value }) {
    const options = JSON.parse(value);
    u.module(
      el,
      'srp.registration',
      (el) => new SRPLogin(el as HTMLFormElement, options)
    );
  }
});
