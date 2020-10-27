import { createApp, h } from 'vue';
import { createRouter, RouterView } from './router.js';

export function createPrevuesApp(mode = 'client') {
    const app = createApp({
        render() {
            return h('span', {}, [h(RouterView)])
        }
    })
    app.use(createRouter(mode))
    return app;
}
