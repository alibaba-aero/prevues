require('ts-node/register')

const argv = process.argv.slice(2)
const cwd = process.cwd()

require('../src/cli').run(cwd, argv)
