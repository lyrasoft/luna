import { simpleAlert, uid, useHttpClient } from '@windwalker-io/unicorn-next';
import { startsWith } from 'lodash-es';
import { Addon, AddonOptions, Column, MaybeArray, Row } from '~luna/types';

export function usePageBuilderUtilities() {
  return {
    bindSaveButton,
    savePage,
    addTextToClipboard,
    readClipboard,
    duplicateAny,
    duplicateRow,
    duplicateColumn,
    duplicateAddon,
    toFormData,
    isRow,
    isColumn,
    isAddon,
    emptyRow,
    emptyColumn,
    addonBasicOptions
  };
}

export function bindSaveButton() {
  const $btn = document.querySelector<HTMLButtonElement>('[data-task=save]');

  if (!$btn) {
    return;
  }

  let className: string = '';
  $btn.addEventListener('click', async () => {
    const $icon = $btn.querySelector<HTMLSpanElement>('[data-spinner]');

    $btn.disabled = true;

    if ($icon) {
      className = $icon.getAttribute('class')!;
      $icon.setAttribute('class', 'spinner-border spinner-border-sm');
    }

    try {
      const res = await savePage();
      console.log('Save Success!');
      return res;
    } finally {
      $btn.disabled = false;

      if ($icon) {
        $icon.setAttribute('class', className);
      }
    }
  });
}

let previousContent = '';

export async function savePage() {
  const contentInput = document.querySelector<HTMLTextAreaElement>('#input-item-content')!;

  if (previousContent !== '' && previousContent === contentInput.value) {
    console.warn('[Page] Content not change, there was an error or you didn\'t edit anything.');
  }

  const { post, isAxiosError } = await useHttpClient();

  try {
    const res = await post(
      '@page_ajax/savePage',
      new FormData(document.querySelector<HTMLFormElement>('#admin-form')!)
    );

    console.log('儲存完成');

    if (res.data.data.redirect) {
      location.href = res.data.data.redirect;
    }

    return res;
  } catch (e) {
    previousContent = contentInput.value;
    console.error(e);

    if (isAxiosError(e)) {
      simpleAlert(e.message, '', 'warning');
    }
  }
}

export function addTextToClipboard(text: any) {
  if (typeof text !== 'string') {
    text = JSON.stringify(text, null, 4);
  }

  return navigator.clipboard.writeText(text);
}

export function readClipboard(): Promise<string> {
  return navigator.clipboard.readText();
}

export function duplicateAny<T extends MaybeArray<Row>>(data: T, child?: boolean): T;
export function duplicateAny<T extends MaybeArray<Column>>(data: T, child?: boolean): T;
export function duplicateAny<T extends MaybeArray<Addon>>(data: T, child?: boolean): T;
export function duplicateAny(data: any, child = false): any {
  data = JSON.parse(JSON.stringify(data));

  if (Array.isArray(data)) {
    return data.map((datum) => duplicateAny(datum));
  }

  if (isRow(data)) {
    return duplicateRow(data);
  }

  if (isColumn(data)) {
    return duplicateColumn(data as Column);
  }

  if (isAddon(data)) {
    return duplicateAddon(data as Addon, child);
  }

  throw new Error('Unable to duplicate this type.');
}

export function duplicateRow(row: Row) {
  row = JSON.parse(JSON.stringify(row));

  row.id = 'row-' + uid();

  row.columns = row.columns.map((column) => duplicateColumn(column));

  return row;
}

export function duplicateColumn(column: Column): Column {
  column = JSON.parse(JSON.stringify(column));

  column.id = 'col-' + uid();

  column.addons = column.addons.map((addon) => duplicateAddon(addon))
    .filter((addon) => addon != null);

  return column;
}

export function duplicateAddon<T extends Row | Addon>(item: T, child = false): T | null {
  let newItem = JSON.parse(JSON.stringify(item));

  if (item.type === 'row' || startsWith(item.id, 'row-')) {
    // Row
    if (child) {
      console.log('Cannot add row to child column.');
      return null;
    }

    newItem.type = 'row';

    newItem = duplicateRow(newItem);
  } else {
    // Addon
    newItem.id = 'addon-' + uid();
  }

  return newItem;
}

export function toFormData(data: Record<string, any>) {
  const form = new FormData();

  for (const k in data) {
    form.append(k, data[k]);
  }

  return form;
}

export function isRow(data: Row | Column | Addon): data is Row {
  return startsWith(data.id, 'row-');
}

export function isColumn(data: Row | Column | Addon): data is Column {
  return startsWith(data.id, 'col-');
}

export function isAddon(data: Row | Column | Addon): data is Addon {
  return startsWith(data.id, 'addon-');
}

