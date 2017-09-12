import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
    userinfo: {},
    urlBg: []
};
const mutations = {
    SAVE_USER(state, info) {
      state.userinfo = info;
  	}
}


const getters = {
    
}

const actions = {
    
}
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})