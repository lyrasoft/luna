/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const fusion = require('windwalker-fusion');

// The task `js`
fusion.task('js', function () {
  // Watch start
  fusion.watch([
    'asset/src/**/*.js'
  ]);
  // Watch end

  // Compile Start
  fusion.babel(
    [
      // Mixin (Make sure this go first)
      'asset/src/admin/page-builder/addons/_base.js',

      // Addons
      'asset/src/admin/page-builder/addons/_text.js',

      // Widgets
      'asset/src/admin/page-builder/widgets/_single-image.js',
      'asset/src/admin/page-builder/widgets/_title-options.js',
      'asset/src/admin/page-builder/widgets/_animation.js',
      'asset/src/admin/page-builder/widgets/_gradient.js',
      'asset/src/admin/page-builder/widgets/_rwd-group.js',
      'asset/src/admin/page-builder/widgets/_box-offset.js',
      'asset/src/admin/page-builder/widgets/_button-radio.js',

      // Directives
      'asset/src/admin/page-builder/directives/_tinymce.js',
      'asset/src/admin/page-builder/directives/_colorpicker.js',

      // Main components
      'asset/src/admin/page-builder/component/_addon-edit.js',
      'asset/src/admin/page-builder/component/_addon.js',
      'asset/src/admin/page-builder/component/_column-edit.js',
      'asset/src/admin/page-builder/component/_column.js',
      'asset/src/admin/page-builder/component/_row-edit.js',
      'asset/src/admin/page-builder/component/_row.js',
      'asset/src/admin/page-builder/page-builder.js',
    ],
    'src/Resources/asset/js/admin/page-builder/page-builder.js'
  );
  // Compile end
});

// The task `scss`
fusion.task('scss', function () {
  // Watch start
  fusion.watch([
    'asset/scss/**/*.scss'
  ]);
  // Watch end

  // Compile Start
  fusion.sass('asset/scss/**/*.scss', 'src/Resources/asset/css/', { rebase: false });
  // Compile end
});

// The task `install`
fusion.task('install', function () {
  const nodePath = 'node_modules';
  const destPath = 'src/Resources/asset';

  fusion.copy(`${nodePath}/vuedraggable/dist/*`, `${destPath}/js/vue/`);
  fusion.copy(`${nodePath}/sortablejs/*.js`, `${destPath}/js/sortablejs/`);
  fusion.copy(`${nodePath}/vue-slide-bar/dist/*`, `${destPath}/js/vue/`);
  fusion.copy(`${nodePath}/animate.css/*.css`, `${destPath}/css/animate/`);
  fusion.copy(`${nodePath}/wowjs/dist/*.js`, `${destPath}/js/wow/`);
  fusion.copy(`${nodePath}/vide/dist/*.js`, `${destPath}/js/vide/`);
});

fusion.default(['js', 'scss']);

/*
 * APIs
 *
 * Compile entry:
 * fusion.js(source, dest, options = {})
 * fusion.babel(source, dest, options = {})
 * fusion.ts(source, dest, options = {})
 * fusion.typeScript(source, dest, options = {})
 * fusion.css(source, dest, options = {})
 * fusion.less(source, dest, options = {})
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
 * fusion.task(name, deps, fn)
 * fusion.watch(glob, opt, fn)
 *
 * Stream Helper:
 * fusion.through(handler) // Same as through2.obj()
 *
 * Config:
 * fusion.disableNotification()
 * fusion.enableNotification()
 */
