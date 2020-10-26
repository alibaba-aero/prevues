import {WebpackBaseConfig} from "./base";
import * as path from "path";
import {Configuration} from "webpack";

export class WebpackClientConfig extends WebpackBaseConfig {
    name = 'client';

    toConfig(): Configuration {
        const config = super.toConfig();

        config.entry = {
            app: path.resolve(this.rootDir, './.prevues/client.js')
        }

        return config;
    }
}
