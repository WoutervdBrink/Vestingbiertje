<template>
    <DefaultLayout>
        <h3>{{ $t('All the beers') }}</h3>
        <template v-for="beer in sortedBeers">
            <p :key="beer.id">
                <strong>{{ beer.name }}</strong> ({{ beer.abv }}%) &ndash; {{ beer.description | translate }}
            </p>
        </template>

        <hr>

        <textarea
            v-model="json"
            style="display: block; width: 100%; box-sizing: border-box"
            rows="10"
        />
    </DefaultLayout>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import DefaultLayout from '../../layouts/DefaultLayout';

export default @Component({
    components: {
        DefaultLayout,
    },
    metaInfo() {
        return {
            title: 'Export',
        };
    },
}) class ViewExport extends Vue {
    @Getter('categories/byId') getCategoryById;
    @Getter('beers/all') beers;

    get beersWithCategory() {
        return [...this.beers].map((beer) => {
            return {
                ...beer,
                category: this.getCategoryById(beer.category).name
            };
        });
    }

    get sortedBeers() {
        return [...this.beers].sort((beer1, beer2) => {
            return beer1.name.localeCompare(beer2.name);
        });
    }

    get json() {
        return JSON.stringify(this.beersWithCategory, false, 2);
    }
}
</script>
