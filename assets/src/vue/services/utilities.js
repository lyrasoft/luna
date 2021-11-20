/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

import { truncate as t } from 'lodash-es';

export function truncate(s, length = 100) {
  const options = {
    length,
    omission: '...'
  };

  return t(s, options)
}
