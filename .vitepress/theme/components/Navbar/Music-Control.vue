<template>
  <div class="music-control-container" 
    @wheel.prevent="handleWheel"
    @touchstart="handleTouchStart"
    @touchmove.prevent="handleTouchMove"
    @touchend="handleTouchEnd">
    <div class="volume-ring-wrapper" :class="{ 'show-on-mobile': isPlaying }">
      <div class="volume-ring" :style="{ background: volumeBackground }"></div>
      <div class="volume-ring-mask"></div>
    </div>
    <span class="music-control" @click="toggleMusic">
      <i :class="isPlaying ? 'iconfont icon-continue continue' : 'iconfont icon-stop stop'"></i>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'

const VOLUME_STORAGE_KEY = 'bgm-volume'

const isPlaying = ref(false)
const music = ref<HTMLAudioElement | null>(null)
// 从localStorage读取存储的音量，如果没有则使用默认值35
const volume = ref(Number(localStorage.getItem(VOLUME_STORAGE_KEY)) || 35)
const isVolumeVisible = ref(false)

// 触摸相关状态
const touchStartY = ref(0)
const isTouching = ref(false)

// 处理触摸事件
const handleTouchStart = (e: TouchEvent) => {
  touchStartY.value = e.touches[0].clientY
  isTouching.value = true
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isTouching.value) return
  
  const deltaY = touchStartY.value - e.touches[0].clientY
  const step = Math.floor(deltaY / 2)
  
  volume.value = Math.max(0, Math.min(100, volume.value + step))
  handleVolumeChange()
  
  touchStartY.value = e.touches[0].clientY
}

const handleTouchEnd = () => {
  isTouching.value = false
}

const toggleMusic = () => {
  if (music.value) {
    if (isPlaying.value) {
      music.value.pause()
    } else {
      music.value.play().catch((err) => console.log('播放失败: ', err))
    }
    isPlaying.value = !isPlaying.value
  }
}

const handleVolumeChange = () => {
  if (music.value) {
    music.value.volume = Number(volume.value) / 100
    // 保存音量设置到localStorage
    localStorage.setItem(VOLUME_STORAGE_KEY, volume.value.toString())
  }
}

const volumeBackground = computed(() => {
  const degree = (volume.value / 100) * 360
  return `conic-gradient(
    var(--color-blue) 0deg ${degree}deg,
    rgba(128, 128, 128, 0.1) ${degree}deg 360deg
  )`
})

const handleWheel = (e: WheelEvent) => {
  const delta = e.deltaY > 0 ? -5 : 5
  volume.value = Math.max(0, Math.min(100, volume.value + delta))
  handleVolumeChange()
}

onMounted(() => {
  music.value = document.getElementById('background-music') as HTMLAudioElement
  if (music.value) {
    // 使用保存的音量初始化
    music.value.volume = volume.value / 100
    music.value.pause()
  }
})

watch(volume, (newVolume) => {
  localStorage.setItem(VOLUME_STORAGE_KEY, newVolume.toString())
})
</script>
<style scoped lang="less">
.music-control-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  
  &:hover {
    .volume-ring-wrapper {
      opacity: 1;
      transform: scale(1.05);
    }
  }
}

.volume-ring-wrapper {
  position: absolute;
  top: -6px;
  left: -6px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 0;

  &.show-on-mobile {
    @media (max-width: 768px) {
      opacity: 1;
      transform: scale(1);
    }
  }
}

.volume-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  mask: radial-gradient(transparent 62%, black 64%);
  -webkit-mask: radial-gradient(transparent 62%, black 64%);
}

.volume-ring-mask {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--search-dialog-bg);
  transform: scale(0.82);
}

.music-control {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--search-dialog-bg);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.iconfont {
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--font-color-grey);
  cursor: pointer;
  transition: color 0.3s ease;
}

@media (max-width: 768px) {
  .music-control-container {
    width: 36px;
    height: 36px;
  }

  .volume-ring-wrapper {
    top: -5px;
    left: -5px;
    width: 46px;
    height: 46px;
    transform: scale(0.95);
  }

  .iconfont {
    font-size: 20px;
  }
}
</style>
