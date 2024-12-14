<template>
  <Splash></Splash>
  <template v-if="!page.isNotFound">
    <main>
      <Navbar></Navbar>
      <Banner>
        <!-- <template v-if="state.Animation"> -->
        <!-- <transition name="fade" mode="out-in"> -->
        <WelcomeBox v-if="!state.splashLoading && page.filePath === 'index.md'"></WelcomeBox>
        <PostInnerBanner v-else-if="page.filePath !== 'posts/index.md'"></PostInnerBanner>
        <!-- </transition> -->
        <!-- </template> -->
        <!-- <template v-else> -->
        <!-- <WelcomeBox v-if="!state.splashLoading && page.filePath === 'index.md'"></WelcomeBox> -->
        <!-- <PostInnerBanner v-else-if="page.filePath !== 'posts/index.md'"></PostInnerBanner> -->
        <!-- </template> -->

      </Banner>

      <!-- <template v-if="state.Animation"> -->
      <!-- <transition name="post-list-fade" appear> -->
      <!-- <PostsList v-show="page.filePath === 'posts/index.md'"></PostsList> -->
      <!-- </transition> -->
      <!-- </template> -->
      <!-- <template v-else> -->
      <PostsList v-show="page.filePath === 'posts/index.md'"></PostsList>
      <!-- </template> -->
      <ShowcaseList v-show="page.filePath === 'index.md'"></ShowcaseList>
      <!-- <Tags v-else-if="page.filePath === 'posts/index.md'"></Tags> -->
      <PostViewer v-if="page.filePath !== 'index.md' && page.filePath !== 'posts/index.md'"></PostViewer>
    </main>
    <!-- <Footer></Footer> -->
    <Fireworks v-if="state.fireworksEnabled"></Fireworks>
    <SpinePlayer v-show="state.SpinePlayerEnabled"></SpinePlayer>
    <ToTop v-if="state.toTopEnabled"></ToTop>
    <audio id="background-music" loop>
      <source src="./assets/banner/bgm.mp3" type="audio/mpeg" />
    </audio>
  </template>
  <NotFound v-else></NotFound>
</template>

<script setup lang="ts">
// 组件导入
import Splash from './components/Splash.vue'
import Navbar from './components/Navbar/index.vue'
import Banner from './components/Banner.vue'
import WelcomeBox from './components/Welcome-Box.vue'
import PostsList from './components/Posts-List.vue'
import Tags from './components/Tags.vue'
import PostViewer from './components/Post-Viewer.vue'
import PostInnerBanner from './components/Post-InnerBanner.vue'
import NotFound from './components/NotFound.vue'
import ToTop from './components/ToTop.vue'
import Fireworks from './components/Fireworks.vue'
import Footer from './components/Footer.vue'
import ShowcaseList from './components/Showcase-List/index.vue'
// @ts-ignore
import SpinePlayer from './components/Spine-Player/index.vue'
// 路径切换
import { useData } from 'vitepress'
const { page } = useData()

import { useStore } from './store'
const { state } = useStore()

let lastScroll = 0;
let touchStartY = 0;
// 滚动监听
document.addEventListener('scroll', (e) => {
  console.log(window.location.pathname);
  const currentScroll = window.scrollY;
  if (window.location.pathname === '/') {
    if (currentScroll < window.innerHeight && currentScroll < lastScroll) {
      e.preventDefault(); // 禁用默认滚动行为
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      })
    }
    else if (currentScroll >= 0 && currentScroll < window.innerHeight && currentScroll > lastScroll) {
      e.preventDefault(); // 禁用默认滚动行为
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      })
    }
    lastScroll = currentScroll;
  }
});

// 触摸事件监听
document.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
  const touchY = e.touches[0].clientY;
  const currentScroll = window.scrollY;
  if (window.location.pathname === '/') {
    if (currentScroll < window.innerHeight) {
      e.preventDefault(); // 禁用默认滚动行为
      if (touchStartY - touchY > 60) { // 向上滑动
        window.scrollTo({
          top: window.innerHeight + 25,
          behavior: 'smooth'
        });
      } else if (touchY - touchStartY > 70) { // 向下滑动
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  }
}, { passive: false });
</script>

<style lang="less">
// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.5s;
// }

// .fade-enter-from,
// .fade-leave-to {
//   opacity: 0;
// }

// .post-list-fade-enter-active {
//   transition: opacity 0.5s;
// }

// .post-list-fade-enter-from {
//   opacity: 0;
// }

html {
  scroll-behavior: smooth;
}

.container {
  width: 70vw;
  margin: 0 auto;
}

body {
  background-image: url('./assets/background.svg');
  background-color: var(--general-background-color);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
  color: var(--font-color-grey);
  font-family: 'Blueaka', sans-serif;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: var(--color-blue);
  cursor: pointer;
}

@media (max-width: 768px) {
  .container {
    width: 100vw;
  }
}
</style>
