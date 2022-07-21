/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

export default {
  mounted(el) {
    u.import('@tinymce').then(() => {
      tinymce.remove();
      console.log(u.uri('root'));
      const options = {
        target: el,
        height: 500,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
          'preview', 'anchor', 'pagebreak', 'searchreplace', 'wordcount',
          'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
          'media', 'nonbreaking', 'save', 'table', 'directionality',
          'emoticons', 'template',
        ],
        toolbar: 'undo redo ' +
          'bold italic strikethrough forecolor backcolor removeformat | ' +
          'alignleft aligncenter alignright alignjustify bullist numlist outdent indent | ' +
          'blocks fontsize styles styleselect formatselect fontsizeselect | ' +
          'link image media table code | fullscreen',
        toolbar_mode: 'sliding',
        fontsize_formats: "13px 14px 15px 16px 18px 20px 22px 28px 36px 48px",
        menubar: false,
        content_css: u.data('tinymce_content_css'),
        document_base_url: u.uri('root'),
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
        images_upload_url: u.route('@file_upload'),
        images_upload_handler: Number(tinymce.majorVersion) >= 6
          ? imageUploader
          : (blobInfo, success, failure, progress) => {
            return imageUploader(blobInfo, progress)
              .then((url) => {
                success(url);
                return url;
              })
              .catch((e) => {
                failure(e.message, { remove: true });
                throw e;
              });
          },
        setup: function (editor) {
          editor.on('change', () => {
            el.value = editor.getContent();
            el.dispatchEvent(new Event('change', {bubbles: true}));
            el.dispatchEvent(new Event('input', {bubbles: true}));
          });
        }
      };

      tinymce.init(options);

      function imageUploader(blobInfo, progress) {
        const element = el;

        element.dispatchEvent(new CustomEvent('upload-start'));

        const formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());

        const stack = u.stack('uploading');
        stack.push(true);

        return u.$http.post(
            options.images_upload_url,
            formData,
            {
              withCredentials: false,
              onUploadProgress: (e) => {
                progress(e.loaded / e.total * 100);
              }
            }
          )
          .then((res) => {
            element.dispatchEvent(new CustomEvent('upload-success'));

            return res.data.data.url;
          })
          .catch((e) => {
            const message = e?.response?.data?.message || e.message;
            console.error(e?.response?.data?.message || e.message, e);
            element.dispatchEvent(new CustomEvent('upload-error', { detail: e }));

            return Promise.reject({ message, remove: true });
          })
          .finally(() => {
            element.dispatchEvent(new CustomEvent('upload-complete'));
            stack.pop();
          });
      }
    });
  }
};

document.addEventListener('focusin', (e) => {
  if (e.target.closest('.mce-window')) {
    e.stopImmediatePropagation();
  }
});
