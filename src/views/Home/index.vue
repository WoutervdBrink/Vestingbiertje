<template>
    <DefaultLayout>
        <template>
            <Beer :beer="currentBeer" />
        </template>
        <template v-slot:footer>
            <label for="min-abv">{{ $t('Min. ABV') }}: {{ minAbv }}%</label>
            <input
                v-model="minAbv"
                type="range"
                :aria-label="$t('Min. ABV')"
                min="0"
                max="12"
                step="0.5"
                list="tickmarks"
                @input="updateAbv()"
            >

            <label for="max-abv">{{ $t('Max. ABV') }}: {{ maxAbv }}%</label>
            <input
                v-model="maxAbv"
                type="range"
                :aria-label="$t('Max. ABV')"
                min="0"
                max="12"
                step="0.5"
                list="tickmarks"
                @input="updateAbv()"
            >

            <p
                v-if="filteredBeers.length === 0"
                id="error"
            >
                {{ $t('There are no beers matching your filter.') }}
            </p>

            <datalist id="tickmarks">
                <option value="0" />
                <option value="1" />
                <option value="2" />
                <option value="3" />
                <option value="4" />
                <option value="5" />
                <option value="6" />
                <option value="7" />
                <option value="8" />
                <option value="9" />
                <option value="10" />
                <option value="11" />
                <option value="12" />
            </datalist>

            <input
                id="all"
                v-model="anyCategory"
                type="checkbox"
                @input="updateAnyCategory()"
            >
            <label for="all">{{ $t('From any category') }}</label>

            <div v-if="!anyCategory">
                <hr>
                <div
                    v-for="category in categories"
                    :key="category.id"
                >
                    <input
                        :id="`category_${category.id}`"
                        type="checkbox"
                        :checked="selectedCategories.indexOf(category) >= 0"
                        @input="toggleCategory(category)"
                    >
                    <label
                        :for="`category_${category.id}`"
                    >{{ category.name | translate }}</label><br>
                </div>
            </div>

            <button
                class="button"
                :disabled="filteredBeers.length === 0"
                @click="newBeer()"
            >
                {{ $t('Show me another one!') }}
            </button>
        </template>
    </DefaultLayout>
</template>

<script>
import { Beer } from '../../components';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

import DefaultLayout from '../../layouts/DefaultLayout';

export default @Component({
    components: {
        DefaultLayout,

        Beer,
    },
    Info() {
        return {
            title: 'Home',
        };
    },
}) class ViewHome extends Vue {
    @Getter('beers/all') beers;
    @Getter('categories/all') categories;
    @Getter('categories/selected') selectedCategories;
    @Getter('beers/byFilter') filterBeer;

    @Action('categories/toggle') toggleCategory;

    get filteredBeers() {
        const cats = this.selectedCategories.map((cat) => {
            return cat.id;
        });

        return this.filterBeer((beer) => {
            return (
                beer.abv >= this.minAbv &&
                beer.abv <= this.maxAbv &&
                (this.anyCategory || cats.indexOf(beer.category) >= 0)
            );
        });
    }

    flashBeer() {
        this.currentBeer = this.filteredBeers[Math.floor(Math.random() * this.filteredBeers.length)] || null;
    }

    newBeer() {
        if (this.flashing) {
            return;
        }

        this.flashing = true;

        for (let i = 0; i < 10; i++) {
            if (i < 9) {

                setTimeout(this.flashBeer.bind(this), i * 30 * (i / 5));
            } else {
                setTimeout(() => {
                    this.flashBeer();
                    this.flashing = false;
                }, i * 30 * (i / 5));
            }
        }
    }

    updateAbv() {
        const min = parseFloat(this.minAbv);
        const max = parseFloat(this.maxAbv);

        if (min > max) {
            this.maxAbv = min;
        }

        if (max < min) {
            this.minAbv = max;
        }

        window.localStorage.setItem('minAbv', min);
        window.localStorage.setItem('maxAbv', max);
    }

    beforeMount() {
        this.newBeer();

        this.minAbv = parseFloat(window.localStorage.getItem('minAbv')) || 0;
        this.maxAbv = parseFloat(window.localStorage.getItem('maxAbv')) || 12;

        const anyCategory = window.localStorage.getItem('anyCategory');

        if (anyCategory !== null) {
            this.anyCategory = Boolean(parseInt(anyCategory));
        }
    }

    @Watch('anyCategory')
    updateAnyCategory() {
        window.localStorage.setItem('anyCategory', this.anyCategory ? 1 : 0);
    }

    currentBeer = null;
    flashing = false;

    minAbv = 0;
    maxAbv = 12;

    anyCategory = true;
}
</script>
