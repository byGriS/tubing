import Vue from "vue"
import Vuex from "vuex"

import tubeStore from './tubeStore'

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    tubeStore: tubeStore
  }
})