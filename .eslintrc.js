module.exports = {
  parser: 'babel-eslint',
  extends: ['prettier', 'airbnb-base'],
  plugins: ['prettier'],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
};
