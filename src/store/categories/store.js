import categories from '../../../data/categories.json';

const preSelected = JSON.parse(window.localStorage.getItem('selectedCategories') || '[]') || [];

export default {
    namespaced: true,

    state: {
        categories: categories.map((category) => {
            if (preSelected.length === 0) {
                return { ...category, selected: true };
            }

            return {
                ...category,
                selected: preSelected.indexOf(category.id) >= 0
            };
        }),
    },

    getters: {
        all(state) {
            return state.categories;
        },
        byId(state) {
            return (id) => state.categories.find((c) => {return c.id === id;});
        },
        selected(state) {
            return state.categories.filter((category) => category.selected);
        }
    },

    mutations: {
        selectCategory(state, { category, change }) {
            state.categories = state.categories.map((c) => {
                if (c.id === category.id) {
                    return {
                        ...c,
                        selected: change
                    };
                }

                return c;
            });

            const selected = state.categories.filter((category) => category.selected).map((cat) => {
                return cat.id;
            });

            window.localStorage.setItem('selectedCategories', JSON.stringify(selected));
        }
    },

    actions: {
        toggle({ commit }, category) {
            commit('selectCategory', { category, change: !category.selected });
        }
    },

    modules: {
    },

    plugins: [
    ],
};
