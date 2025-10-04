/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2020 .
 * @license    __LICENSE__
 */

export const CodeMirrorOptions = {
  tabSize: 2,
  mode: 'text/x-scss',
  styleActiveLine: true,
  theme: 'material',
  lineNumbers: true,
  line: true,
  height: '450px',
  autoCloseBrackets: true,
};

import { injectCssToDocument } from '@windwalker-io/unicorn-next';
import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/addon/edit/closebrackets.js';
import css from 'codemirror/lib/codemirror.css?inline';
import materialCss from 'codemirror/theme/material.css?inline';

injectCssToDocument(css, materialCss);

export { CodeMirror };

// export function refreshCodeMirror(component, delay = 1) {
//   setTimeout(() => {
//     component.codemirror.refresh();
//   }, delay);
// }
