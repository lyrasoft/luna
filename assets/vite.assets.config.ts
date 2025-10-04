import { resolve, basename } from 'node:path';
import { rimraf } from 'rimraf';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const src = resolve('./src').replace(/\\/g, '/');

  return {
    resolve: {
      alias: {
        // '@': resolve('./src'),
      }
    },
    build: {
      rollupOptions: {
        // preserveEntrySignatures: 'strict',
        input: {
          switcher: 'scss/switcher.scss',
          editor: 'scss/editor.scss',
          menu: 'scss/bootstrap/multi-level-menu.scss'
        },
        output: {
          format: 'es',
          entryFileNames: '[name].js',
          chunkFileNames(chunkInfo) {
            return '[name].js';
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.originalFileName) {
              return basename(assetInfo.originalFileName, '.scss') + '[extname]';
            }

            return 'assets/[name][extname]';
          },
          // preserveModules: true,       // 保留模組結構
          // preserveModulesRoot: 'src/unicorn',
        },
      },
      outDir: 'dist',
      emptyOutDir: false,
      minify: mode === 'production',
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import']
        },
      }
    },
    plugins: [
      {
        name: 'clear-files',
        generateBundle() {
          rimraf.sync('./dist/**/*.css', { glob: true });
          rimraf.sync('./dist/**/*.scss', { glob: true });
        }
      }
    ]
  };
});

