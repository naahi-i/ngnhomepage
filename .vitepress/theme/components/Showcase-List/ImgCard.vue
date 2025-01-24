<template>
    <div class="ImgCard">
        <img :class="{ 'dark-mode': computedDarkMode }" src="../img/SCHALE.png" alt="S.H.C.A.L.E" draggable="false" loading="lazy" />
        <div v-show="computedDarkMode" class="gradient-overlay"></div>
        <div class="reflection"></div>
        <div class="reflection-secondary"></div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../../store'
const { state } = useStore()

const computedDarkMode = computed(() => {
    if (state.darkMode === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return state.darkMode === 'dark'
})
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
    margin: auto;
    position: relative;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s;
    &:hover {
        transform: scale(1.01);
        box-shadow: 
        0 4px 18px rgba(var(--blue-shadow-color), 0.3);
        
        .reflection {
            left: 100%;
        }
        .reflection-secondary {
            left: 85%;
        }
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

    .reflection, .reflection-secondary {
        position: absolute;
        top: -50%;
        left: -40%;
        height: 200%;
        pointer-events: none;
        transition: left 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .reflection {
        width: 100px;
        background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.12) 20%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.12) 80%,
            rgba(255, 255, 255, 0) 100%
        );
        transform: rotate(25deg);
        filter: blur(5px);
        mix-blend-mode: soft-light;
    }

    .reflection-secondary {
        width: 150px;
        background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.08) 40%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.08) 60%,
            rgba(255, 255, 255, 0) 100%
        );
        transform: rotate(25deg);
        filter: blur(8px);
        mix-blend-mode: overlay;
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
