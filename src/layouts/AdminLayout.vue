<template>
  <div class="admin-layout">
    <div class="admin-layout__header">
      <h2 class="admin-layout__header-title">Vuenews Admin panel</h2>
      <nav class="nav">
        <router-link :to="{ name: 'adminHome' }">Home</router-link>
        <router-link :to="{ name: 'adminNews' }">News</router-link>
        <router-link :to="{ name: 'adminTags' }">Tags</router-link>
      </nav>
    </div>
    <div class="admin-layout__body">
      <div class="container">
        <router-view :key="$route.path"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminLayout",
  components: {}
};
</script>

<style lang="less" scoped>
.admin-layout__header {
  display: flex;
  padding: 20px 20px;
  background-color: @bg-gray;

  &-title {
    // position: absolute;
    // top: 50%;
    // left: 20px;
    // transform: translateY(-50%);
    color: @color-white;
    margin-right: 50px;
  }
}

.admin-layout__body {
  padding: 30px 0;
}

nav a {
  display: inline-block;
  font-size: 16px;
  margin-right: 20px;
  text-decoration: none;
  color: #dee9ed;

  &:hover {
    text-decoration: underline;
  }

  &:last-child {
    margin-right: 0;
  }
}

.router-link-exact-active {
  color: @color-green;
  text-decoration: underline;
}
</style>
