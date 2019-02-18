import Vue from 'vue';
import Meta from 'vue-meta';
import Router from 'vue-router';

import ViewNotFound from './views/NotFound';

import ViewHome from './views/Home';
import ViewExport from './views/Export';

Vue.use(Router);
Vue.use(Meta);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/404',
            name: 'not_found',
            component: ViewNotFound,
        },

        {
            path: '/',
            name: 'home',
            component: ViewHome,
        },
        {
            path: '/export',
            name: 'export',
            component: ViewExport,
        },
    ],
});
