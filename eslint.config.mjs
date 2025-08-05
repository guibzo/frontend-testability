import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    plugins: ['simple-import-sort'],
    rules: {
      'simple-import-sort/imports': 'error',
      'react-hooks/rules-of-hooks': 'off',
    },
    settings: {
      next: {
        rootDir: 'packages/my-app/',
      },
    },
  }),
]

export default eslintConfig
