<template>
    <div class="loading-overlay">
    <div class="loading-spinner"></div> <!-- 旋转加载图标 -->
    </div>
</template>

<script setup lang="ts">
  // 这个组件不需要特殊的逻辑，仅用于展示加载动画
</script>

<style lang="less">
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 9999;
}

.loading-spinner {
    border: 6px solid rgba(0, 0, 0, 0.1);
    border-top-color: #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
