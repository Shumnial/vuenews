import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    layout: "DefaultLayout"
  },
  mutations: {
    SET_LAYOUT(state, payload) {
      state.layout = payload;
    }
  },
  actions: {},
  modules: {}
});
