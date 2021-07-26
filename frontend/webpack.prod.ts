import common from "./webpack.common";
import { merge } from "webpack-merge";
import type webpack from "webpack";
import path from "path";

const config: webpack.Configuration = merge(common, {
  mode: "production",
  devtool: false,
  devServer: {
    contentBase: path.join(__dirname, "build"),
    historyApiFallback: true,
    compress: false,
    port: 4000,
  },
});

export default config;
