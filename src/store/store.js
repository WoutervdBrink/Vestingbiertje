import Vue from 'vue';
import * as Vuex from 'vuex';

Vue.use(Vuex);

import beers from './beers/store';
import categories from './categories/store';

const getPlugins = (modules) => {
    return (modules ? Object.values(modules) : [])
        .map(module => (module.plugins || []).concat(...getPlugins(module.modules)))
        .flat();
};

const modules = {
    beers,
    categories,
};

export const store = new Vuex.Store({
    modules,
    plugins: getPlugins(modules),
    strict: true,
});
