System.register(["@main"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (_1) {
            }
        ],
        execute: async function () {
            await u.$validation.addGlobalValidator('account_check', async (account, input, options) => {
                const field = options.field || 'username';
                const res = await u.$http.get(u.route('@account_check', { field: field, value: account }));
                if (res.data.data.exists) {
                    return res.data.data.message || u.__('luna.message.user.account.exists');
                }
                return '';
            });
        }
    };
});

//# sourceMappingURL=account-check.js.map
