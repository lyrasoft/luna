import {
  data,
  useBs5Tooltip,
  useDisableIfStackNotEmpty,
  useDisableOnSubmit,
  useForm,
  useFormComponent,
  useFormValidation,
  useFormValidationSync,
  useKeepAlive,
  useTomSelect
} from '@windwalker-io/unicorn-next';

const formSelector = '#admin-form';

useBs5Tooltip();

useFormComponent(formSelector);

useFormValidation().then(() => useDisableOnSubmit(formSelector));

useDisableIfStackNotEmpty();

useKeepAlive(location.href);

useTomSelect('.js-tom-select');

// Menu control
const currentType = data('current.type');
const typeField = document.querySelector<HTMLInputElement>('#input-item-type')!;

typeField.addEventListener('change', (e) => {
  if (typeField.value !== '' && typeField.value !== currentType) {
    const v = useFormValidationSync(formSelector)!;
    v.options.enabled = false;

    useForm(formSelector)?.post(null, { task: 'switch_type' });
  }
});

const currentView = data('current.view');
const viewField = document.querySelector<HTMLInputElement>('#input-item-view')!;

viewField.addEventListener('change', (e) => {
  if (viewField.value !== '' && viewField.value !== currentView) {
    const v = useFormValidationSync(formSelector)!;
    v.options.enabled = false;

    useForm(formSelector)?.post(null, { task: 'switch_type' });
  }
});
