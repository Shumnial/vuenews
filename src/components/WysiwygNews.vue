<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click.prevent="commands.bold"
        >
          B
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click.prevent="commands.italic"
        >
          I
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click.prevent="commands.strike"
        >
          Strike
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click.prevent="commands.underline"
        >
          _
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click.prevent="commands.paragraph"
        >
          &lt;p&gt;
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click.prevent="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click.prevent="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click.prevent="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 4 }) }"
          @click.prevent="commands.heading({ level: 4 })"
        >
          H4
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click.prevent="commands.bullet_list"
        >
          &lt;ul&gt;
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click.prevent="commands.ordered_list"
        >
          &lt;ol&gt;
        </button>

        <button class="menubar__button" @click.prevent="commands.undo">
          undo
        </button>

        <button class="menubar__button" @click.prevent="commands.redo">
          redo
        </button>
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from "tiptap-extensions";
export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  data() {
    return {
      editor: null,
      editorCfg: {
        extensions: [
          new BulletList(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History()
        ],
        onUpdate: ({ getHTML }) => {
          const html = getHTML();
          this.$emit("input", html);
        }
      }
    };
  },
  props: {
    content: {
      type: String
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  mounted: function() {
    this.editor = new Editor(this.editorCfg);
    this.editor.setContent(this.content);
  }
};
</script>
<style lang="less">
.menubar {
  display: inline-block;
  border: 2px solid lightgray;
  border-bottom: 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 10px 15px;

  &__button {
    margin-right: 10px;
    border: none;
    background: none;
    border: 1px solid lightgray;
    border-radius: 2px;

    &.is-active {
      background-color: rgba(0, 0, 0, 0.1);
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

.editor {
  &__content {
    min-height: 100px;
    padding: 10px;
    border: 2px solid lightgray;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}

.ProseMirror {
  h1 {
    .fz(32, 42);
  }

  h2 {
    .fz(28, 38);
  }

  h3 {
    .fz(24, 34);
  }

  h4 {
    .fz(20, 30);
  }

  em {
    font-style: italic;
  }

  strong {
    font-weight: 700;
  }

  ul {
    padding-left: 15px;
    list-style: circle outside;
  }

  ol {
    padding-left: 15px;
    list-style: decimal outside;
  }
}
</style>
