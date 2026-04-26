import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'coverage', 'node_modules', 'public', '.vscode', '.idea', '*.min.js']),
  {
    files: ['**/*.{ts,tsx,vue}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      pluginVue.configs['flat/recommended'],
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      // TypeScript handles undefined symbols; ESLint's no-undef doesn't know about DOM lib types.
      'no-undef': 'off',
      // False positive on TS union types like `1 | 2 | 3` inside template expressions.
      // Vue 3 has no filter syntax anyway, so the rule has no purpose here.
      'vue/no-deprecated-filter': 'off',
    },
  },
]);
