import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const mutationTypes = {
    setRouterName:"setRouterName"
};

export default new Vuex.Store({
  state: {
    // 当前路由name
      routerName:"index",
  },
  mutations: {
      [mutationTypes.setRouterName](state,name){
        state.routerName = name;
      }
  },
  actions: {

  }
})

export {mutationTypes};
