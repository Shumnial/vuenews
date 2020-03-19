import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AdminHome from "../views/AdminHome.vue";
import AdminNews from "../views/AdminNews.vue";
import AdminTags from "../views/AdminTags.vue";
import { setLayout } from "@/router/middlewares";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/admin",
    name: "adminHome",
    component: AdminHome,
    meta: {
      layout: "AdminLayout"
    }
  },
  {
    path: "/admin/news",
    name: "adminNews",
    component: AdminNews,
    meta: {
      layout: "AdminLayout"
    }
  },
  {
    path: "/admin/tags",
    name: "adminTags",
    component: AdminTags,
    meta: {
      layout: "AdminLayout"
    }
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach(setLayout);

export default router;
