import { data, route, useSystemUri } from '@windwalker-io/unicorn-next';
import { useTinymce } from '@windwalker-io/unicorn-next/src/composable/useTinymce';
import { defaultsDeep } from 'lodash-es';
import { ObjectDirective } from 'vue';
import type { Editor } from 'tinymce';

const uri = useSystemUri();

export default <ObjectDirective<HTMLTextAreaElement>> {
  async mounted(el) {
    const options = defaultsDeep(
      {},
      data('tinymce_options') || {},
      {
        license_key: 'gpl',
        target: el,
        height: 500,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
          'preview', 'anchor', 'pagebreak', 'searchreplace', 'wordcount',
          'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
          'media', 'nonbreaking', 'save', 'table', 'directionality',
          'emoticons',
        ],
        toolbar:
          'bold italic strikethrough forecolor backcolor blockquote removeformat | ' +
          'styles fontsize | ' +
          'alignleft aligncenter alignright alignjustify bullist numlist outdent indent | ' +
          'link image media table code | fullscreen',
        toolbar_mode: 'sliding',
        font_size_formats: '13px 14px 15px 16px 18px 20px 22px 28px 36px 48px',
        menubar: false,
        content_css: data('tinymce_content_css'),
        document_base_url: uri.root(),
        paste_data_images: true,
        remove_script_host: true,
        relative_urls: true,
        convert_urls: true,
        entity_encoding: 'raw',
        table_header_type: 'sectionCells',
        table_class_list: [
          { title: 'BS Simple', value: 'table' },
          { title: 'BS Striped', value: 'table table-striped' },
          { title: 'BS Bordered', value: 'table table-bordered' },
          { title: 'BS Striped Bordered', value: 'table table-striped table-bordered' },
          { title: 'None', value: '' },
        ],
        images_upload_url: route('@file_upload'),
        setup: function (editor: Editor) {
          editor.on('change undo redo', (e: any) => {
            el.value = editor.getContent();
            el.dispatchEvent(new Event('change', { bubbles: true }));
            el.dispatchEvent(new Event('input', { bubbles: true }));
          });
          editor.on('input', (e: any) => {
            el.value = editor.getContent();
            el.dispatchEvent(new Event('input', { bubbles: true }));
          });
          editor.on('keydown', (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 's') {
              event.preventDefault();
              event.stopImmediatePropagation();
              el.dispatchEvent(
                new KeyboardEvent('keydown', {
                  bubbles: true,
                  metaKey: event.metaKey,
                  ctrlKey: event.ctrlKey,
                  key: 's',
                  code: 'KeyS',
                })
              );
            }
          })
          // editor.shortcuts.remove('meta+s');
          // editor.shortcuts.remove('ctrl+s');
        }
      }
    );

    const { create } = await useTinymce();
    create(el, options);

    // u.$ui.tinymce.loadTinymce().then(() => {
    //   tinymce.remove();
    //   u.$ui.tinymce.create(el, options);
    // });
  }
};

document.addEventListener('focusin', (e) => {
  if ((e.target as HTMLElement).closest('.mce-window, .tox-tinymce, .tox-tinymce-aux, .moxman-window, .tam-assetmanager-root') !== null) {
    e.stopImmediatePropagation();
  }
});
