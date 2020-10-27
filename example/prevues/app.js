import { createApp, h } from 'vue';
import { router, RouterView, RouterLink } from './router.js';

export function createPrevuesApp() {
    const app = createApp({
        render() {
            return h('span', {}, [h(RouterView)])
        }
    })
    app.use(router)
    return app;
}
