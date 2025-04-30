import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index.js'

import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Dashboard from '../components/Dashboard.vue'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        component: Home,
        meta: { hideNav: false }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            hideNav: true,
            public: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            hideNav: true,
            public: true
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to) => {
    // Ignorer la vérification pour les routes publiques
    if (to.meta.public) return true

    // Vérifier l'authentification
    const isAuthenticated = await store.dispatch('checkAuth')

    // Si la route nécessite une auth et que l'utilisateur n'est pas connecté
    if (to.meta.requiresAuth && !isAuthenticated) {
        return '/login'
    }

    return true
})

export default router