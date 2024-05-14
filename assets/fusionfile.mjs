import fusion, { sass, babel, parallel, wait, ts } from '@windwalker-io/fusion';
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
  fusion.watch('src/js/**/*.{js,mjs,ts}');
  // Watch end

  // Compile Start
  return wait(
    babel('src/js/**/*.{js,mjs}', 'dist/', { module: 'systemjs' }),
    ts(['src/js/**/*.ts', 'src/**/*.d.ts'], 'dist/', { tsconfig: './tsconfig.json' }),
  );
  // Compile end
}

export * from './build/vue-tasks.mjs';
import * as vueTasks from './build/vue-tasks.mjs';

// compile vue
export const vue = parallel(
  ...Object.values(vueTasks)
);

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
