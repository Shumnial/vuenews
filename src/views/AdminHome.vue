<template>
  <div>
    <h2>Welcome to administration panel</h2>
    <router-view :key="$route.path"></router-view>
    <admin-panel></admin-panel>
  </div>
</template>
<script>
import AdminPanel from "@/components/AdminPanel.vue";
export default {
  name: "AdminHome",
  components: {
    AdminPanel
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped></style>
