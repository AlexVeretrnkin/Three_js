const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');

module.exports = {
  module : {
    rules: [
      {
        test   : /\.scss$/,
        loader : 'postcss-loader',
        options: {
          ident  : 'postcss',
          plugins: () => [
            require('postcss-short')(),
          ]
        }
      },
      {
        test: /\.(frag|vert|glsl)$/,
        use: [
          {
            loader: 'glsl-shader-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new WebpackNotifierPlugin({
      alwaysNotify: true,
      title       : 'App Name',
      contentImage: path.join(__dirname, 'image.png')
    }),
  ]
};
