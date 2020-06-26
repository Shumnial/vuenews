import store from "../store";

// Выставляем layout, указанный в мете маршрута
// Если не указан - выставляем дефолтный
export const setLayout = (to, from, next) => {
  if (to.meta.layout) {
    store.commit("SET_LAYOUT", to.meta.layout);
  } else {
    store.commit("SET_LAYOUT", "DefaultLayout");
  }
  next();
};
