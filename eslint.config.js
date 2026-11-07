import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Classic React Hooks rules only. React Compiler rules
      // (set-state-in-effect, preserve-manual-memoization, etc.) ship in
      // plugin v7 "recommended" and are deferred until a dedicated cleanup.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
          // Context providers, router helpers, and quiz option tables co-export
          // non-components by design; keep the rule for pure UI modules only.
          allowExportNames: [
            'useSubjectSelection',
            'useData',
            'useRouter',
            'routeLabel',
            'navigate',
            'MATCHING_PAIRS',
            'LEFT_ITEMS',
            'CGEI_DOMAIN_GROUPS',
            'packMatchSelect',
            'unpackMatchSelect',
            'MATCH_PACK',
            'openTrackOptions',
            'RouterProvider',
            'DataProvider',
            'SubjectSelectionProvider',
          ],
        },
      ],
      // Measured legacy debt: keep as warnings under max-warnings budget (CI)
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
      'no-useless-escape': 'warn',
      'prefer-const': 'warn',
    },
  },

  // Curriculum content strings often include LaTeX-style escapes that are
  // intentional in authored text; keep the rule for app code only.
  {
    files: ['src/data/**/*.{ts,tsx}'],
    rules: {
      'no-useless-escape': 'off',
    },
  },
);
