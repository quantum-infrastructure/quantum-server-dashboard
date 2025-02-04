// // const path = require('path');

// // module.exports = {
// //   entry: './src/pages/index.js', // Adjust this to your entry file in src/pages
// //   output: {
// //     filename: 'bundle.js',
// //     path: path.resolve(__dirname, 'dist'),
// //   },
// //   // Other configurations
// // };




// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { ModuleFederationPlugin } = require('webpack').container;

// module.exports = {
//   mode: 'development',
//   entry: './src/index.tsx',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js',
//     publicPath: 'auto',
//   },
//   devServer: {
//     contentBase: path.join(__dirname, 'public'),
//     port: 3000,
//     hot: true,
//     open: true,
//   },
//   resolve: {
//     extensions: ['.tsx', '.ts', '.js'],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader'],
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './public/index.html',
//     }),
//     new ModuleFederationPlugin({
//       name: 'micro_app', // Name of the host app
//       remotes: {
//         micro_app: 'micro_app@http://localhost:3001/remoteEntry.js', // Referencing the remote app
//       },
//       shared: {
//         react: { singleton: true },
//         'react-dom': { singleton: true },
//       },
//     }),
//   ],
// };


const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx', // Entry file
  output: {
    publicPath: 'http://localhost:3000/',  // Ensure the host is running on port 3000
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,  // Set the host port for front-end
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'front_end',
      remotes: {
        micro_app: 'micro_app@http://localhost:8080/remoteEntry.js', // Remote entry for micro_app
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '^18.0.0' },
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
