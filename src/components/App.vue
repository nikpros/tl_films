<template lang="pug">
    .LAYOUT_APP.container-fluid.mt-5
        //- .btn-group.btn-group-sm
        //-     button.btn.btn-outline-primary EN
        //-     button.btn.btn-outline-primary RU
        //- ol.breadcrumb
        //-     li.breadcrumb-item EN
        //-     li.breadcrumb-item RU
        h1.text-center TeamLead
        button.ln.btn.btn-info(@click="changeLanguage") {{ language.toUpperCase() }}
        section.container.genres.mt-5.text-center
            button.btn.btn-outline-primary.mr-2.mb-2(
                v-for="(genre, index) in genres"
                @click="updateGenres(genre)"
                :class="{active: toggleGenre(genre)}") {{ genre.name }}
        section.container-fluid.mt-5
            .row.mt-4(v-for="cards in chunkedFilms()")
                .col-12.col-sm-6.col-lg-3.mt-4(v-for="(card, index) in cards")
                    card.ml-auto.mr-auto(
                        :card="card"
                        :key="index"
                        :index="Math.random() * (20 - 0) + 0"
                        :language="language")
        section.pages.mt-5.text-center
            pagination(v-model="currentPage"
                    :page-count="total_pages"
                    :classes="bootstrapPaginationClasses"
                    :labels="customLabels"
                    @change="onChange")
</template>

<script>

import chunk from 'chunk'
import Card from './Card.vue'
import Pagination from './Pagination.vue'
import { mapActions, mapGetters } from 'vuex'


export default {
    data: () => ({
        currentPage: 1,
        selectedGenres: [],
        language: 'en',
        bootstrapPaginationClasses: {
            ul: 'pagination',
            li: 'page-item',
            liActive: 'active',
            liDisable: 'disabled',
            button: 'page-link'
        },
        customLabels: {
            first: 'First',
            prev: '&#171;',
            next: '&#187;',
            last: 'Last'
        }
    }),
    components: {
        Card,
        Pagination
    },
    computed: {
        ...mapGetters(['genres', 'films', 'total_pages'])
    },
    watch: {
        selectedGenres() {
            this.$store.dispatch('getAllMovies', {
                page: this.currentPage,
                genres: this.selectedGenres,
                key: process.env.API_KEY,
                language: this.language })
        }
    },
    mounted() {
        this.$store.dispatch('getAllGenres', { key: process.env.API_KEY, language: this.language });
        this.$store.dispatch('getAllMovies', {
            page: 1,
            genres: [],
            key: process.env.API_KEY,
            language: this.language })
    },
    methods: {
        chunkedFilms() {
            // console.log(this.films)
            return chunk(this.films, 4);
        },
        onChange() {
            this.$store.dispatch('getAllMovies', {
                page: this.currentPage,
                genres: this.selectedGenres,
                key: process.env.API_KEY,
                language: this.language
            })
        },
        updateGenres(genre_obj) {
            if (this.selectedGenres.some(genre => genre.name == genre_obj.name)) {
                let index = this.selectedGenres.indexOf(genre_obj);
                this.selectedGenres.splice(index, 1);
            } else {
                this.selectedGenres.push(genre_obj);
            }
        },
        toggleGenre(genre_obj) {
            if (this.selectedGenres.some(el => el.name == genre_obj.name)) {
                return true
            }
            return false
        },
        changeLanguage() {
            if (this.language == 'en') this.language = 'ru';
            else this.language = 'en';

            this.$store.dispatch('getAllMovies', {
                page: this.currentPage,
                genres: this.selectedGenres,
                key: process.env.API_KEY,
                language: this.language
            })
            this.$store.dispatch('getAllGenres', { key: process.env.API_KEY, language: this.language });

        }
    }
}
</script>

<style lang="stylus" scoped>
.LAYOUT_APP
    position relative
    .ln
        position absolute
        right: 0
        top: 0
        margin-right: 15px
</style>
