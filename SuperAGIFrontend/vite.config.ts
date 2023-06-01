/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react({ plugins: [['@swc/plugin-styled-components', {}]] }), tsconfigPaths()],
	resolve: {
		alias: {
			'devextreme/ui': 'devextreme/esm/ui', /// https://supportcenter.devexpress.com/ticket/details/t1054272/vue3-react-vite-rollup-devextreme-fails-in-production-because-some-modules-do-not-pass
			'@storybook/jest': 'vitest' /// https://github.com/storybookjs/storybook/issues/17326
		}
	},
	build: {
		outDir: './build',
		sourcemap: true, //// mozna wylaczyc
		emptyOutDir: true,
		commonjsOptions: {
			defaultIsModuleExports(id) {
				try {
					// eslint-disable-next-line @typescript-eslint/no-var-requires
					const module = require(id);
					if (module?.default) {
						return false;
					}
					return 'auto';
				} catch (error) {
					return 'auto';
				}
			},
			transformMixedEsModules: true
		}
	},
	server: {
		open: '/',
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:5000',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			},
			'^/[\\d]+$': {
				target: 'http://127.0.0.1:5000',
				changeOrigin: true,
				rewrite: (path) => {
					return path.replace('/', '/url/short/');
				}
			}
		}
	}
});
