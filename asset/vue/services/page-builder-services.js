import { startsWith } from 'lodash';

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2020 .
 * @license    __LICENSE__
 */

export default class PageBuilderService {
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
