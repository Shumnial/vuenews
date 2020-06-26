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
    setNews(state, payload) {
      localStorage.setItem("news", JSON.stringify(payload));
      state.news = payload;
    },
    getNews(state) {
      const res = JSON.parse(localStorage.getItem("news"));
      if (res && res.length) {
        state.news = res;
      }
    },
    getTags(state) {
      const res = JSON.parse(localStorage.getItem("tags"));
      if (res && res.length) {
        state.tags = res;
      }
    },
    saveNews(state, payload) {
      let news = JSON.parse(localStorage.getItem("news"));
      if (!news) news = [];
      const idx = news.findIndex(el => el.id == payload.id);
      const date = new Date();
      function pad(n) {
        return n < 10 ? "0" + n : n;
      }
      const dateFormat = `${pad(date.getDate())}.${pad(
        date.getMonth()
      )}.${date.getFullYear()}
      ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;
      payload.lastUpdate = dateFormat;
      if (idx == -1) {
        payload.id = +String(performance.now()).replace(".", "");
        payload.created = dateFormat;
        news.push(payload);
      } else {
        news[idx] = payload;
      }
      localStorage.setItem("news", JSON.stringify(news));
      state.news = news;
    },
    saveTag(state, payload) {
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
      state.tags = tags;
    },
    deleteNews(state, id) {
      let news = JSON.parse(localStorage.getItem("news"));
      const idx = news.findIndex(el => el.id == id);
      if (idx !== -1) {
        news.splice(idx, 1);
      }
      localStorage.setItem("news", JSON.stringify(news));
      state.news = news;
    },
    deleteTag(state, id) {
      let tags = JSON.parse(localStorage.getItem("tags"));
      let news = JSON.parse(localStorage.getItem("news"));
      const idx = tags.findIndex(el => el.id == id);
      if (idx !== -1) {
        tags.splice(idx, 1);
      }
      localStorage.setItem("tags", JSON.stringify(tags));
      state.tags = tags;
      // Удаляем тег из всех новостей
      const updatedNews = news.map(el => {
        const idx = el.tags.findIndex(tag => tag.id == id);
        if (idx !== -1) {
          el.tags.splice(idx, 1);
        }
      });
      localStorage.setItem("news", JSON.stringify(news));
      state.news = updatedNews;
    }
  },
  getters: {
    getNewsById: state => id => {
      if (!state.news) return;
      return state.news.find(el => el.id == id);
    },
    publishedNews: state => {
      if (!state.news) return;
      return state.news.filter(el => el.isActive);
    }
  },
  actions: {},
  modules: {}
});
