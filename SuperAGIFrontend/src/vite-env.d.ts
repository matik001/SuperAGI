/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_URL: string;
	readonly VITE_API_TIMEOUT: number;
	readonly TESTS_ALLOW_CONSOLE: '1' | undefined;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
