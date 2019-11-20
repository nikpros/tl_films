<template lang="pug">
    .card
        img.card-img-top(:src="`https://image.tmdb.org/t/p/w500${poster_path}`")
        .card-body
            h5.card-title {{ title }}
            p.card-text
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({}),
    computed: {
        // ...mapGetters([''])
    },
    props: {
        title: String,
        poster_path: String
    },
    mounted() {
        
    }
}
</script>