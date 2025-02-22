import {createRouter, createWebHashHistory} from 'vue-router';
import {useUserStore} from '@/store/user';

import Dashboard from '@/pages/Dashboard.vue';
import Login from '@/pages/Login.vue';
import NotFound from '@/pages/404.vue';

const routes = [
    {path: '/', component: Dashboard, meta: {auth: true}},
    {path: '/login', component: Login, meta: {auth: false}},
    {path: '/:pathMatch(.*)*', component: NotFound}
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// Navigation Guard für Authentifizierung
router.beforeEach((to, _from, next) => {
    const userStore = useUserStore();
    if (to.meta.auth && !userStore.isLoggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
