/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(() => {
  Vue.component('addon-feature', {
    template: '#addon-tmpl-feature',
    mixins: [LunaAddonMixin],
    data() {
      return {
        options: {
          link: '',
          link_element: 'title',
          layout_type: 'icon',
          image: '',
          icon: {
            name: 'fa fa-star',
            border: {
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
            font_size: {
              lg: '',
              md: '',
              xs: ''
            },
            color: '',
            bg_color: '',
            margin_top: '',
            margin_bottom: '',
            padding: {
              lg: '',
              md: '',
              xs: ''
            }
          },
          content: '大哉乾元，萬物資始，山風蠱，山火賁，先天而天弗違，風澤中孚，水地比利見大人，雷天大壯，堅冰至，' +
            '風澤中孚，利永貞，元亨利貞，山天大畜天雷無妄，地澤臨，地山謙，履霜，水火既濟，水火既濟，利永貞聖人作，' +
            '積善之家，六二之動，風地觀，山澤損，賢人在下，火山旅必有餘慶，山水蒙，同氣相求，厚德載物，天風姤，風天小畜，' +
            '無咎無譽龍戰於野，雷水解，風從虎，天地否，地天泰，元亨利貞',
          content_font_size: {
            lg: '',
            md: '',
            xs: ''
          },
          content_line_height: {
            lg: '',
            md: '',
            xs: ''
          },
        }
      }
    }
  });
});
