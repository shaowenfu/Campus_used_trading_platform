import Vue from 'vue'
import Vuex from 'vuex'
import admin from './modules/admin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    admin
  },
  getters: {
    token: state => state.admin.token,
    userInfo: state => state.admin.userInfo
  }
}) 