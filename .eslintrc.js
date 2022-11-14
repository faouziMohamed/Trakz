module.exports = {
  root: true,
  ignorePatterns: ['projects/**/*'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true,
      },
      extends: [
        'prettier',
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:promise/recommended',
        'plugin:prettier/recommended',
        'prettier',
      ],
      plugins: [
        'simple-import-sort',
        'promise',
        'unicorn',
        'unused-imports',
        'import',
      ],
      rules: {
        'prettier/prettier': [
          'error',
          {
            usePrettierrc: true,
          },
        ],
        'no-confusing-arrow': [
          'error',
          {
            allowParens: true,
          },
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case',
          },
        ],
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
