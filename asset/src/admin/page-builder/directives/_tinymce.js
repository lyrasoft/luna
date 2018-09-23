/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(() => {
  Vue.directive('tinymce', {
    inserted(el) {
      tinymce.remove();

      tinymce.init({
        target: el,
        height: 350,
        plugins: [
          'advlist autolink lists link image charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen',
          'insertdatetime media nonbreaking save table contextmenu directionality',
          'emoticons template paste textcolor colorpicker textpattern imagetools',
        ],
        images_upload_url: Phoenix.route('addon-text:image-upload-url'),
        images_upload_handler: function (blobInfo, success, failure) {
          var editorElement = jQuery(el);

          editorElement.trigger('image-upload-start');

          var xhr, formData;

          xhr = new XMLHttpRequest;
          xhr.withCredentials = false;
          xhr.open('POST', Phoenix.route('addon-text:image-upload-url'));

          xhr.onload = function() {
            var json;
            editorElement.trigger('image-upload-complete');

            if (xhr.status !== 200) {
              failure('HTTP Error: ' + decodeURIComponent(xhr.statusText));
              editorElement.trigger('image-upload-error');
              return;
            }

            json = JSON.parse(xhr.responseText);

            if (!json || typeof json.data.url !== 'string') {
              failure('Invalid JSON: ' + xhr.responseText);
              console.error('Invalid JSON: ' + xhr.responseText);
              editorElement.trigger('image-upload-error');
              return;
            }

            success(json.data.url);

            editorElement.trigger('image-upload-success');
          };

          formData = new FormData;
          formData.append('file', blobInfo.blob(), blobInfo.filename());

          xhr.send(formData);
        },
        setup: function (editor) {
          editor.on('keyup', () => {
            el.dispatchEvent(new Event('change', {bubbles: true}));
            el.dispatchEvent(new Event('input', {bubbles: true}));
          });
        }
      });
    }
  });
});

$(document).on('focusin', function(e) {
  if ($(e.target).closest(".mce-window").length) {
    e.stopImmediatePropagation();
  }
});
