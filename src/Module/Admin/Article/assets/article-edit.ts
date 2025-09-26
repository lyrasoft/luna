import {
  disableIfStackNotEmpty,
  disableOnSubmit,
  keepAlive,
  useFormComponent,
  useFormValidation,
  useTomSelect,
  useUIBootstrap5
} from '@windwalker-io/unicorn-next';

const form = '#admin-form';

const { tooltip } = await useUIBootstrap5();

tooltip();

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
