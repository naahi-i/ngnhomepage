<template>
  <div
    class="banner"
    :class="{
      postViewer: state.currPost.href,
      posts: page.filePath === 'posts/index.md',
      loadingComplete: !state.splashLoading,
      blurred: page.filePath === 'posts/index.md'
    }"
  >
    <slot></slot>
    <transition name="fade-slide">
      <span
        class="iconfont icon-downarrow downarrow"
        @click="move"
        v-if="!state.splashLoading && page.filePath === 'index.md'"
      ></span>
    </transition>
    <canvas id="wave"></canvas>
    <video autoplay muted loop class="bg-video" v-if="videoBanner">
      <source src="../assets/banner/banner_video.mp4" type="video/mp4" />
    </video>
    <div v-else class="bg-img"></div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { useStore } from '../store'
import { onMounted } from 'vue'

const { page } = useData()
const themeConfig = useData().theme.value
const videoBanner = themeConfig.videoBanner
const { state } = useStore()

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
    for (let i = -this.K; i <= this.K; i += 0.01) {
      const x = this.width * ((i + this.K) / (this.K * 2))
      const y = this.height / 2 + noise * Math.pow(Math.sin(i * 10 * attenuation), 1) * Math.sin(F * i - this.phase)
      this.ctx.lineTo(x, y)
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
    this._drawLine(0.5, 'rgba(234, 239, 245, 0.8)', 1, 0.35, 6)
    this._drawLine(1, 'rgba(234, 239, 245, 0.5)', 1, 0.25, 6)
    this.animationFrameID = requestAnimationFrame(this._draw.bind(this))
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

let currentWave: SiriWave | null = null

const initAll = () => {
  if (currentWave) currentWave.stop()
  currentWave = new SiriWave()
  currentWave.setSpeed(0.01)
  currentWave.start()
}

const debounce = (func: () => void, wait: number) => {
  let timeout: number | undefined
  return () => {
    clearTimeout(timeout)
    timeout = window.setTimeout(func, wait)
  }
}

onMounted(() => {
  initAll()
  window.addEventListener(
    'resize',
    debounce(() => {
      if (currentWave) currentWave.stop()
      initAll()
    }, 100),
  )
})

const move = () => {
  window.scrollTo({ top: window.innerHeight - 75, behavior: 'smooth' })
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
  transition: height 0.8s cubic-bezier(.61,.15,.26,1);

  .downarrow {
    position: absolute;
    bottom: 90px;
    cursor: pointer;
    z-index: 100;
    animation: float-fade 2s ease-in-out infinite;
    font-size: 60px;
    color: #e9ebee;
    text-shadow: 1px 0.8px 4px rgba(var(--blue-shadow-color), 1), 0 0 2px rgba(40, 135, 200, 0.2);
  }

  &.loadingComplete {
    animation: fade-blur-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  &.blurred .bg-img,
  &.blurred .bg-video {
    filter: blur(25px);
    opacity: .85;
  }

  .bg-img,
  .bg-video {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    transition: filter 0.8s ease-in-out, opacity 0.8s ease-in-out;
  }

  .bg-img {
    background-image: url(../assets/banner/banner.jpg);
  }
}

@keyframes float-fade {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}

@keyframes fade-blur-in {
  from {
    filter: var(--blur-val);
    transform: scale(1.5);
  }
  to {
    filter: none;
    transform: scale(1);
  }
}

.postViewer {
  height: 50vh;
}

.posts {
  height: 160vh;
}

#wave {
  position: absolute;
  bottom: 0;
  z-index: 50;
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 1s, transform 1s;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

@media (max-width: 768px) {
  .banner{
    &.blurred .bg-img,
    &.blurred .bg-video {
      filter: blur(0px);
      opacity: 1;
    }
  }
}
</style>
