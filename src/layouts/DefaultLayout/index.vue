<template>
    <div class="container">
        <div class="heading">
            <button
                class="locale-button"
                :aria-label="$t('other_language')"
                @click="toggleLocale()"
            >
                <img
                    class="locale-flag"
                    :alt="$t('other_language')"
                    :title="$t('other_language')"
                    :src="flag"
                >
            </button>

            <h1>
                <router-link to="/">
                    {{ $t('Vestingbiertje') }}
                </router-link>
            </h1>
        </div>
        <div class="content">
            <slot />
        </div>
        <div class="footer">
            <slot name="footer" />
        </div>
        <div class="actual-footer">
            <p>Vestingbiertje &copy; 2017 - {{ new Date().getFullYear() }} Wouter van den Brink</p>
            <p><small><router-link to="/export">{{ $t('All the beers') }}</router-link> - <a href="https://github.com/WoutervdBrink/Vestingbiertje">{{ $t('Source') }}</a></small></p>
        </div>
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import flagEn from '../../../assets/img/en.svg';
import flagNl from '../../../assets/img/nl.svg';

export default @Component({
    components: {
    },
}) class DefaultLayout extends Vue {
    get flag() {
        return this.$i18n.locale === 'en' ? flagNl : flagEn;
    }

    toggleLocale() {
        this.$i18n.locale = { en: 'nl', nl: 'en' }[this.$i18n.locale] || 'en';

        window.localStorage.setItem('locale', this.$i18n.locale);
        document.querySelector('html').setAttribute('lang', this.$i18n.locale);
    }
}


</script>
