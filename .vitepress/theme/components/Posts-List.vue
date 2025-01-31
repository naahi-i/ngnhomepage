<template>
  <div class="container posts-content">
    <TransitionGroup class="posts-list" name="list" tag="div">
      <article class="post" v-for="post in postsList" :key="post.href">
        <header class="post-header">
          <div class="title">
            <div class="title-dot"></div>
            <h1 class="name">
              <a :href="base + post.href">{{ post.title }}</a>
              <span v-if="post.pinned" class="iconfont icon-pinned pinned"></span>
            </h1>
          </div>
          <div class="meta-info-bar">
            <span class="iconfont icon-time time"></span>
            <div class="time-info">
              <time datetime="">{{ formatDate(post.create) }}</time>
            </div>
            <div class="wordcount seperator">约{{ post.wordCount }}字</div>
          </div>
          <ul class="tags">
            <li v-for="tag in post.tags" :key="tag">
              <a :href="`${base}tags/`" @click="state.currTag = tag"><i class="iconfont icon-tag"></i> {{ tag }}</a>
            </li>
          </ul>
        </header>
        <div class="excerpt">
          <p>{{ post.excerpt }}</p>
        </div>
      </article>
    </TransitionGroup>
    <span v-if="totalPage > 1" class="pagination">
      <button :disabled="currPage === 1" :class="{ hide: currPage === 1 }" id="up" @click="currPage--">
        <i class="iconfont icon-arrow"></i>
      </button>
      <span>{{ currPage }} / {{ totalPage }}</span>
      <button :disabled="currPage >= totalPage" :class="{ hide: currPage >= totalPage }" id="next" @click="currPage++">
        <i class="iconfont icon-arrow"></i>
      </button>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { ref, computed } from 'vue'
import { data as posts } from '../utils/posts.data'
import { useStore } from '../store'
const { state } = useStore()
const base = useData().site.value.base

function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}
const currPage = ref(1)
const pageSize = ref(5)
const postsList = computed(() => {
  return finalPosts.value.slice(
    (currPage.value - 1) * pageSize.value,
    currPage.value * pageSize.value,
  )
})
const totalPage = computed(() => Math.max(1, Math.ceil(finalPosts.value.length / pageSize.value)))

// 文章传值
const finalPosts = computed(() => {
  // 优先显示 selectedPosts，如果为空则展示全部 posts
  return state.selectedPosts.length > 0 ? state.selectedPosts : posts
})
</script>

<style scoped lang="less">
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
  right: 0;
  left: 0;
}

.posts-content {

  article,
  h1,
  ul {
    margin: 0;
    padding: 0;
  }
}

.posts-list {
  position: relative;
  overflow-wrap: break-word;
  margin-top: 5vh;
  z-index: 90;

  .post {
    display: flex;
    flex-direction: column;
    margin: 0 0 50px 0;
    padding-bottom: 16px;
    background-color: var(--foreground-color);
    border-radius: 32px;
    border-left: solid 16px var(--pot-border-left);
    background-image: var(--deco1);
    background-size: contain;
    background-position: right;
    background-repeat: no-repeat;
    box-shadow: 0px 0px 8px rgba(var(--blue-shadow-color), 0.8);
    transition: all 0.5s;
  }
}

.post-header {
  padding: 32px 40px 0;

  .title {
    position: relative;
    margin-bottom: 10px;

    .title-dot {
      width: 4px;
      height: 25px;
      position: absolute;
      left: -16px;
      top: 8px;
      background: var(--pot-border-left);
      border-radius: 2px;
      transition: background 0.5s;
    }

    .name {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    a {
      color: var(--font-color-grey);
      transition: text-shadow 0.5s, color 0.5s;

      &:hover {
        text-shadow: 0 0 3px var(--font-color-grey);
      }
    }
  }

  .pinned {
    cursor: pointer;
    font-size: 20px;
    color: var(--font-color-grey);
    transform: rotate(-135deg);
    margin-top: 2px;
  }

  .meta-info-bar {
    display: flex;
    margin-bottom: 7px;

    .time {
      cursor: pointer;
      font-size: 14px;
      color: var(--font-color-grey);
      margin: 2px 5px 0 0;
    }

    .seperator::before {
      content: '';
      display: inline-block;
      border-radius: 50%;
      height: 4px;
      width: 4px;
      vertical-align: middle;
      background-color: var(--font-color-grey);
      margin: 0 16px;
    }
  }
}

.tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 6px;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 6px;
    margin-right: 16px;

    a {
      color: var(--font-color-grey);
      padding: 3px 5px;
      color: var(--font-color-gold);
      background-color: var(--btn-background);
      border-radius: 5px;
      transition: all 0.5s;
      font-size: 20px;

      i {
        font-size: 18px;
      }

      &:hover {
        background-color: var(--btn-hover);
        color: var(--font-color-gold);
      }
    }
  }
}

.excerpt {
  padding: 0 40px;

  p {
    margin: 18px 0 15px 0;
    font-size: 20px;
  }
}

.pagination {
  display: flex;
  color: black;
  font-size: 25px;
  justify-content: space-between;
  margin-top: 50px;

  span {
    z-index: 900;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .hide {
    opacity: 0;
    cursor: default;
  }

  .icon-arrow {
    font-size: 36px;
    color: var(--icon-color);
  }

  #up {
    animation: arrow-pre 1s ease-in-out infinite alternate;
  }

  #next {
    animation: arrow-next 1s ease-in-out infinite alternate;
  }
}

@keyframes arrow-pre {
  from {
    transform: translateX(0) rotate(-0.25turn);
  }

  to {
    transform: translateX(10px) rotate(-0.25turn);
  }
}

@keyframes arrow-next {
  from {
    transform: translateX(0) rotate(0.25turn);
  }

  to {
    transform: translateX(-10px) rotate(0.25turn);
  }
}

@media (max-width: 768px) {
  .posts-list {
    .post {
      margin: 0 20px 30px 20px;
      background-size: cover;
      padding-bottom: 1px;
      border-left: solid 1.5vh var(--pot-border-left);
    }
  }

  .tags {
    margin-bottom: 0px;

    li {
      padding-top: 2px;
      margin-right: 14px;

      a {
        padding: 1px 5px;
        border-radius: 5px;
        font-size: 15px;

        i {
          font-size: 12px;
        }
      }
    }
  }

  .excerpt {
    padding: 0 40px;

    p {
      margin: 10px 0 15px 0;
      font-size: 13px;

    }
  }

  .post-header {
    padding: 20px 35px 0;

    .name {
      font-size: 22px;
      gap: 8px !important; // 调整间距
    }

    .title {
      margin-bottom: 9px;

      .title-dot {
        height: 18px;
        top: 5px;
        left: -10px;
      }
    }

    .pinned {
      font-size: 14px;
    }
  }
  .meta-info-bar {
    font-size: 14px;
    .time {
      font-size: 10px !important;
      margin: 3px 2px 0 0!important;
    }
  }
  .pagination {
    font-size: 18px;
  }
}
</style>
