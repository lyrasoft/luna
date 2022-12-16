// JS file for Auth

import '@main';

u.$ui.bootstrap.tooltip();

u.formValidation()
  .then(() => {
    u.$ui.disableOnSubmit('#login-form');
  });

// Webauthn
const usernameInput = document.querySelector('#input-user-username');
const webauthnButton = document.querySelector('[data-task=webauthn]');

webauthnButton.addEventListener('click', () => {
  if (usernameInput.value) {
    webAuthnLogin();
  }
});

async function webAuthnLogin() {
  const challenge = u.data('challenge');
  const publicKeyCredentialCreationOptions = {
    challenge: Uint8Array.from(
      challenge, c => c.charCodeAt(0)),
    rp: {
      name: u.data('sitename'),
      id: u.data('siteid'),
    },
    user: {
      id: Uint8Array.from(
        'UZSL85T9AFC', c => c.charCodeAt(0)),
      name: usernameInput.value,
      displayName: usernameInput.value,
    },
    pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
    authenticatorSelection: {
      authenticatorAttachment: 'cross-platform',
    },
    timeout: 60000,
    attestation: 'direct'
  };

  const credential = await navigator.credentials.create({
    publicKey: publicKeyCredentialCreationOptions
  });

  console.log(credential);
}
