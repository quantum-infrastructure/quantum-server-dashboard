const path = require('path');

module.exports = {
  entry: './src/pages/index.js', // Adjust this to your entry file in src/pages
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // Other configurations
};