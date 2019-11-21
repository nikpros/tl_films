import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    genres: Array,
    movies: {
        page: 1,
        total_results: Number,
        total_pages: Number,
        films: Array
    }
}

const actions = {
    getAllGenres({ commit }, { key, language }) {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=${language}`)
        .then(response => response.json())
        .then(json => commit('updateArray', { array: 'genres', items: json }))
        .catch(ex => console.error('parse error ', ex))
    },
    getAllMovies({ commit }, { page, genres, key, language }) {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=${language}
        ${page != undefined ? '&page='+page : ''}
        ${typeof genres != 'undefined' && genres.length != 0 ? '&with_genres='+genres.map(el=> el.id).join() : ''}`
        .replace(/\s/g,''))
        .then(response => response.json())
        .then(json => {
            commit('updateMovies', { data: json })
        })
        .catch(ex => console.error('parse error ', ex))
    },
}

const mutations = {
    updateArray(state, { array, items }) {
        state[array] = items.genres
    },
    updateMovies(state, { data }) {
        state.movies.page = data.page;
        state.movies.total_results = data.total_results;
        state.movies.total_pages = data.total_pages;
        state.movies.films = data.results;
    }
}

const getters = {
    genres: state => state.genres,
    films: state => state.movies.films,
    total_pages: state => state.movies.total_pages
}


export default new Vuex.Store({
    actions,
    getters,
    mutations,
    state
})