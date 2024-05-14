import { webpackVueBundle } from '@windwalker-io/fusion';
import { resolve } from 'path';

export async function vuePageBuilder() {
  return buildVue(
    'src/vue/entries/page-builder.js',
    'dist/page-builder.js',
    (config) => {
      config.output.chunkFilename = process.env.NODE_ENV === 'production'
        ? 'page/chunk-vendor.[name].js'
        : 'dev/page-vendor.[name].js';
    }
  );
}

function buildVue(src, dest, override) {
  return webpackVueBundle(
    src,
    dest,
    (config) => {
      config.resolve.alias = {
        '@': resolve(resolve(), './src/vue/'),
        // '@vue': resolve(resolve(), './resources/assets/vue/'),
      };

      config.output.clean = false;

      // Exclude Vue
      config.externals = { vue: 'Vue' };

      // Use tsconfig.vue.json if exists, default is tsconfig.json
      config.module.rules[4].options.configFile = 'tsconfig.json';

      // Override if you need
      if (override) {
        override(config);
      }
    }
  );
}
