const argv = process.argv.slice(2)
const cwd = process.cwd()

require('../dist/cli').run(cwd, argv)
