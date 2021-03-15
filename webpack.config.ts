import path from "path";
import webpack from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const config: webpack.Configuration = {
  entry: "./src/index.tsx",
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|ttf|woff)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: path.resolve(__dirname, "./src/**/*.{ts,tsx,js,jsx}"),
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          globOptions: {
            ignore: ["**/*/index.html"],
          },
        },
      ],
    }),
  ],
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: false,
    port: 4000,
  },
};

export default config;
