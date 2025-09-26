import {
  disableOnSubmit,
  useCheckboxesMultiSelect,
  useGridComponent,
  useUIBootstrap5
} from '@windwalker-io/unicorn-next';

const form = '#admin-form';
const { tooltip } = await useUIBootstrap5();
await useGridComponent(form);

tooltip();
disableOnSubmit(form);
useCheckboxesMultiSelect(form);
