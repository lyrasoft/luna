import {
  disableOnSubmit,
  useBs5Tooltip,
  useCheckboxesMultiSelect,
  useGridComponent,
} from '@windwalker-io/unicorn-next';

const form = '#admin-form';

useBs5Tooltip();
useGridComponent(form);
disableOnSubmit(form);
useCheckboxesMultiSelect(form);
