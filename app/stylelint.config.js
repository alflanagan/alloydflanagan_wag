/** @type {import('stylelint').Config} */
export default {
  rules: {
    'block-no-empty': true,
    'plugin/no-unresolved-module': {
      alias: {
        assets: 'pebbles'
      },
      modules: ['node_modules', 'local_modules']
    }
  },
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-no-unresolved-module', "stylelint-declaration-strict-value"],
  overrides: [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      customSyntax: 'postcss-styled-syntax'
    }
  ]
}
