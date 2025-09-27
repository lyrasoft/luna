import {
  useBs5Tooltip, useDisableIfStackNotEmpty, useDisableOnSubmit,
  useFormComponent,
  useFormValidation, useKeepAlive,
  useTomSelect
} from '@windwalker-io/unicorn-next';

const form = '#admin-form';

useBs5Tooltip();

// Form Element
useFormComponent(form);

// Form Validation
useFormValidation().then(() => useDisableOnSubmit(form));

// Disable if uploading
useDisableIfStackNotEmpty();

// KeepAlive
useKeepAlive(location.href);

// Select
useTomSelect('.js-tom-select');

// Tags
useTomSelect('#input-item-tags', {
  create: (input: string) => {
    return {
      value: `new#${input}`,
      text: input,
    };
  },
});
