module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],

  parserOptions: {
    parser: [
      'babel-eslint',
      'vue-eslint-parser'
    ]
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    indent: 'off',
    'space-before-function-paren': 0,
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ]
}
