<template>
  <Splash></Splash>
  <template v-if="!page.isNotFound">
    <main>
      <Navbar></Navbar>
      <Banner>

        <template v-if="state.Animation">
          <transition name="fade" mode="out-in">
            <WelcomeBox v-if="!state.splashLoading && page.filePath === 'index.md'"></WelcomeBox>
            <PostInnerBanner v-else-if="page.filePath !== 'posts/index.md'"></PostInnerBanner>
          </transition>
        </template>
        <template v-else>
          <WelcomeBox v-if="!state.splashLoading && page.filePath === 'index.md'"></WelcomeBox>
          <PostInnerBanner v-else-if="page.filePath !== 'posts/index.md'"></PostInnerBanner>
        </template>

      </Banner>

      <template v-if="state.Animation">
        <transition name="post-list-fade" appear>
          <PostsList v-show="page.filePath === 'posts/index.md'"></PostsList>
        </transition>
      </template>
      <template v-else>
        <PostsList v-show="page.filePath === 'posts/index.md'"></PostsList>
      </template>

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
</script>

<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.post-list-fade-enter-active {
  transition: opacity 0.5s;
}

.post-list-fade-enter-from {
  opacity: 0;
}

html {
  scroll-behavior: smooth;
}

.container {
  max-width: 1200px;
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
</style>
