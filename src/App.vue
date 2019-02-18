<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

export default @Component({
    components: {},
    metaInfo() {
        return {
            title: 'Home',
            titleTemplate: '%s - Vestingbiertje',
        };
    },
}) class App extends Vue {
    //
}
</script>
