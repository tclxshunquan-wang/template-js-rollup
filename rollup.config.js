
import clear from "rollup-plugin-clear" // 清空文件夹插件
// import { uglify } from "rollup-plugin-uglify" // 输出libary代码压缩
import commonjs from "rollup-plugin-commonjs"
import resolve from "rollup-plugin-node-resolve"
import nodePolyfills from "rollup-plugin-node-polyfills"
import babelPlugin from "rollup-plugin-babel"
import typescript from 'rollup-plugin-typescript2'
import multiInput from 'rollup-plugin-multi-input';

const path = require("path")

const extensions = ['.js', '.ts', '.tsx']

const name = 'templateJs'

export default [{
  input: 'src/**/*.[tj]s',
  output: {
    dir: 'dist/esm',
    format: 'es',
    exports: 'auto',
    sourcemap: true
  },
  plugins: [
    multiInput(),
    resolve(),
    commonjs(),
    typescript(),
    babelPlugin({
      babelHelpers: 'bundled'
    })
  ]
},
{
  input: 'src/**/*.[tj]s',
  output: {
    dir: 'dist/cjs',
    format: 'cjs',
    exports: 'auto',
    sourcemap: true
  },
  plugins: [
    multiInput(),
    resolve(),
    commonjs(),
    typescript(),
    babelPlugin({
      babelHelpers: 'bundled'
    })
  ]
},
{
  input: "src/index.ts",
  output: {
    file: `dist/umd/${name}.umd.js`, // 导出文件
    format: "umd", // 打包文件支持的形式
    name: "templateJs" // 页面引入时，注入的全局变量
  },
  plugins: [
    clear({
      targets: ['dist']
    }),
    // uglify(),
    commonjs(),
    resolve(),
    nodePolyfills(),
    typescript({
      tsconfig: path.resolve(__dirname, "./tsconfig.json"),
      extensions
    }),
    babelPlugin({
      exclude: "node_modules/**", // 只编译我们的源代码
      runtimeHelpers: true,
    }),
  ]
}
]