<template>
  <div class="admin-tags">
    <div class="admin-tags__head">
      <h2>Tags</h2>
      <p>All tags in the database</p>
    </div>
    <form class="admin-tags__add" @submit.prevent="addTag(newTag)">
      <input type="text" name="tag" v-model="newTag.title" />
      <button>Add</button>
    </form>

    <template v-if="tags.length">
      <div class="tags">
        <div
          class="tags__item tag"
          v-for="(item, idx) in tags"
          :key="`tags-item-${idx}`"
        >
          <span class="tag__title">{{ item.title }}</span>
          <div class="tag__delete" @click="deleteTag(item.id)"></div>
        </div>
      </div>
    </template>
    <template v-else>
      <div>
        No tags found
      </div>
    </template>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "AdminTags",
  components: {},
  data() {
    return {
      newTag: {
        title: ""
      }
    };
  },
  computed: mapState(["tags"]),
  methods: {
    ...mapMutations(["getTags", "saveTag", "deleteTag"]),
    addTag(tag) {
      if (!tag.title.length) {
        return alert("Поле не может быть пустым");
      }
      try {
        this.saveTag(tag);
        this.getTags();
        tag.title = "";
      } catch (err) {
        alert(err.message);
      }
    }
  },
  created: function() {
    this.getTags();
  }
};
</script>
<style lang="less" scoped>
.admin-tags {
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
    input {
      padding: 5px 10px;
      margin-right: 8px;
    }

    button {
      display: inline-block;
      color: #fff;
      padding: 4px 10px;
      background-color: @color-green;
      border: 2px solid @base-color;
      border-radius: 5px;
      transition: background 0.3s;
      margin-bottom: 40px;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        background-color: darken(@color-green, 10%);
      }
    }
  }
}

.tags {
  max-width: 800px;
  flex-wrap: wrap;
  display: flex;
  margin: 0 -10px;

  &__item {
    min-width: 50px;
    border: 2px solid lightgray;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 0 10px;
    margin-bottom: 10px;
  }
}

.tag {
  position: relative;
  overflow: hidden;

  &__delete {
    position: absolute;
    display: none;
    line-height: 25px;
    color: #000;
    width: 25px;
    height: 37px;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: lightgray;
    background-image: url("https://image.flaticon.com/icons/svg/1828/1828778.svg");
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }

  &:hover &__delete {
    display: block;
  }
}
</style>
