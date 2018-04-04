import axios from 'axios'
import util from 'components/tools/util'

const state = {
  list: []
}

const getters = {
  experienceList: state => state.list
}

const actions = {
  setExperienceList({ commit, rootState }, toast) {
    axios(rootState.common.api.experienceList.query()).then(res => {
      let data = res.data
      // console.log(data)
      if (data.code === '200') {
        let list = data.data.list
        list.forEach((v, i) => {
          v.link = `/experience/list/c${v.id}`
        })
        commit('setExperienceList', list)
      } else {
        util.req.queryError(toast)
      }
    })
  }
}

const mutations = {
  setExperienceList(state, list) {
    state.list = list
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
