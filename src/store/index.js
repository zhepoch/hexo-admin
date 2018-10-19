import Vue from 'vue'
import Vuex from 'vuex'

import { getConfig, saveConifg, getBlogList } from '../assets/ajax'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    hexo: {
      source: '',
      tags: [],
      categories: [],
    },
    blogLists: []
  },

  getters: {
    hexoSource: state => state.hexo.source,
    tagsOption: state => state.hexo.tags,
    categoriesOption: state => state.hexo.categories,
  },

  mutations: {
    getConfig (state, data) {
      state.hexo.source = data.hexo.source
      state.hexo.categories = data.hexo.categories
      state.hexo.tags = data.hexo.tags
    },
    setBlogList (state, data) {
      state.blogLists = data
    }
  },

  actions: {
    getConfig (context) {
      return getConfig().then(res => {
        if (res.code !== 0) {
          return
        }
        context.commit('getConfig', res.data)
      })
    },

    saveConifg (context, data) {
      return saveConifg(data).then(res => {
        if (res.code !== 0) {
          return
        }
        context.dispatch('getConfig')
      })
    },

    getBlogList ({commit}) {
      getBlogList().then(res => {
        if (res.code !== 0) {
          return
        }
        commit('setBlogList', res.data)
      })
    }
  }
})

export default store
