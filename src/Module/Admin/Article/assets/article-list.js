/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

import u from '@main';
import $ from '@jquery';
import { Foo } from '@vendor/foo/lib.umd.js';

const foo = new Foo($('.foo'));

const res = await foo.handle();

u.$ui.bootstrap.tooltip();

const form = '#admin-form';

u.grid(form).initComponent();
u.$ui.disableOnSubmit(form);
u.$ui.checkboxesMultiSelect(form);
