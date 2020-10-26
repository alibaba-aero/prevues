import { WebpackClientConfig } from '../webpack/client';
import webpack from 'webpack'
import * as path from 'path'
import {PrevuesConfig} from "../prevues.type";
import WebpackDevServer = require('webpack-dev-server');
import {TemplateContext} from "../template";

exports.run = async function (options: {
    config: PrevuesConfig;
    rootDir: string;
}) {
    const templateContext = new TemplateContext(options.rootDir)

    await templateContext.buildTemplates()

    const webpackConfig = new WebpackClientConfig(options.config, options.rootDir)

    const compiler = webpack(webpackConfig.toConfig())

    const devServer = new WebpackDevServer(compiler)
    devServer.listen(9000)
    // compiler.run((err, stats) => {
    //     console.log(err, stats)
    // })
}
