import path from 'path'
import { VueLoaderPlugin } from 'vue-loader'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {PrevuesConfig} from "../prevues.type";
import {Configuration} from 'webpack'
import WebpackBar from "webpackbar";

export class WebpackBaseConfig {
    constructor(protected readonly config: PrevuesConfig, protected readonly rootDir: string) {
    }

    toConfig(): Partial<Configuration> {
        return {
            mode: 'development',
            output: {
                path: path.resolve(this.rootDir, 'dist')
            },
            module: {
                rules: [
                    {
                        test: /\.vue$/,
                        use: 'vue-loader'
                    },
                    {
                        test: /\.tsx?$/,
                        use: 'ts-loader',
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.m?jsx?$/,
                        use: 'babel-loader',
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.png$/,
                        use: {
                            loader: 'url-loader',
                            options: { limit: 8192 }
                        }
                    },
                    {
                        test: /\.css$/,
                        use: [
                            // {
                            //     loader: MiniCssExtractPlugin.loader,
                            //     options: { hmr: !env.prod }
                            // },
                            'css-loader'
                        ]
                    }
                ]
            },
            plugins: [
                new VueLoaderPlugin(),
                new HtmlWebpackPlugin({
                    filename: 'index.html',
                    template: path.resolve(this.rootDir, this.config.templatePath),
                    minify: true,
                    inject: true,
                }),
                new WebpackBar()
            ],
            resolve: {
                extensions: ['.wasm', '.mjs', '.js', '.json', '.vue', '.jsx', '.ts', '.tsx'],
                alias: {
                    '@': this.rootDir
                }
            },
            devServer: {
                contentBase: path.join(__dirname, 'dist'),
                compress: true,
                port: 9000
            }
        }
    }
}
