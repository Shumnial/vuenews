<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/admin">Admin</router-link>
    </div> -->
    <!-- <router-view /> -->
    <component :is="layout"></component>
  </div>
</template>
<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
export default {
  components: {
    DefaultLayout,
    AdminLayout
  },
  computed: {
    layout() {
      return this.$store.state.layout;
    }
  }
};
</script>
<style src="./styles/common.less" lang="less"></style>
<style lang="less">
// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
