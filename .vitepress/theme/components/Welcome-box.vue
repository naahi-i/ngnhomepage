<template>
  <div
    class="welcome-box"
    ref="welcomeBoxRef"
    @mousemove="parallax"
    @mouseleave="reset"
    :style="{ transform: `rotateY(${calcY}deg) rotateX(${calcX}deg)` }"
  >
    <span class="welcome-text">{{ welcomeText }}</span>
    <div
      class="info-box"
      :style="{
        background: `linear-gradient(${angle}deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.5))`,
      }"
    >
      <img src="../assets/banner/avatar.jpg" alt="" class="avatar" />
      <span class="name">{{ name }}</span>
      <span class="motto">{{ mottoText }}<span class="pointer"></span></span>
      <ul>
        <li v-for="item in social" :key="item.url">
          <a :href="item.url"><i :class="`iconfont icon-${item.icon} social`"></i></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { ref, onMounted } from 'vue'

const themeConfig = useData().theme.value
const name = themeConfig.name
const welcomeText = themeConfig.welcomeText
const mottoArray = themeConfig.motto as string[]
const social = themeConfig.social

const multiple = 30
const welcomeBoxRef = ref<HTMLElement | null>(null)
const calcY = ref(0)
const calcX = ref(0)
const angle = ref(0)
const mottoText = ref('')

const parallax = (e: MouseEvent) => {
  if (welcomeBoxRef.value) {
    window.requestAnimationFrame(() => {
      let box = welcomeBoxRef.value!.getBoundingClientRect()
      calcY.value = (e.clientX - box.x - box.width / 2) / multiple
      calcX.value = -(e.clientY - box.y - box.height / 2) / multiple
      angle.value = Math.floor(
        getMouseAngle(e.clientY - box.y - box.height / 2, e.clientX - box.x - box.width / 2),
      )
    })
  }
}

function getMouseAngle(x: number, y: number) {
  const radians = Math.atan2(y, x)
  let angle = radians * (180 / Math.PI)
  if (angle < 0) {
    angle += 360
  }
  return angle
}

const reset = () => {
  calcX.value = calcY.value = angle.value = 0
}

function getRandomMotto() {
  const randomIndex = Math.floor(Math.random() * mottoArray.length)
  return mottoArray[randomIndex]
}

let index = 0
function addNextCharacter() {
  if (index < getRandomMotto().length) {
    mottoText.value += getRandomMotto()[index]
    index++
    setTimeout(addNextCharacter, Math.random() * 150 + 30)
  }
}

onMounted(() => {
  mottoText.value = getRandomMotto() // Set initial motto
  addNextCharacter()
})
</script>

<style scoped lang="less">
/* 保持原有样式 */
</style>