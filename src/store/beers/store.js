import beers from '../../../data/beers.json';

export default {
    namespaced: true,

    state: {
        beers
    },

    getters: {
        all(state) {
            return state.beers;
        },
        byId(state) {
            return (id) => state.beers.first((c) => c.id === id);
        },
        byFilter(state) {
            return (filter) => state.beers.filter(filter);
        }
    },

    mutations: {
    },

    actions: {
    },

    modules: {
    },

    plugins: [
    ],
};
