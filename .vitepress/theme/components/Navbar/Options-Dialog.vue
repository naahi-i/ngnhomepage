<template>
  <Transition name="options-dialog">
    <div class="options-dialog">
      <div class="options-dialog-cover" @click="closeDialog"></div>
      <div class="options-dialog-content">
        <button type="button" class="close-btn" @click="closeDialog">×</button>
        <span class="title">选项</span>
        <div class="button-content">
          <MusicControl></MusicControl>
        </div>
        <div class="menu-content">
          <ToggleSwitch></ToggleSwitch>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useStore } from '../../store'
import MusicControl from './Music-Control.vue'
import ToggleSwitch from './ToggleSwitch.vue'
const { state } = useStore()

const closeDialog = (): void => {
  state.OptionsDialog = false
}
</script>

<style scoped lang="less">
.options-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 201;
  display: flex;
  justify-content: center;
  align-items: center;
}

.options-dialog-cover {
  background: rgba(0, 0, 0, 0.614);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.options-dialog-content {
  position: relative;
  width: 90%;
  max-width: 460px;
  background-color: var(--search-dialog-bg);
  border-radius: 20px;
  padding: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.options-dialog-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  border-bottom: 3px solid var(--search-dialog-border);
  background-color: var(--search-dialog-header-bg);
  background-image: var(--deco2);
  background-repeat: no-repeat;
  background-position: left;
  background-size: contain;
}

.title {
  font-weight: bold;
  font-size: 25px;
  padding: 0 0 5px;
  border-bottom: 5px solid var(--font-color-gold);
  z-index: 100;
  color: var(--font-color-grey);
}

.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  width: 56px;
  height: 56px;
  font-size: 36px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--font-color-grey);
}

.menu-content,
.button-content {
  width: calc(100% - 40px);
  margin: 20px;
  padding: 20px;
  background-color: var(--search-input-bg);
  border-radius: 16px;
}

.button-content {
  margin-bottom: -5px;
}

// 动画相关
.options-dialog-enter-active,
.options-dialog-leave-active {
  transition: opacity 0.3s ease;
  
  .options-dialog-cover {
    transition: opacity 0.3s ease;
  }
  
  .options-dialog-content {
    transform: scale(1);

    transition: all 0.3s ease;
  }
}

.options-dialog-enter-from,
.options-dialog-leave-to {
  opacity: 0;

  .options-dialog-cover {
    opacity: 0;
  }

  .options-dialog-content {
    transform: scale(0.95);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .options-dialog .options-dialog-content {
    width: 85%;
    top: 5%;
  }
}
</style>
