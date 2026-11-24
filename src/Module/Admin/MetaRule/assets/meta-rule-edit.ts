import {
  useBs5Tooltip,
  useDisableIfStackNotEmpty,
  useDisableOnSubmit,
  useFormComponent,
  useFormValidation,
  useKeepAlive,
} from '@windwalker-io/unicorn-next';

import CodeMirror from 'codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/closetag.js';
import 'codemirror/lib/codemirror.css';

const formSelector = '#admin-form';

useBs5Tooltip();

useFormComponent(formSelector);

useFormValidation().then(() => useDisableOnSubmit(formSelector));

useDisableIfStackNotEmpty();

useKeepAlive(location.href);

function mountCodeEditor(textarea: HTMLTextAreaElement, mode: string | object) {
  const editor = CodeMirror.fromTextArea(textarea, {
    mode,
    lineNumbers: true,
    lineWrapping: true,
    tabSize: 2,
    indentWithTabs: false,
    autoCloseBrackets: true,
    autoCloseTags: true,
  });

  editor.setSize('100%', 220);

  // Sync the textarea while editing, not only on form submit
  editor.on('change', () => editor.save());
}

const customCodeInputs = document.querySelectorAll<HTMLTextAreaElement>(
  'textarea[name="item[custom_codes][head]"], textarea[name="item[custom_codes][body]"]',
);
const jsonLdInputs = document.querySelectorAll<HTMLTextAreaElement>('textarea[name="item[json_ld]"]');

for (const el of customCodeInputs) {
  mountCodeEditor(el, 'htmlmixed');
}

for (const el of jsonLdInputs) {
  mountCodeEditor(el, { name: 'javascript', json: true });
}
