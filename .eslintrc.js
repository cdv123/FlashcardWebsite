module.exports = {  
    // pageExtensions: ['app.test.js'],
    env: {
      commonjs: true,
      es2021: true,
      jest:true
    },
    extends: 'standard',
    overrides: [
    ],
    parserOptions: {
      ecmaVersion: 'latest'
    },
    rules: {
      "semi": [2, "always"],
      "indent": "off"
    }
  }