import {PrevuesConfig} from "../prevues.type";
import {TemplateContext} from "../template";
import { createServer } from "vite";
import {Server} from "http";
import * as fs from 'fs'
import path from "path";
import {Stream} from "stream";
import send from 'koa-send';

exports.run = async function (options: {
    config: PrevuesConfig;
    rootDir: string;
}) {
    const templateContext = new TemplateContext(options.rootDir, 'prevues')

    await templateContext.buildTemplates()

    // await fs.promises.copyFile(path.resolve(options.rootDir, './routes.js'), path.resolve(options.rootDir, './public/routes.js'))

    const myPlugin = (opts: {
        root: string,
        app: any,
        server: Server,
        watcher: any
    }) => {
        opts.app.use(async (ctx: any, next: Function) => {
            // You can do pre-processing here - this will be the raw incoming requests
            // before vite touches it.
            if (ctx.path.endsWith('.scss')) {
                // Note vue <style lang="xxx"> are supported by
                // default as long as the corresponding pre-processor is installed, so this
                // only applies to <link ref="stylesheet" href="*.scss"> or js imports like
                // `import '*.scss'`.
                // console.log('pre processing: ', ctx.url)
                ctx.type = 'css'
                ctx.body = 'body { border: 1px solid red }'
            }

            // ...wait for vite to do built-in transforms
            await next()

            if (ctx.status === 404) {
                ctx.status = 200;
                return send(ctx, './prevues/index.html')
            }

            // Post processing before the content is served. Note this includes parts
            // compiled from `*.vue` files, where <template> and <script> are served as
            // `application/javascript` and <style> are served as `text/css`.
            if (ctx.response.is('js')) {
                // console.log('post processing: ', ctx.url)
                // console.log(ctx.body) // can be string or Readable stream
            }
        })
    }

    createServer({
        configureServer: [myPlugin],
        optimizeDeps: {
            exclude: ['@vue/server-renderer']
        },
        root: options.rootDir
    }).listen(3000)
}
