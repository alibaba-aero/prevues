import { WebpackClientConfig } from '../webpack/client';
import webpack from 'webpack'
import consola from 'consola';
import {PrevuesConfig} from "../prevues.type";

exports.run = function (options: {
    config: PrevuesConfig;
    rootDir: string;
}) {
    const webpackConfig = new WebpackClientConfig(options.config, options.rootDir)

    const compiler = webpack(webpackConfig.toConfig())

    const date = Date.now()
    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) return Promise.reject(err);

            consola.info('Build finished in ' + (Date.now() - date) + 'ms')
        })
    })
}
