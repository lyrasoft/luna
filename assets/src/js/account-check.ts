
import '@main';

await u.$validation.addGlobalValidator('account_check', async (account: any, input: any, options: any) => {
  const field = options.field || 'username';

  const res = await u.$http.get(u.route('@account_check', { field: field, value: account }));

  if (res.data.data.exists) {
    return res.data.data.message || u.__('luna.message.user.account.exists');
  }

  return '';
});
