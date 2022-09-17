/**
 * Part of Windwalker Fusion project.
 *
 * @copyright  Copyright (C) 2021 LYRASOFT.
 * @license    MIT
 */

import fusion, { sass, babel, parallel, wait } from '@windwalker-io/fusion';
import { jsSync, installVendors } from '@windwalker-io/core';
import path from 'path';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export async function css() {
  // Watch start
  fusion.watch('scss/**/*.scss');
  // Watch end

  // Compile Start
  sass('scss/page-builder-admin.scss', 'dist/', { minify: 'separate_file' });
  sass('scss/page.scss', 'dist/', { minify: 'separate_file' });
  sass('scss/flag-icon.scss', 'dist/', { minify: 'separate_file' });
  // Compile end
}

export async function js() {
  // Watch start
  fusion.watch('src/js/**/*.js');
  // Watch end

  // Compile Start
  babel('src/js/**/*.{js,mjs}', 'dist/', { module: 'systemjs' });
  // Compile end
}

export async function vue() {
  // Watch start
  fusion.watch(['scss/**/*.scss', 'src/vue/**/*']);
  // Watch end

  // Compile Start
  const p = fusion.vue(
    'src/vue/entries/**/*.js',
    'dist/',
    {
      override: (config) => {
        config.resolve.alias = {
          // 'vue$': path.resolve('src/vue/services/vue-adapter.js'),
          '@': path.resolve(path.resolve(), './src/vue/') // Will be overwrite when compile
        }

        config.externals = {
          vue: 'Vue'
        };

        config.plugins.push(
          new BundleAnalyzerPlugin()
        );

        config.plugins.push(
          new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: true,
          })
        )
      },
    }
  );

  return wait(p);
  // Compile end
}

export default parallel(
  css,
  js,
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
