<template lang="pug">
    .LAYOUT_APP.container-fluid
        section.genres.mt-5.text-center
            button.btn.btn-outline-primary.mr-2.mb-2(
                v-for="(genre, index) in genres") {{ genre.name }}
        section.mt-5
            card.d-inline-block(
                v-for="(card, index) in films"
                :title="card.title"
                :key="index")
        section.pages.mt-3
            template(v-if="total_pages >= 5")
                nav(aria-label='Page navigation example')
                    ul.pagination.justify-content-center
                        li.page-item(:class="{disabled: currentPage % 3 == 1}")
                            a.page-link(href='#' @click.stop.prevent="previousPage($event)")
                                span(aria-hidden='true' aria-label='Previous' ) &laquo;
                        li.page-item(:class="{active: currentPage % 3 == 1}")
                            a.page-link(href='#') 1
                        li.page-item(:class="{active: currentPage % 3 == 2}")
                            a.page-link(href='#') 2
                        li.page-item(:class="{active: currentPage % 3 == 0}")
                            a.page-link(href='#') 3
                        li.page-item.disabled
                            a.page-link(href='#') ...
                        li.page-item
                            a.page-link(href='#') {{ total_pages }}
                        li.page-item
                            a.page-link(href='#' aria-label='Next' @click.stop.prevent="currentPage++")
                                span(aria-hidden='true') &raquo;



        
</template>

<script>

import Card from './Card.vue'
import { mapActions, mapGetters } from 'vuex'


export default {
    data: () => ({
        currentPage: 1
    }),
    components: {
        Card
    },
    computed: {
        ...mapGetters(['genres', 'films', 'total_pages'])
    },
    mounted() {
        this.$store.dispatch('getAllGenres');
        this.$store.dispatch('getAllMovies')
    },
    methods: {
        previousPage(event) {
            for (let iterator of event.target.attributes) {
                console.log(iterator)
                
            }
            // currentPage % 3 != 1 ? currentPage-- : currentPage
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
