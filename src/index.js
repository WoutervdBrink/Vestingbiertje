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

// Matomo tracking
const _paq = window._paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
    var u='//piwik.prod1.dutch1.nl/';
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '4']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
})();

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
