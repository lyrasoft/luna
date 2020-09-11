/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2020 .
 * @license    __LICENSE__
 */

import 'codemirror/mode/css/css.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

export const CodeMirrorOptions = {
  tabSize: 2,
  mode: 'text/css',
  styleActiveLine: true,
  theme: 'material',
  lineNumbers: true,
  line: true,
  height: '450px'
};

/**
 * @param {codemirror|Vue} component
 * @param {number} delay
 */
export function refreshCodeMirror(component, delay = 1) {
  setTimeout(() => {
    component.codemirror.refresh();
  }, delay);
}
