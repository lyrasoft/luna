import vuePlugin from '@vitejs/plugin-vue';
import { resolve, basename, relative } from 'node:path';
import { rimraf } from 'rimraf';
import { defineConfig } from 'vite';
import dts from 'unplugin-dts/vite';

export default defineConfig(({ mode }) => {
  const src = resolve('./src').replace(/\\/g, '/');

  return {
    resolve: {
      alias: {
        '~luna': resolve('./src'),
      }
    },
    build: {
      lib: {
        entry: 'src/page-builder.ts',
        name: 'PageBuilder',
        formats: ['es'],
      },
      rollupOptions: {
        // preserveEntrySignatures: 'strict',
        // input: {
        //   unicorn: 'src/unicorn/unicorn.ts',
        // },
        output: {
          format: 'es',
          entryFileNames: 'page-builder.js',
          chunkFileNames(chunkInfo) {
            // if (chunkInfo.facadeModuleId && chunkInfo.facadeModuleId.includes('/module/')) {
            //   const relPath = chunkInfo.facadeModuleId.replace(src + '/', '');
            //   const dir = relPath.split('/').slice(0, -1).join('/');
            //   const filename = basename(relPath, '.ts');
            //
            //   return `${dir}/${filename}.js`;
            // }

            return 'chunks/[name].js';
          },
          assetFileNames: (info) => {
            if (info.originalFileNames[0] === 'style.css') {
              return 'page-builder-admin.css';
            }

            return 'assets/[name][extname]';
          },
          // preserveModules: true,
          // preserveModulesRoot: 'src/unicorn',
          // manualChunks(id) {
          //   if (!/node_modules/.test(id)) {
          //     const chunk = relative(process.cwd() + '/src/', id).replace(/\\/g, '/');
          //     if (chunk.startsWith('.')) {
          //       return undefined;
          //     }
          //
          //     if (chunk.includes('ts-mixer')) {
          //       return 'ts-mixer';
          //     }
          //
          //     // Remove any extension
          //     return chunk.replace(/\.[^/.]+$/, '');
          //   }
          // }
        },
        external: [
          '@windwalker-io/unicorn-next',
          'node:crypto',
          '@unicorn/*',
          'bootstrap',
          'sortablejs',
          '@asika32764/vue-animate',
          'bootstrap',
          'vue',
          'vue-draggable-plus',
          'vue-multi-uploader'
        ]
      },
      outDir: 'dist',
      emptyOutDir: false,
      sourcemap: 'external',
      minify: false,
      cssCodeSplit: false
    },
    plugins: [
      vuePlugin({
        features: {
          prodDevtools: true,
        }
      }),
      // dts({
      //   // entryRoot: './src/unicorn/unicorn.ts',
      //   insertTypesEntry: true,
      //   outDir: 'dist',
      //   tsconfigPath: resolve('./tsconfig.json'),
      //   bundleTypes: true,
      //   // rollupTypes: true
      // }),
      {
        name: 'clear-files',
        generateBundle() {
          // rimraf.sync('./dist/**/*.js', { glob: true });
          // rimraf.sync('./dist/**/*.ts', { glob: true });
        }
      }
    ]
  };
});

