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
    getAllGenres({ commit }) {
        fetch('https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=9d65863d09f75cecc0d4128a62045df3')
        .then(response => response.json())
        .then(json => commit('updateArray', { array: 'genres', items: json }))
        .catch(ex => console.error('parse error ', ex))
    },
    getAllMovies({ commit }) {
        fetch('https://api.themoviedb.org/3/discover/movie?&language=en&api_key=9d65863d09f75cecc0d4128a62045df3')
        .then(response => response.json())
        .then(json => commit('updateMovies', { data: json }))
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