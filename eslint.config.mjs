import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config(
    {
      extends: ['@rocketseat/eslint-config/next', 'next/core-web-vitals'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            tabWidth: 2,
            semi: true,
            singleQuote: true,
            trailingComma: 'all',
            arrowParens: 'always',
            printWidth: 100,
            endOfLine: 'auto',
          },
        ],
      },
    },
    eslintPluginPrettier,
  ),
];

export default eslintConfig;
