import antfu from '@antfu/eslint-config'

export default antfu(
  {
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
  },
  {
    rules: {
      'no-console': 'warn',
      'style/semi': ['error', 'never'],
      'node/no-process-env': ['error'],
    },
  },
)
