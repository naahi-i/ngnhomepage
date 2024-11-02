<template>
    <div class="mainbox" ref="mainbox">
        <div class="item" :class="{ 'reverse': isReversed }">
            <div class="imgbox" :class="{ 'reverse-shadow': isReversed }">
                <img :src="imageSrc" :height="imgHeight" draggable="false" loading="lazy">
            </div>
            <div class="textbox">
                <h1 class="title">{{ title }}</h1>
                <hr>
                <p class="subtitle">{{ subtitle1 }}</p>
                <p class="subtitle">{{ subtitle2 }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps<{
    imageSrc: string;
    title: string;
    subtitle1: string;
    subtitle2: string;
    isReversed?: boolean; // 用于判断布局方向
    imgHeight: string;
}>();
const mainbox = ref<HTMLElement | null>(null);
</script>

<style scoped lang="less">
.mainbox {
    margin: 20px auto; /* 上下 margin 设置为 20px，左右 margin 自动 */
    width: 1200px;
    height: 330px; 
    overflow: hidden; /* 防止内容超出容器 */
    transform: skew(-5deg); /* 设置倾斜角度 */
    border-radius: 30px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(var(--blue-shadow-color), 0.5); /* 调整阴影样式 */

    .item {
        display: flex; /* 使用 Flexbox 使内容水平排列 */
        align-items: stretch; /* 确保图片和文本框的高度一致 */
        height: 100%; /* 确保 item 的高度与 mainbox 一致 */
        justify-content: space-between; /* 确保图片和文本框分布在两端 */
        
        &.reverse {
            flex-direction: row-reverse; /* 反转布局 */
            .imgbox {
                img {
                    margin-left: -3%; /* 向左移动图片，增加负值以实现向左修正 */
                }
            }
        }

        .imgbox {
            overflow: hidden; /* 防止图片超出容器 */
            width: 60%; /* 设置图片容器宽度 */
            height: 100%; /* 设置图片容器高度与 mainbox 一致 */
            margin-left: -20px; /* 向左移动容器 */
            box-shadow: 5px 0 10px rgba(var(--blue-shadow-color), 0.5); /* 默认阴影样式 */
            transition: all 0.5s ease; /* 设置缩放动画过渡 */

            img {
                width: 106%; /* 确保图片宽度填满容器 */
                object-fit: cover; /* 保持图片的宽高比 */
                transform: skew(5deg); /* 设置倾斜角度 */
            }
            
            &:hover {
                width: 70%;
            }
        }

        .reverse-shadow { /* 反转阴影样式 */
            box-shadow: -5px 0 10px rgba(var(--blue-shadow-color), 0.5); /* 调整阴影方向 */
        }

        .textbox {
            padding: 10px; 
            color: var(--font-color-grey); /* 文本颜色 */
            width: 50%; /* 固定文本框宽度 */
            display: flex; /* 让文本框内部内容也使用 flexbox */
            flex-direction: column; /* 使内容纵向排列 */
            justify-content: center; /* 垂直居中对齐 */
            align-items: center; /* 水平居中 */

            .title {
                font-size: 48px; /* 设置标题字体大小 */
                font-weight: bold; /* 加粗标题 */
                margin: 0; /* 去掉默认边距 */
            }

            .subtitle {
                font-size: 20px; /* 设置副标题字体大小 */
                margin: 5px 0; /* 设置上下边距 */
            }
        }
    }
}
@media (max-width: 768px) {
    .mainbox {
        height: 250px;
        width: 95%;
        .item {
            .textbox {
                .title {
                    font-size: 25px; /* 缩小标题字体 */
                }
                .subtitle {
                    font-size: 15px; /* 缩小副标题字体 */
                }
            }
        }
    }
}
</style>
