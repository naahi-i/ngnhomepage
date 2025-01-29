<template>
  <header :class="{ postViewer: state.currPost.href, posts: page.filePath === 'posts/index.md' }">
    <nav class="container">
      <span class="logo">
        <img @dragstart.prevent src="../../assets/icon/navLogo.svg" alt="" />
      </span>
      <span class="menu">
        <ul>
          <li v-for="item in menuList">
            <a :href="base + item.url">{{ item.name }}</a>
          </li>
        </ul>
      </span>
      <div class="nav-controls">
        <transition name="fade-slide">
          <span v-show="page.filePath === 'posts/index.md'" class="iconfont icon-search search"
            @click="showSearchDialog"></span>
        </transition>
        <label class="grid">
          <input type="checkbox" @click="toggleOptionsDialog" />
          <div class="grid-button" @click="handleGridClick">
            <div class="grid-cell" v-for="i in 8" :key="i"></div>
          </div>
        </label>
      </div>
    </nav>
  </header>
  <OptionsDialog v-show="state.OptionsDialog"></OptionsDialog>
  <SearchDialog v-if="state.searchDialog" @close-dialog="closeSearchDialog"></SearchDialog>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
const { page } = useData()

const base = useData().site.value.base
const themeConfig = useData().theme.value
const menuList = themeConfig.menuList

import { useStore } from '../../store'
const { state } = useStore()

import SearchDialog from './Search-Dialog.vue'
import OptionsDialog from './Options-Dialog.vue'

const closeSearchDialog = () => {
  if (state.OptionsDialog) state.OptionsDialog = false // 如果选项框开着就关闭
  state.searchDialog = false
}

const handleGridClick = (e: MouseEvent) => {
  const button = e.currentTarget as HTMLElement;
  button.classList.remove('clicking');
  void button.offsetWidth; // 触发重排以重新开始动画
  button.classList.add('clicking');
  setTimeout(() => button.classList.remove('clicking'), 600); // 调整为600ms确保动画完整播放
}

const toggleOptionsDialog = () => {
  state.OptionsDialog = !state.OptionsDialog
}

const showSearchDialog = () => {
  if (state.OptionsDialog) state.OptionsDialog = false
  state.searchDialog = true
}
</script>

<style scoped lang="less">
.postViewer {
  height: 50vh;
}

.posts {
  height: 50vh;
}

header {
  height: 100vh;
  position: relative;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    height: 72px;
    z-index: 100;
    box-sizing: border-box;
    padding: 0 16px;
    border-radius: 0 0 30px 30px;
    border-bottom: solid 2px var(--foreground-color);
    border-left: solid 2px var(--foreground-color);
    border-right: solid 2px var(--foreground-color);
    background: linear-gradient(0.25turn, transparent, var(--foreground-color) 25%),
      var(--triangle-background);
    backdrop-filter: var(--blur-val);
    box-shadow: 0px 0px 8px rgb(var(--blue-shadow-color), 0.8);
  }

  .logo {
    img {
      height: 36px;
      width: auto;
      filter: drop-shadow(0 0 8px #328cfa);
      user-select: none;
    }

    z-index: -2;
  }

  .menu {
    z-index: 200;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    ul {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin: 0;

      li {
        margin: 0 50px;

        a {
          display: block;
          padding: 10px 16px 10px 16px;
          border-radius: 8px;
          font-size: 20px;
          font-weight: 600;
          color: var(--font-color-grey);
          transition: all 0.5s;
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);

          &:hover {
            color: var(--font-color-gold);
            background-color: var(--btn-background);
            transform: translateY(-2px);
          }
        }
      }
    }
  }

  .grid {
    input {
      display: none;
    }
  }

  .grid-button {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas:
      "cell1 cell2 cell3"
      "cell4 cell5 cell6"
      "cell7 cell8 ."; // 右下角留空
    gap: 2px;
    width: 24px;
    height: 24px;
    padding: 3px;
    cursor: pointer;
    margin-right: 10px;
    border-radius: 4px;
    transition: all 0.3s ease;
    transform-origin: center;

    &.clicking {

      // 使用LESS循环生成延迟动画
      .generate-delays(@n) when (@n > 0) {
        .grid-cell:nth-child(@{n}) {
          animation: cellPop 0.3s ease-out (@n * 0.03s);
        }

        .generate-delays(@n - 1);
      }

      .generate-delays(8);
    }

    .grid-cell {
      width: 6px;
      height: 6px;
      background-color: var(--font-color-grey);
      border-radius: 1px;
      transition: background-color 0.3s ease;
      transform: scale(0.8);
    }
  }

  @keyframes cellPop {
    50% {
      transform: scale(1.2);
    }
  }

  .search {
    cursor: pointer;
    font-size: 25px;
    color: var(--font-color-grey);
    width: 25px; // 添加固定宽度
    text-align: center; // 居中对齐

  }

  .nav-controls {
    margin-left: auto; // 将控制区域推到最右边
    display: flex;
    align-items: center;
    gap: 16px;
  }

  // 搜索按钮动画
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.3s ease;
  }

  .fade-slide-enter-from,
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-5px);
  }
}

@media (max-width: 768px) {
  header {
    nav {
      height: 58px;
    }

    .logo {
      img {
        height: 26px;
      }
    }

    .menu {
      ul {
        li {
          margin: 0 10px;

          a {
            font-size: 16px;
            &:hover {
              transform: none;
            }
          }
        }
      }
    }

    .grid-button {
      width: 20px;
      height: 20px;
      gap: 1px;

      .grid-cell {
        width: 5px;
        height: 5px;
      }
    }

    .nav-controls {
      gap: 12px;
      padding: 6px;

      .search {
        font-size: 20px;
      }
    }
  }
}
</style>
