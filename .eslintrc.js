module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
  },
  rules: {
    semi: 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/alt-text': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/no-noninteractive-element-interactions': [0],
    'prefer-rest-params': [0],
  },
  globals: {
    document: true,
  },
};
