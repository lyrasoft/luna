/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2020 .
 * @license    __LICENSE__
 */

export function emptyRow() {
  return {
    id: 'row-' + Phoenix.uniqid(),
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

export function emptyColumn(child = false) {
  return {
    id: 'col-' + Phoenix.uniqid(),
    disabled: false,
    addons: [],
    options: {
      html_class: '',
      html_css: '',
      align: 'center',
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
