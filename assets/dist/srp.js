System.register(["@main"], function (exports_1, context_1) {
    "use strict";
    var defaultOptions, $http, SRPRegistration, SRPLogin;
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
                hasher: 'sha256'
            };
            $http = u.$http;
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
                getHiddenInput(name) {
                    return this.el.querySelector(`[name="${name}"]`)
                        || this.createHiddenInput(name);
                }
                createHiddenInput(name) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = name;
                    this.el.appendChild(input);
                    return input;
                }
            };
            SRPLogin = class SRPLogin {
                constructor(el, options = {}) {
                    this.el = el;
                    this.options = options;
                    this.fallback = false;
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
                        this.submitter = e.submitter;
                        if (!this.submitting) {
                            e.stopPropagation();
                            e.preventDefault();
                            e.stopImmediatePropagation();
                            try {
                                await this.auth();
                            }
                            catch (e) {
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
                    const res = await $http.get('@auth_ajax/srpChallenge{?identity}', {
                        vars: {
                            identity
                        }
                    });
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
                    const res2 = await $http.post('@auth_ajax/srpAuthenticate', {
                        identity,
                        A: A.toString(16),
                        M1: M1.toString(16)
                    });
                    const { proof } = res2.data.data;
                    const M2 = await client.generateServerSessionProof(A, M1, K);
                    if (M2 !== hexToBigint(proof)) {
                        // Just return
                        return;
                    }
                    this.getHiddenInput('srp[M2]').value = M2.toString(16);
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
                    client.setHasher(this.options.hasher);
                    return client;
                }
                getHiddenInput(name) {
                    return this.el.querySelector(`[name="${name}"]`)
                        || this.createHiddenInput(name);
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
            u.directive('srp-login', {
                mounted(el, { value }) {
                    const options = JSON.parse(value);
                    u.module(el, 'srp.registration', (el) => new SRPLogin(el, options));
                }
            });
        }
    };
});

//# sourceMappingURL=srp.js.map
