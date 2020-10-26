import { createApp, h } from 'vue';

export function createPrevuesApp() {
    return createApp({
        render() {
            return h('span', {}, ['Salam'])
        }
    })
}
