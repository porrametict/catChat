import Vue from 'vue'
import Vuex from 'vuex'

function store (name) {
    return function (resolve) {
        require(['./modules/'+name],resolve);
    }
}

import login from "./modules/login"

Vue.use(Vuex);
export default new Vuex.Store({

    modules  : {
        login : login
    }

})