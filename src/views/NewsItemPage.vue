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
        <div v-html="newsItem.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "NewsItemPage",
  components: {},
  data() {
    return {
      newsItem: {}
    };
  },
  computed: {
    newsById() {
      return this.$store.getters.newsById;
    }
  },
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
    const id = this.$route.params.id;
    const data = this.newsById(id);
    if (data) {
      this.newsItem = data;
    }
  }
};
</script>
<style lang="less" scoped>
</style>
