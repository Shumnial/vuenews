import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    layout: "DefaultLayout",
    news: [],
    tags: []
  },
  mutations: {
    SET_LAYOUT(state, payload) {
      state.layout = payload;
    },
    SET_NEWS(state, payload) {
      state.news = payload;
    },
    SET_TAGS(state, payload) {
      state.tags = payload;
    }
  },
  getters: {
    newsById: state => id => {
      if (!state.news) return;
      return state.news.find(el => el.id == id);
    },
    publishedNews: state => {
      if (!state.news) return;
      return state.news.filter(el => el.isActive);
    }
  },
  actions: {
    getNews({ commit }) {
      const data = JSON.parse(localStorage.getItem("news"));
      commit("SET_NEWS", data);
      return data;
    },
    getTags({ commit }) {
      const data = JSON.parse(localStorage.getItem("tags"));
      commit("SET_TAGS", data);
      return data;
    },
    saveNews({ commit }, payload) {
      let news = JSON.parse(localStorage.getItem("news"));
      if (!news) news = [];
      const idx = news.findIndex(el => el.id == payload.id);
      const date = new Date();
      console.log("PAYLOAD", payload);
      payload.lastUpdate = date;
      if (idx == -1) {
        payload.id = +String(performance.now()).replace(".", "");
        payload.created = date;
        news.push(payload);
      } else {
        news[idx] = payload;
      }
      localStorage.setItem("news", JSON.stringify(news));
      commit("SET_NEWS", news);
    },
    saveTag({ commit }, payload) {
      let tags = JSON.parse(localStorage.getItem("tags"));
      if (!tags) tags = [];
      const idx = tags.findIndex(el => el.title == payload.title);
      if (idx == -1) {
        payload.id = +String(performance.now()).replace(".", "");
        tags.push(payload);
      } else {
        throw new Error("Tag already exists!");
      }
      localStorage.setItem("tags", JSON.stringify(tags));
      commit("SET_TAGS", tags);
    },
    deleteNews({ commit }, id) {
      let news = JSON.parse(localStorage.getItem("news"));
      const idx = news.findIndex(el => el.id == id);
      if (idx !== -1) {
        news.splice(idx, 1);
      }
      localStorage.setItem("news", JSON.stringify(news));
      commit("SET_NEWS", news);
    },
    deleteTag({ commit }, id) {
      let tags = JSON.parse(localStorage.getItem("tags"));
      let news = JSON.parse(localStorage.getItem("news"));
      const idx = tags.findIndex(el => el.id == id);
      if (idx !== -1) {
        tags.splice(idx, 1);
      }
      localStorage.setItem("tags", JSON.stringify(tags));
      commit("SET_TAGS", tags);
      // Удаляем тег из всех новостей
      const updatedNews = news.map(el => {
        const idx = el.tags.findIndex(tag => tag.id == id);
        if (idx !== -1) {
          el.tags.splice(idx, 1);
        }
      });
      localStorage.setItem("news", JSON.stringify(news));
      commit("SET_NEWS", updatedNews);
    }
  },
  modules: {}
});
