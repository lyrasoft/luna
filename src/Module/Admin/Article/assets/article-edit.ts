import {
  disableIfStackNotEmpty,
  disableOnSubmit,
  keepAlive,
  useBs5Tooltip,
  useFormComponent,
  useFormValidation,
  useTomSelect
} from '@windwalker-io/unicorn-next';

const form = '#admin-form';

useBs5Tooltip();

// Form Element
useFormComponent(form);

// Form Validation
useFormValidation().then(() => disableOnSubmit(form));

// Disable if uploading
disableIfStackNotEmpty();

// KeepAlive
keepAlive(location.href);

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
