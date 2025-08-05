module.exports = {
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-classnames', 'prettier-plugin-merge'],
  customFunctions: ['clsx', 'cva'],
  tailwindAttributes: ['clsx', 'cva'],
  tailwindFunctions: ['clsx', 'cva'],
  singleQuote: true,
  semi: false,
  jsxSingleQuote: true,
  printWidth: 120,
  endingPosition: 'absolute',
  tailwindStylesheet: './src/styles/_global.css',
}
