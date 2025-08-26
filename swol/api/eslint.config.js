import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'app',
    formatters: true,
    typescript: true,
    stylistic: {
      semi: false,
      quotes: 'single',
    },
  },
  {
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
      'no-console': 'warn',
      'style/semi': ['error', 'never'],
      'node/no-process-env': ['error'],
    },
  },
)
