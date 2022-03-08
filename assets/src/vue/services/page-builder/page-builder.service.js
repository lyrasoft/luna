/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

import { startsWith, each } from 'lodash-es';

export function bindSaveButton() {
  const $btn = document.querySelector('[data-task=save]');

  let className = '';
  $btn?.addEventListener('click', () => {
    const $icon = $btn.querySelector('[data-spinner]');

    $btn.disabled = true;
    className = $icon.getAttribute('class');
    $icon.setAttribute('class', 'spinner-border spinner-border-sm');

    savePage()
      .then((res) => {
        console.log('Save Success!');
        return res;
      })
      .finally(() => {
        $btn.disabled = false;
        $icon.setAttribute('class', className);
      });
  });
}

export function savePage() {
  return u.$http.post(
      '@page_ajax/savePage',
      new FormData(document.querySelector('#admin-form'))
    )
    .then((res) => {
      console.log('儲存完成');

      if (res.data.data.redirect) {
        location.href = res.data.data.redirect;
      }

      return res;
    })
    .catch((e) => {
      console.error(e);
      swal(e.message, '', 'warning');
    });
}

export function addTextToClipboard(text) {
  if (typeof text !== 'string') {
    text = JSON.stringify(text, null, 4);
  }

  const el = document.createElement('textarea');
  el.value = text;

  document.body.appendChild(el);

  el.select();

  document.execCommand('copy');

  document.body.removeChild(el);
}

/**
 * @returns {Promise<string>}
 */
export function readClipboard() {
  return navigator.clipboard.readText()
    .catch(err => {
      console.error('Failed to read clipboard contents: ', err);
    });
}

export function duplicateAddon(item, child = false) {
  const newItem = JSON.parse(JSON.stringify(item));

  if (item.type === 'row' || startsWith(item.id, 'row-')) {
    if (child) {
      console.log('Cannot add row to child column.');
      return null;
    }

    newItem.id = 'row-' + u.uid();
    newItem.type = 'row';
  } else {
    newItem.id = 'addon-' + u.uid();
  }

  return newItem;
}

export function toFormData(data) {
  const form = new FormData();

  each(data, (v, k) => {
    form.append(k, v);
  });

  return form;
}

export function emptyRow() {
  return {
    id: 'row-' + u.uid(),
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

export function emptyColumn(child = false) {
  return {
    id: 'col-' + u.uid(),
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
        video: ''
      },
      animation: {
        name: '',
        duration: 300,
        delay: 0
      }
    }
  };
}

export function addonBasicOptions() {
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
        url: ''
      }
    },
    animation: {
      name: '',
      duration: 300,
      delay: 0
    }
  };
}
