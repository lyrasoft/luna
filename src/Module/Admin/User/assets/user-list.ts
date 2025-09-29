import {
  selectAll,
  simpleAlert,
  useBs5Tooltip,
  useCheckboxesMultiSelect,
  useDisableOnSubmit,
  useGrid,
  useGridComponent,
  useUniDirective
} from '@windwalker-io/unicorn-next';
import { Modal } from 'bootstrap';

const formSelector = '#admin-form';

useBs5Tooltip();

useGridComponent(formSelector);

useDisableOnSubmit(formSelector);

useCheckboxesMultiSelect(formSelector);

// User Switch
const $modal = document.querySelector<HTMLDivElement>('#user-switch-modal')!;
const $switchUserId = $modal.querySelector<HTMLInputElement>('[data-role=user_id]')!;

$modal.addEventListener('hidden.bs.modal', () => {
  $switchUserId.value = '';
});

useUniDirective<HTMLButtonElement>('user-switch-button', {
  mounted(el, { value }) {
    value = JSON.parse(value || '{}');
    el.addEventListener('click', () => {
      Modal.getOrCreateInstance($modal).show();
      $switchUserId.value = value.id;
      $modal.querySelector('[data-role=user_name]')!.textContent = value.name;
    });
  },
  updated(el, bindings) {
    console.log(bindings);
  }
});

useUniDirective('user-switch-modal', {
  mounted(el, { value }) {
    selectAll<HTMLButtonElement>('[data-role=switch_button]', ($btn) => {
      $btn.addEventListener('click', async (e) => {
        const stage = $btn.dataset.stage;
        const options = JSON.parse($btn.dataset.options || '{}');

        if ($switchUserId.value !== '') {
          const grid = await useGrid(formSelector);

          grid?.updateItemByTask('switchUser', $switchUserId.value, null, { stage, options });
        } else {
          simpleAlert('No user ID');
        }
      });
    });
  }
});
