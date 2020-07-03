<template>
  <div>
    <router-view :key="$route.path"></router-view>
  </div>
</template>
<script>
export default {
  name: "AdminHome",
  components: {},
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped></style>
