import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import plan from './module/plan'
import course from './module/course'
import grades from './module/grades'
import curriculum from './module/curriculum'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    plan,
    course,
    grades,
    curriculum
  }
})
