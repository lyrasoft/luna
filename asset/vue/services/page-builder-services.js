import { startsWith } from 'lodash';

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2020 .
 * @license    __LICENSE__
 */

export default class PageBuilderService {
  static rowData(data = {}) {
    return {
      id: 'row-' + Phoenix.uniqid(),
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
        title_align: 'center',
        valign: 'top',
        fluid_row: false,
        no_gutter: false,
        padding: {
          xl: '',
          md: '',
          xs: ''
        },
        margin: {
          xl: '',
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

  static addToClipboard(text) {
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
