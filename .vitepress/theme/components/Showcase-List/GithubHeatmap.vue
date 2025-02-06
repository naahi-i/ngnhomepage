<template>
  <div class="github-heatmap" ref="heatmapRef">
    <div class="switch-btn" @click="toggleView" v-show="isVisible">
      <span>⇆</span>
    </div>
    <div v-if="isVisible">
      <Transition name="fade" mode="out-in">
        <img v-if="isCalendarView" key="calendar"
          src="https://raw.githubusercontent.com/naahi-i/naahi-i/main/metrics.plugin.isocalendar.svg"
          alt="Metrics ISO Calendar" />
        <img v-else key="graph"
          src="https://github-readme-activity-graph.vercel.app/graph?username=naahi-i&theme=github-compact&hide_border=true&radius=16"
          alt="Activity Graph" />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const heatmapRef = ref<HTMLElement | null>(null)
const isCalendarView = ref(false)
const isVisible = ref(false)

const toggleView = () => {
  isCalendarView.value = !isCalendarView.value
}

let observer: IntersectionObserver

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.1 }
  )

  if (heatmapRef.value) {
    observer.observe(heatmapRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped lang="less">
.github-heatmap {
  width: calc(65vw * 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  box-shadow: 0 0px 8px rgba(var(--blue-shadow-color), 0.20);
  margin: auto;
  background-color: var(--foreground-color);
  position: relative;

  img {
    height: 300px;
    width: 100%;
    object-fit: contain;
    margin: 30px 0;
    }

    .switch-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(var(--blue-shadow-color), 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    z-index: 1;

    span {
      font-size: 15px;
      color: var(--font-color-grey);
      font-weight: bold;
      opacity: 0.5;
    }

    &:hover {
      background: rgba(var(--blue-shadow-color), 0.2);
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .github-heatmap {
    width: 90vw;

    img {
      margin: 15px;
      height: 110px;
      max-width: calc(90vw - 30px);
    }

    .switch-btn {
      width: 22px;
      height: 22px;
      top: 12px;
      right: 12px;

      span {
        font-size: 10px;
      }

      &:hover {
        background: rgba(var(--blue-shadow-color), 0.08);
      }
    }
  }

}
</style>