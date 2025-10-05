import { useDisableOnSubmit, useFormValidation } from '@windwalker-io/unicorn-next';

useFormValidation().then(() => {
  useDisableOnSubmit('#registration-form');
  useDisableOnSubmit('#registration-form-extra');
});
