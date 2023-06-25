import { createStore } from 'vuex'

const store = createStore({
  state() {
    // định nghĩa state
    return {
      count: 0,
      countCart: 0,
      role: 0,
    }
  },
  mutations: {
    // định nghĩa mutations
    increment(state, value=0) {
      if(value!= 0){
        state.count =value
      }
      else
        state.count++
    },
    incrementCart(state, payload) {
      if(payload.callapi!=0){
        state.countCart = payload.callapi
      }
      else
        state.countCart+= payload.value
    },
    setRole(state, role){
      
      state.role = role;
    }
  },
  actions: {
    // định nghĩa actions
    increment({ commit }, value) {
      commit('increment', value)
    },
    incrementCart({ commit }, payload) {
      commit('incrementCart', payload)
    },
    getRole({ commit }, role) {
      commit('setRole', role)
    }
  },
  getters: {
    // định nghĩa getters
    getCount: (state) => {
      return state.count
    },
    getCountCart: (state) => {
      return state.countCart
    },
    getRole: (state) => {
      return state.role
    }
  }
})

export default store
