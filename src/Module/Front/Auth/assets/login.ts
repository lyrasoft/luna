import { useDisableOnSubmit, useFormValidation } from '@windwalker-io/unicorn-next';

const formSelector = '#login-form';

useFormValidation().then(() => useDisableOnSubmit(formSelector));
