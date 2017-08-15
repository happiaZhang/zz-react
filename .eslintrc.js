module.exports = {
  "parser": "babel-eslint",
  "extends": ["standard", "standard-jsx"],
  "rules": {
    "semi": ["error", "always"],
    "space-before-function-paren": ["error", "never"],
    "generator-star-spacing": ["error", { "before": false, "after": true }],
    "no-undef": 0
  }
};