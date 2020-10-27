import { createRouter, createWebHistory, RouterView, RouterLink } from 'vue-router'
import { routes } from '../routes'

export const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

export { RouterView, RouterLink }
