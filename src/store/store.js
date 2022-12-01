import Vuex from 'vuex'

import { userStore } from './user.store.js'
import { stayStore } from './stay.store.js'
import { reviewStore } from './review.store.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    userStore,
    stayStore,
    reviewStore
  },
  state: {
    isList:true
  },
  getters:{
    isList({isList}){
      return isList
    }
  },
  mutations: {
    setDetails(state){
      state.isList = false
    },
    setList(state){
      state.isList = true
    }
  },
  actions: {
  },
})
