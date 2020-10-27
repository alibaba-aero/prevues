import {defaultConfig} from '../default.config'
import { merge } from 'lodash'
import * as path from 'path'
import arg from 'arg'
import consola from 'consola'

exports.run = function(cwd: string, argv: string[]) {
    const args = arg({
        '--root': String,
        '--config': String,
        '-c': '--config'
    }, {argv: argv})

    const rootDir = args['--root'] || cwd;
    const configPath = path.join(rootDir, args['--config'] || './prevues.config.js');

    let config
    try {
        config = merge({}, defaultConfig, require(configPath))
    } catch (err) {
        consola.error('Prevues project not found, make sure you\'re inside your project folder')
        return;
    }

    const commands: Record<string, () => { run: (options: any) => Promise<unknown> }> = {
        'dev': () => require(path.resolve(__dirname, './dev')),
        'dev-vite': () => require(path.resolve(__dirname, './dev-vite')),
        'dev-vite-ssr': () => require(path.resolve(__dirname, './dev-vite-ssr')),
        'build': () => require(path.resolve(__dirname, './build'))
    }

    const cmd = commands[args._[0]]

    if (!cmd) {
        throw new Error('Unknown command ' + args._[0])
    }
    return cmd().run({
        rootDir,
        config
    });
}