export function emptyRow(): Row {
  return {
    id: 'row-' + uid(),
    disabled: false,
    options: {
      label: '',
      title: {
        text: '',
        element: 'h3',
        font_size: {
          lg: '',
          md: '',
          xs: ''
        },
        font_weight: '',
        color: '',
        margin_top: {
          lg: '',
          md: '',
          xs: ''
        },
        margin_bottom: {
          lg: '',
          md: '',
          xs: ''
        }
      },
      subtitle: {
        text: '',
        font_size: {
          lg: '',
          md: '',
          xs: ''
        }
      },
      html_id: '',
      html_class: '',
      html_css: '',
      title_align: 'center',
      valign: 'top',
      justify_content: 'start',
      fluid_row: false,
      no_gutter: false,
      padding: {
        lg: '',
        md: '',
        xs: ''
      },
      margin: {
        lg: '',
        md: '',
        xs: ''
      },
      display: {
        xs: 'd-block',
        md: 'd-md-block',
        lg: 'd-lg-block'
      },
      text_color: '',
      background: {
        type: 'none',
        color: '',
        image: {
          url: '',
          overlay: '',
          repeat: '',
          position: 'center center',
          attachment: 'inherit',
          size: 'cover'
        },
        gradient: {
          type: 'liner',
          angle: '',
          start_color: '',
          start_pos: '',
          end_color: '',
          end_pos: ''
        },
        video: {
          url: '',
          overlay: ''
        },
        overlay: '',
        parallax: false
      },
      animation: {
        name: '',
        duration: 300,
        delay: 0
      }
    },
    columns: [],
  };
}

export function emptyColumn(child = false): Column {
  return {
    id: 'col-' + uid(),
    disabled: false,
    addons: [],
    options: {
      html_class: '',
      html_css: '',
      align: '',
      valign: 'top',
      padding: {
        xs: '',
        md: '',
        lg: '',
      },
      margin: {
        xs: '',
        md: '',
        lg: '',
      },
      text_color: '',
      width: {
        xs: '',
        md: '',
        lg: child ? 'col-lg-6' : 'col-lg-3',
      },
      display: {
        xs: 'd-block',
        md: 'd-md-block',
        lg: 'd-lg-block'
      },
      box_shadow: {
        enabled: 0,
        color: 'rgba(0, 0, 0, 1)',
        hoffset: 0,
        voffset: 0,
        blur: 0,
        spread: 0
      },
      border: {
        enabled: 0,
        width: {
          lg: 1,
          md: 1,
          xs: 1,
        },
        color: '',
        style: '',
        radius: {
          lg: 0,
          md: 0,
          xs: 0,
        }
      },
      background: {
        type: 'none',
        color: '',
        overlay: '',
        image: {
          url: '',
          repeat: '',
          position: 'center center',
          attachment: 'inherit',
          size: 'cover',
          overlay: '',
        },
        gradient: {
          type: 'liner',
          angle: '',
          start_color: '',
          start_pos: '',
          end_color: '',
          end_pos: ''
        },
        video: {
          url: '',
          overlay: ''
        },
        parallax: false
      },
      animation: {
        name: '',
        duration: 300,
        delay: 0
      }
    }
  };
}

export function addonBasicOptions(): AddonOptions {
  return {
    html_class: '',
    html_css: '',
    label: '',
    title: {
      text: '',
      element: 'h3',
      font_size: {
        lg: '',
        md: '',
        xs: ''
      },
      font_weight: '',
      color: '',
      margin_top: {
        lg: '',
        md: '',
        xs: ''
      },
      margin_bottom: {
        lg: '',
        md: '',
        xs: ''
      }
    },
    align: '',
    // valign: 'top',
    padding: {
      xs: '',
      md: '',
      lg: '',
    },
    margin: {
      xs: '',
      md: '',
      lg: '',
    },
    text_color: '',
    display: {
      xs: 'd-block',
      md: 'd-md-block',
      lg: 'd-lg-block'
    },
    box_shadow: {
      enabled: 0,
      color: 'rgba(0, 0, 0, 1)',
      hoffset: 0,
      voffset: 0,
      blur: 0,
      spread: 0
    },
    border: {
      enabled: 0,
      width: {
        lg: 1,
        md: 1,
        xs: 1,
      },
      color: '',
      style: '',
      radius: {
        lg: 0,
        md: 0,
        xs: 0,
      }
    },
    background: {
      type: 'none',
      color: '',
      overlay: '',
      image: {
        url: '',
        repeat: '',
        position: 'center center',
        attachment: 'inherit',
        size: 'cover',
        overlay: '',
      },
      gradient: {
        type: 'liner',
        angle: '',
        start_color: '',
        start_pos: '',
        end_color: '',
        end_pos: ''
      },
      video: {
        url: '',
        overlay: ''
      },
      parallax: false
    },
    animation: {
      name: '',
      duration: 300,
      delay: 0
    }
  };
}

