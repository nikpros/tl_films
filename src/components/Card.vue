<template lang="pug">
    .card(style='width: 18rem;')
        img.card-img-top
        .card-body
            h5.card-title {{ title }}
            p.card-text
            a.btn.btn-primary(href='#') Go somewhere
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({}),
    computed: {
        // ...mapGetters([''])
    },
    props: {
        title: String
    },
    mounted() {
        
    }
}
</script>