/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2022 __ORGANIZATION__.
 * @license    __LICENSE__
 */

import '@main';

await u.$validation.addGlobalValidator('account_check', async (account, input, options) => {
  const field = options.field || 'username';

  const res = await u.$http.get(u.route('@account_check', { field: field, value: account }));

  if (res.data.data.exists) {
    return res.data.data.message || u.__('luna.message.user.account.exists');
  }

  return '';
});
