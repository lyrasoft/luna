System.register(["@main"], function (exports_1, context_1) {
    "use strict";
    var defaultOptions, SRPRegistration;
    var __moduleName = context_1 && context_1.id;
    function hexToBigint(hex) {
        return BigInt(`0x${hex}`);
    }
    return {
        setters: [
            function (_1) {
            }
        ],
        execute: function () {
            defaultOptions = {
                identitySelector: '[data-input-identity]',
                passwordSelector: '[data-input-password]',
                size: 256,
            };
            SRPRegistration = class SRPRegistration {
                constructor(el, options = {}) {
                    this.el = el;
                    this.options = options;
                    this.submitting = false;
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
                    const inputs = this.el.querySelectorAll('[data-srp-override]');
                    for (const input of inputs) {
                        if (input.value) {
                            input.disabled = true;
                            setTimeout(() => {
                                input.disabled = false;
                            }, 1000);
                        }
                    }
                }
                createClient() {
                    const client = SRPClient.create(this.options.prime, this.options.generator, this.options.key);
                    client.setSize(this.options.size);
                    client.setHasher(async (buffer) => {
                        return new Uint8Array(
                        // SHA256
                        await crypto.subtle.digest("SHA-256", buffer));
                    });
                    return client;
                }
                async register() {
                    const client = this.createClient();
                    const identity = this.identityInput.value;
                    const password = this.passwordInput.value;
                    let { salt, verifier } = await client.register(identity, password);
                    const srpInput = this.saltInput ?? (this.saltInput = this.createHiddenInput('srp[salt]'));
                    srpInput.value = salt.toString(16);
                    const verifierInput = this.verifierInput ?? (this.verifierInput = this.createHiddenInput('srp[verifier]'));
                    verifierInput.value = verifier.toString(16);
                }
                createHiddenInput(name) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = name;
                    this.el.appendChild(input);
                    return input;
                }
            };
            u.directive('srp-registration', {
                mounted(el, { value }) {
                    const options = JSON.parse(value);
                    u.module(el, 'srp.registration', (el) => new SRPRegistration(el, options));
                }
            });
        }
    };
});

//# sourceMappingURL=registration.js.map
