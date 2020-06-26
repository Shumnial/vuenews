<template>
  <div class="admin-news">
    <div class="admin-news__head">
      <h2>News</h2>
      <p>All news in the database</p>
    </div>
    <router-link class="admin-news__add" :to="{ name: 'adminNewsCreate' }">
      Add news +
    </router-link>
    <table class="news-table">
      <tr>
        <th>Created</th>
        <th>Last Update</th>
        <th>Published</th>
        <th>Main</th>
        <th>Image</th>
        <th>Title</th>
        <th>Description</th>
        <th>Content</th>
        <th>Tags</th>
        <th>Actions</th>
      </tr>

      <template v-if="news.length">
        <tr v-for="(item, idx) in news" :key="`news-item-${idx}`">
          <td>{{ item.created }}</td>
          <td>{{ item.lastUpdate }}</td>
          <td>{{ item.isActive }}</td>
          <td>{{ item.isMain }}</td>
          <td><img :src="item.img" /></td>
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td v-html="item.content"></td>
          <td>
            {{ item.tags.map(el => el.title).join(", ") }}
          </td>
          <td>
            <router-link
              :to="{ name: 'adminNewsEdit', params: { id: item.id } }"
              >Edit</router-link
            >
          </td>
        </tr>
      </template>
      <template v-else>
        No news found
      </template>
    </table>

    <div>
      <a :href="exportJSON" download="news">Export as JSON</a>
      <label class="admin-news__import">
        Import JSON
        <input type="file" @change="importJSON($event)" />
      </label>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "AdminNews",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["news", "tags"]),
    exportJSON() {
      const file = new Blob([JSON.stringify(this.news, null, 2)], {
        type: "application/json"
      });
      const href = URL.createObjectURL(file);
      return href;
    }
  },
  methods: {
    ...mapMutations(["getNews", "getTags", "setNews"]),
    importJSON(evt) {
      const file = evt.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const result = JSON.parse(reader.result);
        const agree = confirm("Are you sure?");
        if (!agree) return;
        this.setNews(result);
        evt.target.value = "";
      };
    }
  },
  created: function() {
    this.getNews();
    this.getTags();
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

  &__add {
    display: inline-block;
    color: #fff;
    padding: 10px 20px;
    background-color: @color-green;
    border: 2px solid @base-color;
    border-radius: 5px;
    transition: background 0.3s;
    text-decoration: none;
    margin-bottom: 40px;

    &:hover {
      background-color: darken(@color-green, 10%);
    }
  }

  &__import {
    display: inline-block;
    color: @color-primary;
    text-decoration: underline;
    margin-left: 40px;
    cursor: pointer;

    &:hover {
      text-decoration: none;
    }

    input {
      display: none;
    }
  }
}

.news-table {
  width: 100%;
  border-collapse: separate;
  margin-bottom: 40px;

  tr {
    &:nth-child(2n - 2) {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  th {
    .fz(16);
    border: 2px solid rgba(0, 0, 0, 0.05);
    border-right: none;
    padding: 8px 12px;
    box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.05);

    &:first-child {
      border-top-left-radius: 5px;
    }

    &:last-child {
      border: 2px solid rgba(0, 0, 0, 0.05);
      border-top-right-radius: 5px;
    }
  }

  td {
    .fz(16, 26);
    max-width: 250px;
    padding: 10px 12px;
    vertical-align: middle;
    border: 2px solid rgba(0, 0, 0, 0.05);
    border-right: none;

    &:last-child {
      border-right: 2px solid rgba(0, 0, 0, 0.05);
    }
  }
}
</style>
