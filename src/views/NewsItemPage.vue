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
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      selectedTags: []
    };
  },
  computed: {
    ...mapState(["tags"]),
    ...mapGetters(["publishedNews"]),
    checkedTags: {
      get() {
        return this.selectedTags;
      },
      set(value) {
        console.log("VALUE", value);
        this.selectedTags = value;
      }
    },
    filteredNews() {
      let result = this.publishedNews;
      console.log("TEST", this.publishedNews);
      if (this.selectedTags.length) {
        return;
      }
      return result;
    }
  },
  methods: {
    ...mapMutations(["getNews", "getTags"]),
    filterByTag(id) {
      return this.news.filter(el => el.tags.includes(id));
    }
  },
  created: function() {
    this.getNews();
    this.getTags();
  }
};
</script>
<style lang="less" scoped>
.news {
  max-width: 960px;
  margin: 0 auto;

  &__list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
  }

  &__item {
    color: @base-color;
    width: 30%;
    flex-grow: 1;
    height: 320px;
    border: 2px solid @base-color;
    border-radius: 5px;
    margin: 0 10px;
    margin-bottom: 20px;
    text-decoration: none;
  }

  &-card {
    &__img {
      width: 100%;
      height: 130px;
      background-size: cover;
      background-position: center;
    }

    &__content {
      padding: 15px 20px;
    }

    h2 {
      .fz(22, 30);
      margin-bottom: 10px;
    }

    p {
      .fz(16, 24);
    }
  }
}
</style>
