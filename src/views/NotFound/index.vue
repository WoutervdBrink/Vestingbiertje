<template>
    <DefaultLayout>
        <h3>{{ $t('Not Found') }}</h3>
        <p>{{ $t('The page you were looking for could not be found.') }}</p>
    </DefaultLayout>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

import DefaultLayout from '../../layouts/DefaultLayout';

export default @Component({
    components: {
        DefaultLayout,
    },
    metaInfo() {
        return {
            title: 'Not Found',
        };
    },
}) class ViewNotFound extends Vue {
    //
}
</script>
