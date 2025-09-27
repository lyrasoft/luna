import {
  useBs5Tooltip,
  useCheckboxesMultiSelect,
  useDisableOnSubmit,
  useGridComponent,
} from '@windwalker-io/unicorn-next';

const form = '#admin-form';

useBs5Tooltip();
useGridComponent(form);
useDisableOnSubmit(form);
useCheckboxesMultiSelect(form);
