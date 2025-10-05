import { resolve, basename } from 'node:path';
import { rimraf } from 'rimraf';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    base: './',
    resolve: {
      alias: {
        // '@': resolve('./src'),
      }
    },
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        // preserveEntrySignatures: 'strict',
        input: {
          'flag-icon': 'scss/flag-icon.scss',
          page: 'scss/page.scss',
          // 'page-builder-admin': 'scss/page-builder-admin.scss'
        },
        output: {
          format: 'es',
          entryFileNames: '[name].js',
          chunkFileNames(chunkInfo) {
            return '[name].js';
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith('.css')) {
              return '[name][extname]';
            }

            return 'assets/[name][extname]';
          },
          // preserveModules: true,       // 保留模組結構
          // preserveModulesRoot: 'src/unicorn',
        },
      },
      outDir: 'dist',
      emptyOutDir: false,
      sourcemap: 'external',
      minify: mode === 'production',
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import']
        },
      },
    },
    plugins: [
      {
        name: 'clear-files',
        generateBundle() {
          rimraf.sync('./dist/assets/**/*', { glob: true });
          rimraf.sync('./dist/page.css', { glob: true });
          rimraf.sync('./dist/flag-icon.css', { glob: true });
        }
      }
    ]
  };
});

