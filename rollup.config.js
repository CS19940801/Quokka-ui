import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import {terser} from 'rollup-plugin-terser'
import {eslint} from 'rollup-plugin-eslint'

const ENV = process.env.NODE_ENV == "production"?true:false

export default {
    input: './index.js',
    output:{
        name:'timeout',
        file:'/dist/index.js',
        format:'umd'
    },
    plugins:[
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**', // 防止打包node_modules下的文件
            runtimeHelpers: true,       // 使plugin-transform-runtime生效
        }),
        !ENV && terser(),
        eslint({
            throwOnError: true,
            throwOnWarning: true,
            include: ['src/**'],
            exclude: ['node_modules/**']
        })
    ]
}