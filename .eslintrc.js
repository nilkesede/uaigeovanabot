module.exports = {
  extends: [
    'xo-space/esnext',
    'plugin:unicorn/recommended'
  ],
  plugins: [
    'unicorn'
  ],
  rules: {
    camelcase: 'off',
    curly: ["error", "multi-or-nest", "consistent"],
    semi: ['error', 'never'],
    'unicorn/prevent-abbreviations': 'off'
  }
}
