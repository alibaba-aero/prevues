import {PrevuesConfig} from "../prevues.type";
import {TemplateContext} from "../template";
import { build, ssrBuild } from "vite";
import {startServer} from "../server";
import path from "path";

exports.run = async function (options: {
    config: PrevuesConfig;
    rootDir: string;
}) {
    const templateContext = new TemplateContext(options.rootDir, '.prevues')

    await templateContext.buildTemplates()

    const clientResult = await build({
        outDir: 'dist/client',
        rollupInputOptions: {
            input: './.prevues/client.js'
        },
    })

    await ssrBuild({
        outDir: 'dist/server',
        rollupOutputOptions: {
            preserveModules: true,
        },
        rollupInputOptions: {
            preserveEntrySignatures: 'strict',
            plugins: [
                // replace({
                //     __HTML__: clientResult.html.replace('<div id="app">', '<div id="app" data-server-rendered="true">${html}')
                // })
            ],
            input: './.prevues/server.js'
        },
    })

    startServer(require(path.resolve(options.rootDir, './dist/server/example/.prevues/app.js')))
}
