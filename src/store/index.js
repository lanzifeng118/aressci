import Vue from 'vue'
import Vuex from 'vuex'
import other from './other'
import experience from './experience'
import common from './common'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    other,
    experience,
    common
  }
})
