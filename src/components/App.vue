<template lang="pug">
    .LAYOUT_APP.container-fluid
        section.container.genres.mt-5.text-center
            button.btn.btn-outline-primary.mr-2.mb-2(
                v-for="(genre, index) in genres") {{ genre.name }}
        section.container-fluid.mt-5
            .row.mt-4(v-for="cards in chunkedFilms()")
                .col-12.col-md-6.col-lg-3.mt-4(v-for="(card, index) in cards")
                    card(:title="card.title"
                        :poster="card.poster_path"
                        :key="index")
        section.pages.mt-5
            | {{currentPage}}
            template(v-if="total_pages >= 5")
                nav(aria-label='Page navigation example')
                    ul.pagination.justify-content-center
                        li.page-item(:class="{disabled: activePrevious()}")
                            a.page-link(href='#' aria-label='Previous' @click.stop.prevent="changePage($event)")
                                span(aria-hidden='true' aria-label='Previous') &laquo;
                        li.page-item(:class="{active: currentPage % 3 == 1}")
                            a.page-link(href='#') {{currentPage}}
                        li.page-item(:class="{active: currentPage % 3 == 2}")
                            a.page-link(href='#') {{currentPage + 1}}
                        li.page-item(:class="{active: currentPage % 3 == 0}")
                            a.page-link(href='#' @click.stop.prevent="selectPage($event)") {{currentPage + 2}}
                        li.page-item.disabled
                            a.page-link(href='#') ...
                        li.page-item
                            a.page-link(href='#') {{ total_pages }}
                        li.page-item
                            a.page-link(href='#' aria-label='Next' @click.stop.prevent="changePage($event)")
                                span(aria-hidden='true' aria-label='Next') &raquo;



        
</template>

<script>

import chunk from 'chunk'
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
        this.$store.dispatch('getAllGenres', { key: process.env.API_KEY });
        this.$store.dispatch('getAllMovies')
    },
    methods: {
        changePage(event) {
            for (let iterator of event.target.attributes) {
                if (iterator.value === 'Previous' && this.currentPage != 1) this.currentPage--
                else if (iterator.value === 'Next' && this.currentPage != this.total_pages - 4) this.currentPage++
            }
        },
        chunkedFilms() {
            console.log(this.films)
            return chunk(this.films, 4);
        },
        activePrevious() {
            if (this.currentPage % 3 == 1 && this.currentPage < 3) return true;
            return false;
        },
        selectPage(event) {
            // this.currentPage = +event.target.text;
            console.log(event.target.text)
        }
    }
}
</script>

<style lang="stylus" scoped>
.card
    height: 100%
    width: 200px
// .row-flex
//     display flex
//     flex-wrap wrap
</style>
