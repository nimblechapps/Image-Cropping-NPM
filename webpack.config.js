// const path = require("path");

// module.exports = {
//   mode: 'production',
//   entry: './src/index.tsx',
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: 'index.js',
//     libraryTarget: 'umd',
//     library: 'multipleImageCropping',
//     globalObject: 'this',
//   },
//   resolve: {
//     extensions: ['.ts', '.tsx', '.js', '.jsx'],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(ts|tsx)$/,
//         exclude: /node_modules/,
//         use: [
//           {
//             loader: 'ts-loader',
//             options: {
//               transpileOnly: true, // Optionally set this to true for faster builds
//             },
//           },
//         ],
//       },
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: [
//           {
//             loader: 'babel-loader',
//             options: {
//               presets: ['@babel/preset-env', '@babel/preset-react'],
//             },
//           },
//         ],
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader'],
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: '[name].[ext]',
//               outputPath: 'assets/fonts/',
//               publicPath: 'assets/fonts/',
//             },
//           },
//         ],
//       },
//     ],
//   },
//   externals: {
//     react: 'react',
//     'react-dom': 'react-dom', // Add react-dom if you're using it
//   },
// };

const path = require("path");

module.exports = {
  mode: "production", 
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "index.js",
    libraryTarget: "umd",
    library: 'multipleImageCropping',
    globalObject: 'this'
  },
  externals: {
    react: "react",
    "react-dom": "react-dom"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, 
        exclude: /node_modules/,
        use: {
          loader: "ts-loader", 
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript" 
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets/images',
              publicPath: 'assets/images'
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets/fonts',
              publicPath: 'assets/fonts'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  target: "web"
};
