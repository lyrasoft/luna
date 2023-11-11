// JS file for Auth

import '@main';

u.formValidation()
  .then(() => {
    u.$ui.disableOnSubmit('#login-form');
    u.$ui.disableOnSubmit('#login-form-extra');
  });

const loginButton = u.selectOne<HTMLButtonElement>('.c-login-button')!;
const usernameInput = u.selectOne<HTMLInputElement>('[data-username]')!;
const passwordInput = u.selectOne<HTMLInputElement>('[data-password]')!;

const form = passwordInput.form!;
const overridePasswordInput = u.html(`<input type="hidden" name="${passwordInput.name}">`);

form.appendChild(overridePasswordInput);

class SRP {
  generateRandomSeed(length = 32) {
    return u.$crypto.randomString(length);
  }

  generatePublicEphemeral(seed: string, username: string, password: string) {
    const bint = this.hexToBigInt(seed);

    const bintStr = bint.toString();

    return this.hash(bintStr + this.hash(username + ":" + password));
  }

  generateRandomBigInt(length: number) {
    const hexString = Array(length)
      .fill(undefined)
      .map(() => Math.round(Math.random() * 0xF).toString(16))
      .join('');

    return BigInt(`0x${hexString}`);
  }

  generatePrivateKey(seed: string, username: string, password: string) {
    const bint = this.hexToBigInt(seed);

    const bintStr = bint.toString();

    return this.hash(bintStr + this.hash(username + ":" + password));
  }

  hexToBigInt(hex: string) {
    if (hex.length % 2) {
      hex = '0' + hex;
    }

    return BigInt('0x' + hex);
  }

  async hash(message: string) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}

const srp = new SRP();

(window as any).srp = srp;

loginButton.addEventListener('click', async (e) => {
  e.preventDefault();

  loginButton.disabled = true;

  // Generate seed
  const seed = srp.generateRandomSeed();

  // Generate Public ephemeral
  const x = await srp.generatePublicEphemeral(
    seed,
    usernameInput.value,
    passwordInput.value
  );
  console.log(seed, x);
  u.$http.post('@auth_ajax/challenge{?public,seed}', {}, {
    vars: {
      seed,
      public: x
    }
  });
});
