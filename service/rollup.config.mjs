import run from "@rollup/plugin-run";
import babel from "rollup-plugin-babel";
import dotenv from "rollup-plugin-dotenv";
import eslint from "@rollup/plugin-eslint";
import env from "dotenv";
env.config();
const dev = process.env.NODE_ENV !== "production";
export default {
  input: "app.js",
  output: { file: "build/bundle.js", format: "cjs" },
  external: [],
  plugins: [
    babel({
      babelrc: false,
      plugins: ["@babel/plugin-proposal-optional-chaining"],
    }),
    dev && run({ execArgv: ["-r", "dotenv/config"] }),
  ],
};
