import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NewsItemPage from "../views/NewsItemPage.vue";
import AdminHome from "../views/AdminHome.vue";
import AdminNews from "../views/AdminNews.vue";
import AdminNewsEdit from "../views/AdminNewsEdit.vue";
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
    path: "/news/:id",
    name: "newsItemPage",
    component: NewsItemPage
  },
  {
    path: "/admin",
    name: "adminHome",
    redirect: { name: "adminNews" },
    component: AdminHome,
    meta: {
      layout: "AdminLayout"
    },
    children: [
      {
        path: "news",
        name: "adminNews",
        component: AdminNews,
        meta: {
          layout: "AdminLayout"
        }
      },
      {
        path: "/admin/news/create",
        name: "adminNewsCreate",
        component: AdminNewsEdit,
        meta: {
          layout: "AdminLayout"
        }
      },
      {
        path: "/admin/news/edit/:id",
        name: "adminNewsEdit",
        component: AdminNewsEdit,
        meta: {
          layout: "AdminLayout"
        }
      },
      {
        path: "tags",
        name: "adminTags",
        component: AdminTags,
        meta: {
          layout: "AdminLayout"
        }
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach(setLayout);

export default router;
