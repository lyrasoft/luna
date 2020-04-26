/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2020 .
 * @license    __LICENSE__
 */

export let swal;

$(() => {
  // Polyfill sweetalert
  swal = window.swal || function swal(title, message = null) {
    alert(title + ' / ' + message);
  };
});

export const itemStates = {
  NEW: 'new',
  UPLOADING: 'uploading',
  COMPLETED: 'completed',
  FAIL: 'fail',
  STOP: 'stop',
};

export function isImage(filePath) {
  const ext = filePath.split('.').pop().split('?').shift();

  const allow = [
    'png',
    'jpeg',
    'jpg',
    'gif',
    'bmp',
    'webp',
  ];

  return allow.indexOf(ext) !== -1;
}
