import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: ['dist', 'node_modules'],
    type: 'app',
    formatters: true,
    typescript: true,
    stylistic: {
      indent: 2,
      semi: false,
      quotes: 'single',
    },
    react: true,
    markdown: true,
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'unused-imports/no-unused-imports': 'error',
      'style/jsx-one-expression-per-line': 'off',
      'style/no-trailing-spaces': 'off',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-console': 'warn',
      'style/semi': ['error', 'never'],
      'node/no-process-env': ['error'],
    },
  },
)
