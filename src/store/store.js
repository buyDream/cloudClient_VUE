import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

import buyer from './buyer'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      user, mutations
    },
    actions
  });