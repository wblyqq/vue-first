import Vuex from 'vuex'
import Vue from 'vue'
import types from './types'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    title: ''
  },
  getters: {
    showUser(state) {
      return state.user.name + state.user.password
    }
  },
  actions: {
    setUser({commit, state}) {
      commit('setuser')
    }

  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.token = data
      state.token = data
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token')
      state.token = null
    },
    [types.TITLE]: (state, data) => {
      state.title = data
    },
    'setuser': (state) => {
      state.user = {name: 'user', password: '1111111'}
    }
  }
  /*,
  modules: {
    user: { // 自定义

    }
  }
  */

})
