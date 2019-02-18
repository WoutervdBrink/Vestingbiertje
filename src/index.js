import Vue from 'vue';

import VueI18n from 'vue-i18n';
import { register } from 'register-service-worker';

import App from './App.vue';
import router from './router';
import { store } from './store/store';
import messages from '../data/translations';

// Register our service worker
/*global process*/
if (process.env.NODE_ENV === 'production') {
    register('/sw.js', {
        registrationOtions: { scope: './' }
    });
}

// Disable the "You are running Vue in development mode" warning in the console.
Vue.config.productionTip = false;

// i18n
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: window.localStorage.getItem('locale') || 'en',
    messages
});

document.querySelector('html').setAttribute('lang', i18n.locale);

// Redirect to a 404 view if a route does not exist.
router.beforeEach((to, from, next) => {
    if (!to.matched.length) {
        next('/404');
    } else {
        next();
    }
});

Vue.filter('translate', (translation) => {
    return translation[i18n.locale] || translation.en || '';
});

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App)
}).$mount('#app');
