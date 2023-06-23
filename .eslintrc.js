module.exports = {
  root: true,
  ignorePatterns: ['projects/**/*', '**/*.js'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true,
      },
      env: { browser: true },
      extends: [
        'eslint:recommended',
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:lit-a11y/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict',
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:promise/recommended',
        'plugin:prettier/recommended',
        'prettier',
      ],
      plugins: [
        'lit-a11y',
        'simple-import-sort',
        'promise',
        'unicorn',
        'unused-imports',
        'import',
      ],
      rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        'no-confusing-arrow': ['error', { allowParens: true }],
        '@angular-eslint/directive-selector': [
          'error',
          { type: 'attribute', prefix: 'app', style: 'camelCase' },
        ],
        '@angular-eslint/component-selector': [
          'error',
          { type: 'element', prefix: 'app', style: 'kebab-case' },
        ],
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@angular-eslint/no-input-rename': 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-use-before-define': [
          'error',
          {
            functions: false,
            classes: true,
            variables: true,
            typedefs: true,
          },
        ],
        'promise/catch-or-return': 'error',
        'no-underscore-dangle': 'off',
        '@typescript-eslint/no-extraneous-class': 'off',
        // #region  //*=========== Import Sort ===========
        'sort-imports': 'off',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import/order': 'off',
        'simple-import-sort/exports': 'error',
        'simple-import-sort/imports': [
          'warn',
          {
            groups: [
              // ext library & side effect imports
              ['^@?\\w', '^\\u0000'],
              // {s}css files
              ['^.+\\.s?css$'],
              // Lib and hooks
              ['^@/lib', '^@/hooks'],
              // static data
              ['^@/data'],
              // components
              ['^@/components', '^@/container'],
              // zustand store
              ['^@/store'],
              // Other imports
              ['^@/'],
              ['^~/'],
              // relative paths up until 3 level
              [
                '^\\./?$',
                '^\\.(?!/?$)',
                '^\\.\\./?$',
                '^\\.\\.(?!/?$)',
                '^\\.\\./\\.\\./?$',
                '^\\.\\./\\.\\.(?!/?$)',
                '^\\.\\./\\.\\./\\.\\./?$',
                '^\\.\\./\\.\\./\\.\\.(?!/?$)',
              ],
              ['^@/types'],
              // other that didnt fit in
              ['^'],
            ],
          },
        ],
        'import/extensions': 'off',
        // #endregion  //*======== Import Sort ===========
      },
    },
    {
      files: ['*.html'],
      extends: [
        'plugin:@angular-eslint/template/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        'prettier/prettier': [
          'error',
          {
            parser: 'angular',
          },
        ],
      },
    },
  ],
};
