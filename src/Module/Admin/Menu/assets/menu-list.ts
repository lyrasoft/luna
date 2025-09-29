import {
  route,
  useBs5Tooltip,
  useCheckboxesMultiSelect,
  useDisableOnSubmit,
  useGridComponent,
} from '@windwalker-io/unicorn-next';

const formSelector = '#admin-form';

useBs5Tooltip();

useGridComponent(formSelector);

useDisableOnSubmit(formSelector);

useCheckboxesMultiSelect(formSelector);

// Switch type
const selfRoute = route('self');

const typeField = document.querySelector<HTMLInputElement>('#input-type')!;

typeField.addEventListener('change', () => {
  const type = typeField.value;

  if (type) {
    location.href = selfRoute.replace(/\{\{type\}\}/, type);
  }
});
