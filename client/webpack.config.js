const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Text Editor'
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Text Editor',
        short_name: 'Editor',
        description: 'Just Another Test Editor!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),

    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
//     // TODO: Add and configure workbox plugins for a service worker and manifest file.
//     plugins: [
//       //webpack plugin that generates html file and injects bundles
//       //get from assignments wahhhh
//       new HtmlWebpackPlugin({
//         template: './index.html',
//         title: 'JATE'
//       }),
//       //injects our custom servie worker
//       //me no loik inject manifest..
//       new InjectManifest({
//         swSrc: './src-sw.js',
//         swDest: 'src-sw.js',
//       }),
//       //creates a manifest.json file.
//       new WebpackPwaManifest({
//         fingerprints: false,
//         inject: true,
//         name: 'Just Another Text Editor',
//         short_name: 'JATE',
//         description: 'Just another text editor',
//         background_color: '#225ca3',
//         theme_color: '#225ca3',
//         start_url: './',
//         publicPath: './',
//         icons: [
//           {
//             //where to get from and where to put
//             src: path.resolve('src/images/logo.png'),
//             sizes: [96, 128, 192, 256, 384, 512],
//             destination: path.join('assets', 'icons'),
//           },
//         ],
//       }),

//     ],
//     // TODO: Add CSS loaders and babel to webpack.
//     module: {
//       //dont forget babel
//       rules: [
//         {
//           test: /\.css$/i,
//           use: ['style-loader', 'css-loader'],
//         },
//         {
//           //try to add all of them for test..
//           test: /\.(png|svg|jpg|jpeg|gif)$/i,
//           type: 'asset/resource',
//         },
//         {
//           test: /\.m?js$/,
//           exclude: /(node_modules)/,
//           use: {
//             loader: 'babel-loader',
//             options: {
//               presets: ['@babel/preset-env']
//             }
//           }
//         }
//       ],
//     },
//   };
// };
