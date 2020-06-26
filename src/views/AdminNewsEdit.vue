<template>
  <div class="admin-news">
    <div class="admin-news__head">
      <h2>Create News</h2>
    </div>
    <div class="admin-news__edit">
      <form class="news-form">
        <div class="news-form__field">
          <label>Title:</label>
          <input type="text" v-model="newsItem.title" />
        </div>

        <div class="news-form__field">
          <label>Description:</label>
          <textarea rows="4" v-model="newsItem.description"></textarea>
        </div>

        <div class="news-form__field news-form__field--image">
          <label>Image:</label>
          <input type="text" v-model="newsItem.img" />
          <img v-if="newsItem.img" :src="newsItem.img" />
        </div>

        <label class="news-form__checkbox">
          <input type="checkbox" v-model="newsItem.isActive" />
          <span>Published</span>
        </label>

        <label class="news-form__checkbox">
          <input type="checkbox" v-model="newsItem.isMain" />
          <span>Main</span>
        </label>

        <div class="news-form__tags">
          <span>Tags:</span>
          <template v-if="tags && tags.length">
            <div class="news-form__tags-list">
              <label
                class="news-form__tag"
                v-for="(item, idx) in tags"
                :key="`tag-${idx}`"
              >
                <input type="checkbox" :value="item" v-model="newsItem.tags" />
                {{ item.title }}
              </label>
            </div>
          </template>
          <template v-else>
            <span
              >No tags available. Create a new one here
              <router-link :to="{ name: 'adminTags' }" tag="a">
                link
              </router-link>
            </span>
          </template>
        </div>

        <WysiwygNews
          v-if="loaded"
          :content="newsItem.content"
          @input="newsItem.content = $event"
        />
        <div v-else>Loading</div>
        <div class="admin-news__controls">
          <button
            class="admin-news__control admin-news__control--save"
            @click.prevent="saveNewsHandler(newsItem)"
          >
            Save
          </button>
          <button
            v-if="newsItem.id"
            @click.prevent="deleteNewsHandler(newsItem.id)"
            class="admin-news__control admin-news__control--delete"
          >
            Delete
          </button>
          <router-link
            class="admin-news__control"
            :to="{ name: 'adminNews' }"
            tag="button"
            >Back</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import WysiwygNews from "@/components/WysiwygNews.vue";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "AdminNewsCreate",
  components: {
    WysiwygNews
  },
  data() {
    return {
      newsItem: {
        isActive: false,
        isMain: false,
        title: "",
        description: "",
        img: "",
        content: "",
        tags: []
      },
      loaded: false
    };
  },
  computed: {
    ...mapState(["tags"]),
    ...mapGetters(["getNewsById"])
  },
  methods: {
    ...mapMutations(["getNews", "getTags", "saveNews", "deleteNews"]),
    saveNewsHandler(item) {
      const isNew = !item.id;
      this.saveNews(item);
      if (isNew) {
        this.$router.push({
          name: "adminNewsEdit",
          params: { id: item.id }
        });
      }
      alert("Success");
    },
    deleteNewsHandler(item) {
      const agree = confirm("Are you sure?");
      if (!agree) return;
      this.deleteNews(item);
      this.$router.go("/");
    }
  },
  created: function() {
    this.getNews();
    this.getTags();
    const id = this.$route.params.id;
    const data = this.getNewsById(id);
    if (data) {
      this.newsItem = { ...this.newsItem, ...data };
    }
    this.loaded = true;
  }
};
</script>
<style lang="less" scoped>
.admin-news {
  &__head {
    display: flex;
    align-items: flex-end;
    margin-bottom: 40px;

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

  &__edit {
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    padding: 20px;
  }

  &__add {
    color: #fff;
    padding: 10px 20px;
    background-color: @color-green;
    border: 2px solid @base-color;
    border-radius: 5px;
    transition: background 0.3s;
    margin-bottom: 40px;

    &:hover {
      background-color: darken(@color-green, 10%);
    }
  }

  &__controls {
    margin-top: 20px;
  }

  &__control {
    width: 150px;
    padding: 10px 20px;
    border-radius: 5px;
    margin-right: 40px;
    border: 2px solid @bg-gray;

    &--save {
      color: #fff;
      background-color: @color-primary;
    }

    &--delete {
      color: #fff;
      background-color: @red;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
.news-form {
  &__field {
    margin-bottom: 30px;

    label {
      display: block;
      .fz(18);
      margin-bottom: 10px;
    }

    input[type="text"] {
      border: 2px solid lightgray;
      border-radius: 5px;
      padding: 5px 10px;
    }

    textarea {
      font-family: Arial;
      width: 100%;
      padding: 10px;
      border: 2px solid lightgray;
      border-radius: 5px;
    }

    &--image {
      input {
        margin-bottom: 10px;
      }

      img {
        max-width: 250px;
        display: block;
      }
    }
  }

  &__checkbox {
    display: block;
    margin-bottom: 30px;

    input {
      margin-right: 8px;
    }

    span {
      .fz(18);
    }
  }

  &__tags {
    margin-bottom: 30px;

    span {
      .fz(18);
      display: block;
      margin-bottom: 10px;
    }

    &-list {
      margin: 0 -10px;
    }
  }

  &__tag {
    display: inline-block;
    margin: 0 10px;
  }
}
</style>
