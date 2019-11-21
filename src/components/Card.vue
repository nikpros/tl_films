<template lang="pug">
.card
    .card-body
        h5.card-title {{ card.title }}
        p.card-text {{ card.overview | trimText }}
        button.btn.btn-primary(type='button' @click="show") {{ language == 'en' ? 'more' : 'подробнее'}}

    modal(:name="`modal${index}`"
        :draggable="true"
        :adaptive="true"
        :scrollable="true"
        :minWidth="300"
        height="auto"
        )
        .modal_content
            h3 {{ card.title }}
            .video(v-if="card.video")
                video(:src="source_video" controls)
            p.mt-4 {{ card.overview }}
            p {{ language == 'en' ? 'Popularuty' : 'Популярность'}}: {{ card.popularity}}
            p {{ language == 'en' ? 'Release date' : 'Дата выхода'}}: {{ card.release_data}}
            p {{ language == 'en' ? 'Vote average' : 'Средняя оценка'}}: {{ card.vote_average}}
            p {{ language == 'en' ? 'Vote count' : 'Количество голосов'}}: {{ card.vote_count}}



</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({}),
    computed: {
        source_video() {
            return `https://api.themoviedb.org/3/movie/${this.card.id}/videos?api_key=${process.env.API_KEY}&language=${this.language}`;
        }
    },
    props: {
        card: Object,
        language: String,
        index: Number
    },
    filters: {
        trimText: text => {
            if (text.length > 50) {
                return [...text].slice(0,50).join('') + '...'
            }
        },
    },
    mounted() {
        console.log(this.card)
    },
    methods: {
        show() {
            this.$modal.show(`modal${this.index}`)
        },
        hide () {
            this.$modal.hide(`modal${this.index}`);
        }
    }
}
</script>

<style lang="stylus" scoped>
.card
    height: 100%
    min-width: 200px
    max-width: 300px
.modal_content
    margin: 15px
</style>