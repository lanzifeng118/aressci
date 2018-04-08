import lang from '../../config/lang'
import api from 'components/tools/api'
import apiEn from 'components/tools/api-en'

const state = {
  lang,
  api: lang === 'cn' ? api : apiEn
}

const getters = {
  lang: state => state.lang,
  api: state => state.api
}

const actions = {}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
