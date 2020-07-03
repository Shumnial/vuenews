<template>
  <div class="news">
    <div class="news-aside">
      <div class="news__tags">
        <template v-for="(item, idx) in tags">
          <div class="news__tag" :key="`tags-item-${idx}`">
            <label :for="`tags-item-${idx}`">{{ item.title }}</label>
            <input
              type="checkbox"
              class="news__tag"
              :name="item.id"
              :value="item.id"
              :id="`tags-item-${idx}`"
              v-model="checkedTags"
            />
          </div>
        </template>
      </div>
    </div>
    <div class="news__content">
      <div class="news__list">
        <a
          href="#"
          class="news__item news-card"
          v-for="(item, idx) in filteredNews"
          :key="`news-item-${idx}`"
        >
          <div
            class="news-card__img"
            :style="{ backgroundImage: `url(${item.img})` }"
          ></div>
          <div class="news-card__content">
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
          </div>
        </a>
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
    return {
      checkedTags: []
    };
  },
  computed: {
    tags() {
      return this.$store.state.tags;
    },
    publishedNews() {
      return this.$store.getters.publishedNews;
    },
    filteredNews() {
      let result = this.publishedNews;
      console.log("TEST", this.publishedNews);
      if (this.checkedTags.length) {
        return result.filter(item =>
          item.tags.some(tag => this.checkedTags.includes(tag.id))
        );
      }
      return result;
    }
  },
  methods: {
    getNews() {
      return this.$store.dispatch("getNews");
    },
    getTags() {
      return this.$store.dispatch("getTags");
    },
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
