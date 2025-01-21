<template>
  <div class="toggle-container">
    <div class="theme-select">
      <span class="label">主题</span>
      <div class="select-wrapper">
        <select v-model="selectedTheme" @change="changeTheme">
          <option value="light">浅色</option>
          <option value="dark">深色</option>
          <option value="system">跟随系统</option>
        </select>
        <span class="select-arrow">▼</span>
      </div>
    </div>
    <div v-for="(label, id) in toggles" 
         :key="id" 
         class="toggle-item">
      <span class="label">{{ label }}</span>
      <input type="checkbox" 
             :id="id" 
             :checked="state[id]" 
             @change="toggleSwitch(id)">
      <label :for="id" class="toggleSwitch"></label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../../store'
import { onMounted, ref } from 'vue'
const { state } = useStore()

const selectedTheme = ref('system')

// 定义可切换的项(移除darkMode)
const toggles = {
    fireworksEnabled: '烟花',
    SpinePlayerEnabled: '阿罗娜',
    toTopEnabled: '回顶'
}

// 页面加载时从 localStorage 读取状态
onMounted(() => {
    // 读取主题设置,如果没有存储值则默认使用system
    const storedTheme = localStorage.getItem('darkMode') || 'system';
    selectedTheme.value = storedTheme;
    applyTheme(storedTheme);

    // 监听系统主题变化
    if (selectedTheme.value === 'system') {
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', e => {
                document.documentElement.setAttribute('theme', e.matches ? 'dark' : 'light')
                state.darkMode = e.matches ? 'dark' : 'light'
            })
    }

    // 读取其他开关状态
    Object.keys(toggles).forEach((key) => {
        const storedValue = localStorage.getItem(key);
        if (storedValue !== null) {
            state[key] = JSON.parse(storedValue);
        }
    });
});

const changeTheme = () => {
    state.darkMode = selectedTheme.value;
    localStorage.setItem('darkMode', selectedTheme.value);
    applyTheme(selectedTheme.value);
};

const toggleSwitch = (key: string) => {
    const isChecked = state[key];
    state[key] = !isChecked;
    localStorage.setItem(key, JSON.stringify(!isChecked));
};

const applyTheme = (theme: string) => {
    let effectiveTheme = theme
    if (theme === 'system') {
        effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    document.documentElement.setAttribute('theme', effectiveTheme)
    state.darkMode = effectiveTheme as 'light' | 'dark' | 'system'
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

.theme-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: rgba(var(--blue-shadow-color), 0.05);
  border-radius: 12px;

  .select-wrapper {
    position: relative;
    width: 120px;
    
    .select-arrow {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--font-color-grey);
      font-size: 12px;
      pointer-events: none;
      opacity: 0.6;
    }
  }

  select {
    width: 100%;
    padding: 6px 28px 6px 10px;
    font-size: 14px;
    border-radius: 10px;
    border: 1px solid rgba(var(--blue-shadow-color), 0.15);
    background: var(--foreground-color);
    color: var(--font-color-grey);
    cursor: pointer;
    appearance: none;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: rgba(var(--blue-shadow-color), 0.3);
      background: rgba(var(--blue-shadow-color), 0.03);
    }
    
    &:focus {
      outline: none;
      border-color: rgba(var(--blue-shadow-color), 0.4);
      box-shadow: 0 0 0 2px rgba(var(--blue-shadow-color), 0.1);
    }

    option {
      padding: 8px;
      background: var(--foreground-color);
      
      &:hover {
        background: rgba(var(--blue-shadow-color), 0.1);
      }
    }
  }
}
</style>
