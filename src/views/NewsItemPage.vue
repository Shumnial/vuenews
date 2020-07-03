<template>
  <div class="news">
    <div class="news__content">
      <div
        class="news__img"
        :style="{ backgroundImage: `url(${newsItem.img})` }"
      ></div>
      <div class="news__content">
        <h2>{{ newsItem.title }}</h2>
        <p>{{ newsItem.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    getNews() {
      return this.$store.dispatch("getNews");
    },
    getTags() {
      return this.$store.dispatch("getTags");
    }
  },
  created: function() {
    this.getNews();
    this.getTags();
  }
};
</script>
<style lang="less" scoped>
</style>
