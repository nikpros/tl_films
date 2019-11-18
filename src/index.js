/**
 * Varinats connect libraries
 * 
 * import 'vue'
 * import 'bootstrap/dist/css/bootstrap.min.css'
 * import Vue from 'vue'
 * window.Vue = require('vue')
 */

import './js/common'
import './assets/styl/main.styl'
import 'bootstrap/dist/css/bootstrap.min.css'

window.Vue = require('vue')
Vue.component('example-component', require('./components/Example.vue').default)

// Vue init
const app = new Vue({
    el: '#app'
})