import express from 'express'
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'

export function startServer(App: any) {
    const server = express();
    server.get("*", async (req, res) => {
        const app = createSSRApp(App);
        const appContent = await renderToString(app);

        const html = `<html>
                        <head>
                          <title>Hello</title>
                        </head>
                        <body>
                          ${appContent}
                        </body>
                      </html>
        `.trim();

        res.end(html);
    });

    console.log('\nYou can navigate to http://localhost:8080\n');
    server.listen(8080);
}


