<template>
    <div class="ImgCard">
        <img :class="{ 'dark-mode': isDarkMode }" src="../img/SCHALE.png" alt="S.H.C.A.L.E" draggable="false" loading="lazy" />
        <div v-show="isDarkMode" class="gradient-overlay"></div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../../store'
const { state } = useStore()
// 从store获取暗色模式状态
const isDarkMode = computed(() => state.darkMode)
</script>

<style scoped lang="less">
.ImgCard {
    width: calc(65vw * 0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: var(--foreground-color);
    border-radius: 24px;
    box-shadow: 0 4px 8px rgba(var(--blue-shadow-color), 0.3); /* 调整阴影样式 */
    margin: 50px auto;
    position: relative;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s;
    &:hover {
            transform: scale(1.01);
            box-shadow: 
            0 4px 18px rgba(var(--blue-shadow-color), 0.3),
        }

    img {
        width: 100%;
        height: auto;
        object-fit: contain; // contain 以保持图片比例
        user-select: none;
        filter: var(--img-brightness); /* 添加亮度过滤器 */
        transition: filter 0.5s; /* 添加过渡效果 */
    }

    .gradient-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            rgba(176, 128, 211, 0.6),
            rgba(31, 11, 45, 0.4)
        );
        pointer-events: none;
        mix-blend-mode: multiply;
        opacity: 0;
        
        &:not([v-show="false"]) {
            opacity: 1;
        }
    }
}

@media (max-width: 768px) {
    .ImgCard {
        width: 90vw;
        margin: 10px auto 20px;
        img {
            &:hover {
                transform: none;
            }
        }
    }
}
</style>
