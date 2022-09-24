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

import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/css/css.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/theme/material.css';

export default CodeMirror;

/**
 * @param {codemirror|Vue} component
 * @param {number} delay
 */
export function refreshCodeMirror(component, delay = 1) {
  setTimeout(() => {
    component.codemirror.refresh();
  }, delay);
}
