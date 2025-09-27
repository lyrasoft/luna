import { useBs5Tooltip, useDisableOnSubmit, useFormComponent, useFormValidation } from '@windwalker-io/unicorn-next';

const formSelector = '#admin-form';

useFormValidation().then(() => useDisableOnSubmit(formSelector));

useFormComponent(formSelector);

// Bootstrap
useBs5Tooltip();
