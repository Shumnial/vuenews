<template>
  <div class="default-layout">
    <div class="default-layout__header"></div>
    <div class="default-layout__body">
      <div class="container">
        <div>DEFAULT LAYOUT</div>
        <router-view :key="$route.path"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
  components: {}
};
</script>

<style lang="less" scoped></style>
