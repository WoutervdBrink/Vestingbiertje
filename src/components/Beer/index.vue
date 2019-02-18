<template>
    <div v-if="beer">
        <h3>{{ beer.name }}</h3>

        <p>
            <small><strong>{{ $t('Category') }}:</strong> {{ category.name | translate }}<br>
                <strong>{{ $t('ABV') }}:</strong> {{ beer.abv }}%</small>
        </p>

        <p>{{ beer.description | translate }}</p>
    </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

export default @Component() class Beer extends Vue {
    @Prop({ type: Object }) beer;

    @Getter('categories/byId') getCategoryById;

    get category() {
        return this.getCategoryById(this.beer.category);
    }
}
</script>
