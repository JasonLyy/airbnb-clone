import common from "./webpack.common";
import path from "path";
import { merge } from "webpack-merge";
import type webpack from "webpack";

const config: webpack.Configuration = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "build"),
    historyApiFallback: true,
    compress: false,
    port: 80,
  },
});

export default config;
