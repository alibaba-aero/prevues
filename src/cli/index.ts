import {defaultConfig} from '../default.config'
import { merge } from 'lodash'
import * as path from 'path'
import arg from 'arg'

exports.run = function(cwd: string, argv: string[]) {
    const args = arg({
        '--root': String,
        '--config': String,
        '-c': '--config'
    }, {argv: argv})

    const rootDir = args['--root'] || cwd;
    const configPath = path.join(rootDir, args['--config'] || './prevues.config.js');
    const config = merge({}, defaultConfig , require(configPath))

    const commands: Record<string, () => { run: (options: any) => Promise<unknown> }> = {
        'dev': () => require(path.resolve(__dirname, './dev')),
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
