<template>
  <div
    class="banner"
    :class="{
      postViewer: state.currPost.href,
      posts: page.filePath === 'posts/index.md',
      loadingComplete: !state.splashLoading,
    }"
  >
    <slot></slot>
    <!-- 提示箭头 -->
    <transition name="fade-slide">
      <span
        class="iconfont icon-downarrow downarrow"
        @click="move"
        v-if="!state.splashLoading && page.filePath === 'index.md'"
      ></span>
    </transition>
    <canvas id="wave"></canvas>
    <video v-if="videoBanner" autoplay muted loop class="bg-video">
      <source src="../assets/banner/banner_video.mp4" type="video/mp4" />
    </video>
    <div v-else class="bg-img"></div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { useStore } from '../store'
import { onMounted, ref } from 'vue'

const { page } = useData()
const themeConfig = useData().theme.value
const videoBanner = themeConfig.videoBanner
const { state } = useStore()

const currentWave = ref<SiriWave | null>(null)

class SiriWave {
  K = 1
  F = 15
  speed = 0.1
  noise = 30
  phase = 0
  devicePixelRatio = window.devicePixelRatio || 1
  width = this.devicePixelRatio * window.innerWidth
  height = this.devicePixelRatio * 100
  MAX = this.height / 2
  canvas = document.getElementById('wave') as HTMLCanvasElement
  ctx = this.canvas.getContext('2d')!
  run = false
  animationFrameID: number | null = null
  isMobile = /iPhone|Windows|iPad|iPod|Android/i.test(navigator.userAgent)

  constructor() {
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.canvas.style.width = `${this.width / this.devicePixelRatio}px`
    this.canvas.style.height = `${this.height / this.devicePixelRatio}px`
  }

  _globalAttenuationFn(x: number) {
    return Math.pow((this.K * 4) / (this.K * 4 + Math.pow(x, 4)), this.K * 2)
  }

  _drawLine(attenuation: number, color: string, width: number, noise: number, F: number) {
    this.ctx.moveTo(0, 0)
    this.ctx.beginPath()
    this.ctx.strokeStyle = color
    this.ctx.lineWidth = width || 1
    F = F || this.F
    noise = noise * this.MAX || this.noise
    
    // 移动端使用更简单的计算方式
    const step = this.isMobile ? 0.05 : 0.01
    if (this.isMobile) {
      for (let i = -this.K; i <= this.K; i += step) {
        const x = this.width * ((i + this.K) / (this.K * 2))
        // 简化的波形计算
        const y = this.height / 2 + noise * Math.sin(F * i - this.phase)
        this.ctx.lineTo(x, y)
      }
    } else {
      for (let i = -this.K; i <= this.K; i += step) {
        const x = this.width * ((i + this.K) / (this.K * 2))
        const y = this.height / 2 + noise * Math.pow(Math.sin(i * 10 * attenuation), 1) * Math.sin(F * i - this.phase)
        this.ctx.lineTo(x, y)
      }
    }
    this.ctx.lineTo(this.width, this.height)
    this.ctx.lineTo(0, this.height)
    this.ctx.fillStyle = color
    this.ctx.fill()
  }

  _clear() {
    this.ctx.globalCompositeOperation = 'destination-out'
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.ctx.globalCompositeOperation = 'source-over'
  }

  _draw() {
    if (!this.run) return
    this.phase = (this.phase + this.speed) % (Math.PI * 64)
    this._clear()
    
    // 获取计算后的 CSS 变量值
    const wave1Color = getComputedStyle(document.documentElement).getPropertyValue('--wave-color1').trim()
    const wave2Color = getComputedStyle(document.documentElement).getPropertyValue('--wave-color2').trim()
    
    if (this.isMobile) {
      // 移动端只绘制一层波浪
      this._drawLine(0.5, wave1Color, 1, 0.3, 6)
    } else {
      this._drawLine(0.5, wave1Color, 1, 0.35, 6)
      this._drawLine(1, wave2Color, 1, 0.25, 6)
    }
    
    // 移动端降低刷新率
    const frameDelay = this.isMobile ? 32 : 16  // 移动端约30fps，桌面端约60fps
    setTimeout(() => {
      this.animationFrameID = requestAnimationFrame(this._draw.bind(this))
    }, frameDelay)
  }

  start() {
    this.phase = 0
    this.run = true
    this._draw()
  }

  stop() {
    this.run = false
    this._clear()
    if (this.animationFrameID !== null) {
      cancelAnimationFrame(this.animationFrameID)
      this.animationFrameID = null
    }
  }

  setNoise(v: number) {
    this.noise = Math.min(v, 1) * this.MAX
  }

  setSpeed(v: number) {
    this.speed = v
  }

  set(noise: number, speed: number) {
    this.setNoise(noise)
    this.setSpeed(speed)
  }
}

const initWave = () => {
  if (currentWave.value) currentWave.value.stop()
  currentWave.value = new SiriWave()
  currentWave.value.setSpeed(0.01)
  currentWave.value.start()
}

const debounce = (func: () => void, wait: number) => {
  let timeout: number | undefined
  return () => {
    clearTimeout(timeout)
    timeout = window.setTimeout(func, wait)
  }
}

onMounted(() => {
  initWave()
  window.addEventListener(
    'resize',
    debounce(() => {
      initWave()
    }, 200), // 增加等待时间，减少 resize 事件的触发频率
  )
})

// 下滑箭头
const move = () => {
  window.scrollTo({ top: window.innerHeight + 25, behavior: 'smooth' })
}

</script>

<style scoped lang="less">
.banner {
  transform: translateZ(0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  mask: linear-gradient(to top, transparent, var(--general-background-color) 5%);
  perspective: 1000px;
  overflow: hidden;
  -webkit-user-drag: none;
  transition: height 0.8s;
  will-change: height;

  .downarrow {
    position: absolute;
    bottom: 10vh;
    cursor: pointer;
    z-index: 100;
    font-size: 60px;
    color: var(--downarrow-color);
    text-shadow: 1px 0.8px 4px rgba(var(--blue-shadow-color), 1), 0 0 2px rgba(40, 135, 200, 0.2);
  }

  &.loadingComplete {
    animation: fade-blur-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .bg-img,
  .bg-video {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    filter: var(--img-brightness); /* 添加亮度过滤器 */
    transition: filter 0.5s; /* 添加过渡效果 */
  }

  .bg-img {
    background-image: url(../assets/banner/banner.jpg);
    html[theme="dark"] & {
      background-image: url(../assets/banner/banner_dark.jpg), url(../assets/banner/banner.jpg);
    }
    transition: background-image 0.5s; /* 添加过渡效果 */
  }
}

.postViewer {
  height: 50vh;
}

.posts {
  height: 135vh;
}

#wave {
  position: absolute;
  bottom: 0;
  z-index: 50;
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: transform 1s;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

@media (max-width: 768px) {
  .banner{
    .downarrow {
      font-size: 50px;
    }
  }
  .posts {
    height: 140%;
  }
}
</style>
