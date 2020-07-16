import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  strict: true,
  state: {
    keepList: []
  },
  mutations: {
    add(state, payload) {
      console.log('给home添加缓存')
      if (!state.keepList.includes(payload.name)) {
        state.keepList.push(payload.name)
      }
    },
    remove(state, payload) {
      console.log('给home卸载缓存')
      state.keepList = state.keepList.filter(item => item !== payload.name)
      console.log(state.keepList)
    }
  }
})
export default store
