<template>
  <div class="default-layout">
    <div class="default-layout__header">
      <h2 class="default-layout__header-title">Vuenews</h2>
    </div>
    <main class="default-layout__body">
      <div class="container">
        <router-view :key="$route.path"></router-view>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
  components: {}
};
</script>

<style lang="less" scoped>
.default-layout {
  &__header {
    display: flex;
    padding: 20px 20px;
    background-color: @bg-gray;

    &-title {
      color: @color-white;
      margin-right: 50px;
    }
  }

  &__body {
    padding: 70px 0;
  }
}
</style>
