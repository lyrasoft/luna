/**
 * Part of Windwalker Fusion project.
 *
 * @copyright  Copyright (C) 2021 LYRASOFT.
 * @license    MIT
 */

import fusion, { sass, babel, parallel } from '@windwalker-io/fusion';
import { jsSync, installVendors } from '@windwalker-io/core';
import path from 'path';
import webpack from 'webpack';

export async function css() {
  // Watch start
  fusion.watch('scss/**/*.scss');
  // Watch end

  // Compile Start
  sass('scss/page-builder-admin.scss', 'dist/', { minify: 'separate_file' });
  sass('scss/page.scss', 'dist/', { minify: 'separate_file' });
  // Compile end
}

export async function vue() {
  // Watch start
  fusion.watch(['scss/**/*.scss', 'src/vue/**/*']);
  // Watch end

  // Compile Start
  fusion.vue(
    'src/vue/entries/**/*.js',
    'dist/',
    {
      override: (config) => {
        config.resolve.alias = {
          '@': path.resolve(path.resolve(), './src/vue/') // Will be overwrite when compile
        }

        config.plugins.push(
          new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: true,
          })
        )
      },
    }
  );
  // Compile end
}

export default parallel(
  css,
  vue
);

/*
 * APIs
 *
 * Compile entry:
 * fusion.js(source, dest, options = {})
 * fusion.babel(source, dest, options = {})
 * fusion.module(source, dest, options = {})
 * fusion.ts(source, dest, options = {})
 * fusion.typeScript(source, dest, options = {})
 * fusion.css(source, dest, options = {})
 * fusion.sass(source, dest, options = {})
 * fusion.copy(source, dest, options = {})
 *
 * Live Reload:
 * fusion.livereload(source, dest, options = {})
 * fusion.reload(file)
 *
 * Gulp proxy:
 * fusion.src(source, options)
 * fusion.dest(path, options)
 * fusion.watch(glob, opt, fn)
 * fusion.symlink(directory, options = {})
 * fusion.lastRun(task, precision)
 * fusion.tree(options = {})
 * fusion.series(...tasks)
 * fusion.parallel(...tasks)
 *
 * Stream Helper:
 * fusion.through(handler) // Same as through2.obj()
 *
 * Config:
 * fusion.disableNotification()
 * fusion.enableNotification()
 */
