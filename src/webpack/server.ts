import {WebpackBaseConfig} from "./base";
import * as path from "path";
import {Configuration} from "webpack";
import ManifestPlugin from 'webpack-manifest-plugin'

export class WebpackServerConfig extends WebpackBaseConfig {
    name = 'server';

    toConfig(): Configuration {
        const config = super.toConfig();

        config.entry = {
            'app.server': path.resolve(this.rootDir, './.prevues/server.js')
        }

        config.target = 'node'

        config.output = {
            ...config.output,
            libraryTarget: 'commonjs2',
        }

        config.plugins = [
            ...(config.plugins || []),
            new ManifestPlugin({ fileName: 'ssr-manifest.json' }) as any
        ]

        config.devServer = {
            ...config.devServer,
            disableHostCheck: true
        }

        return config;
    }
}
