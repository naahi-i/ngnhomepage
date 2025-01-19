<template>
  <div class="toggle-container">
    <div v-for="(label, id) in toggles" 
         :key="id" 
         class="toggle-item">
      <span class="label">{{ label }}</span>
      <input type="checkbox" 
             :id="id" 
             :checked="state[id]" 
             @change="toggleSwitch(id)">
      <label :for="id" 
             class="toggleSwitch" 
             :class="{ 'cooling': id === 'darkMode' && isButtonCooling }">
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../../store'
import { onMounted, ref } from 'vue'
const { state } = useStore()

// 定义可切换的项
const toggles = {
    fireworksEnabled: '烟花',
    SpinePlayerEnabled: '阿罗娜',
    toTopEnabled: '回顶',
    darkMode: 'Dark'
}

// 页面加载时从 localStorage 读取状态并应用
onMounted(() => {
    Object.keys(toggles).forEach((key) => {
        const storedValue = localStorage.getItem(key);
        if (storedValue !== null) {
            state[key] = JSON.parse(storedValue);
        }
    });
    // 应用主题
    applyTheme(state.darkMode);
});

const isButtonCooling = ref(false);

const toggleSwitch = (key: string) => {
    if (key === 'darkMode' && isButtonCooling.value) {
        return;
    }

    const isChecked = state[key];
    state[key] = !isChecked;
    // 切换开关状态并保存到 localStorage
    localStorage.setItem(key, JSON.stringify(!isChecked));
    
    if (key === 'darkMode') {
        applyTheme(!isChecked);
        isButtonCooling.value = true;
        setTimeout(() => {
            isButtonCooling.value = false;
        }, 800); // 设置0.8秒冷却时间
    }
};

const applyTheme = (isDark: boolean) => {
  document.documentElement.setAttribute('theme', isDark ? 'dark' : 'light');
}
</script>

<style scoped lang="less">
.toggle-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.toggle-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: rgba(var(--blue-shadow-color), 0.05);
  border-radius: 12px;
  transition: all 0.3s;

  &:hover {
    background: rgba(var(--blue-shadow-color), 0.06);
  }

  .label {
    font-size: 15px;
    color: var(--font-color-grey);
    font-weight: 500;
  }
}

input[type="checkbox"] {
  display: none;
}

.toggleSwitch {
  position: relative;
  width: 46px;
  height: 24px;
  background: rgba(82, 82, 82, 0.3);
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.4s ease;

  &::after {
    content: "";
    position: absolute;
    left: 3px;
    top: 3px;
    width: 18px;
    height: 18px;
    background: var(--foreground-color);
    border-radius: 50%;
    transition: all 0.4s cubic-bezier(0.3, 1.5, 0.7, 1);
  }
}

input:checked + .toggleSwitch {
  background: rgb(66, 92, 139);
  
  &::after {
    transform: translateX(22px);
  }
}

.cooling {
  opacity: 0.5;
  pointer-events: none;
}
</style>
