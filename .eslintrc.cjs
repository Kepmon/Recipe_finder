module.exports = {
  env: {
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended',
    'plugin:astro/jsx-a11y-recommended',
    'eslint:recommended',
    'airbnb-base',
    'prettier'
  ],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      }
    },
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser'
    }
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      { singleQuote: true, trailingComma: 'none', semi: false }
    ],
    'comma-dangle': ['error', 'never'],
    semi: ['error', 'never'],
    'import/extensions': ['error', 'never'],
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'no-param-reassign': ['error', { props: false }]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs']
      }
    }
  }
}
