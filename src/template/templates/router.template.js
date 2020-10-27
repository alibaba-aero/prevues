import {createRouter as baseCreateRouter, createWebHistory, RouterView, RouterLink, createMemoryHistory} from 'vue-router'
import { routes } from '../routes'

export const createRouter = (mode) => baseCreateRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: mode === 'client' ? createWebHistory() : createMemoryHistory(),
    routes, // short for `routes: routes`
})

export { RouterView, RouterLink }
