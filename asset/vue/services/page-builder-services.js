import { startsWith } from 'lodash';

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2020 .
 * @license    __LICENSE__
 */

export default class PageBuilderService {
  static bindSaveButton() {
    const $btn = $('.phoenix-btn-save');
    const $icon = $btn.find('[data-spinner]');
    let className = '';
    $btn.on('click', () => {
      $btn.attr('disabled', true);
      className = $icon.attr('class');
      $icon.attr('class', 'spinner-border spinner-border-sm');

      this.save()
        .then(() => {
          console.log('儲存成功');
        })
        .always(() => {
          $btn.attr('disabled', false);
          $icon.attr('class', className);
        });
    });
  }

  static save() {
    return Phoenix.Ajax.post(
      Phoenix.route('page_ajax', { task: 'savePage' }),
      $('#admin-form').serialize()
    )
      .done(() => {
        console.log('儲存完成');
      })
      .fail((e) => {
        console.error(e);
        swal(e.statusText, '', 'warning');
      });
  }

  static addToClipboard(text) {
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
  static paste() {
    return navigator.clipboard.readText()
      .catch(err => {
        console.error('Failed to read clipboard contents: ', err);
      });
  }

  static duplicateAddon(item, child = false) {
    const newItem = JSON.parse(JSON.stringify(item));

    if (item.type === 'row' || startsWith(item.id, 'row-')) {
      if (child) {
        console.log('Cannot add row to child column.');
        return null;
      }

      newItem.id = 'row-' + Phoenix.uniqid();
      newItem.type = 'row';
    } else {
      newItem.id = 'addon-' + Phoenix.uniqid();
    }

    return newItem;
  }
}
