import { WebpackClientConfig } from '../webpack/client';
import webpack from 'webpack'
import * as path from 'path'
import {PrevuesConfig} from "../prevues.type";
import WebpackDevServer = require('webpack-dev-server');
import {TemplateContext} from "../template";
import {WebpackServerConfig} from "../webpack/server";

exports.run = async function (options: {
    config: PrevuesConfig;
    rootDir: string;
}) {
    const templateContext = new TemplateContext(options.rootDir)

    await templateContext.buildTemplates()

    const clientConfig = new WebpackClientConfig(options.config, options.rootDir)
    const serverConfig = new WebpackServerConfig(options.config, options.rootDir)

    const compiler = webpack([
        clientConfig.toConfig(),
        serverConfig.toConfig(),
    ])

    const devServer = new WebpackDevServer(compiler)
}
