/** @type {import('stylelint').Config} */
export default {
  rules: {
    'block-no-empty': true
  },
  extends: ['stylelint-config-standard'],
  overrides: [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      customSyntax: 'postcss-styled-syntax'
    }
  ]
}
