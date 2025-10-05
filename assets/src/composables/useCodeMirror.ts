import { injectCssToDocument } from '@windwalker-io/unicorn-next';
// import CodeMirror from 'codemirror/lib/codemirror.js';
// import 'codemirror/mode/css/css.js';
// import 'codemirror/addon/edit/closebrackets.js';
// import css from 'codemirror/lib/codemirror.css?inline';
// import materialCss from 'codemirror/theme/material.css?inline';

const CodeMirrorOptions = {
  tabSize: 2,
  mode: 'text/x-scss',
  styleActiveLine: true,
  theme: 'material',
  lineNumbers: true,
  line: true,
  height: '450px',
  autoCloseBrackets: true,
};

export async function useCodeMirror() {
  const { default: CodeMirror } = await import('codemirror/lib/codemirror.js');

  await Promise.all([
    import('codemirror/mode/css/css.js'),
    import('codemirror/addon/edit/closebrackets.js'),
    import('codemirror/lib/codemirror.css?inline').then((m) => injectCssToDocument(m.default)),
    import('codemirror/theme/material.css?inline').then((m) => injectCssToDocument(m.default)),
  ]);

  return { CodeMirror, CodeMirrorOptions };
}
