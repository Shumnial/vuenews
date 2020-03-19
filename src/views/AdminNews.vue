<template>
  <div>
    <div class="admin-news__header">
      <h2>News</h2>
      <p>All news in the database</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "AdminNews",
  components: {},
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.admin-news__header {
  display: flex;
  align-items: flex-end;

  h2 {
    .fz(30);
    font-weight: 500;
    margin-right: 10px;
  }

  p {
    opacity: 0.7;
  }

  h2,
  p {
    margin-bottom: 0;
  }
}
</style>
