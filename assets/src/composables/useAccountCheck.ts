import { __, addGlobalValidator, ApiReturn, route, useHttpClient } from '@windwalker-io/unicorn-next';

export async function useAccountCheck() {
  const { get } = await useHttpClient();

  await addGlobalValidator('account_check', async (account: any, input: any, options: any) => {
    const field = options.field || 'username';

    const res = await get<ApiReturn<{ exists: boolean; message: string; }>>(
      '@account_check',
      { params: { field: field, value: account } }
    );

    if (res.data.data.exists) {
      return res.data.data.message || __('luna.message.user.account.exists');
    }

    return '';
  });
}

