<template>
    <div class="mainbox" ref="mainbox">
        <div class="item" :class="{ 'reverse': isReversed }">
            <div class="imgbox" :class="{ 'reverse': isReversed }">
                <img :src="imageSrc" :style="{ marginLeft: imgOffsetX }" :height="imgHeight" draggable="false">
            </div>
            <div class="textbox">
                <h1 class="title">{{ title }}</h1>
                <hr>
                <!-- <p class="subtitle">{{ subtitle1 }}</p> -->
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
    // subtitle1: string;
    subtitle2: string;
    isReversed?: boolean; // 用于判断布局方向
    imgHeight: string;
    imgOffsetX: string; // 新增，控制图片的水平偏移量
}>();
const mainbox = ref<HTMLElement | null>(null);
</script>

<style scoped lang="less">
.mainbox{
    transition: all 0.8s ; /* 添加过渡效果 */
}
.mainbox {
    margin: 20px auto; /* 上下 margin 设置为 20px，左右 margin 自动 */
    height: 410px; 
    width: 95%;
    overflow: hidden; /* 防止内容超出容器 */
    border-radius: 24px;
    box-shadow: 0 0px 8px rgba(var(--blue-shadow-color), 0.4); /* 调整阴影样式 */

    .item {
        display: flex; /* 使用 Flexbox 使内容水平排列 */
        align-items: stretch; /* 确保图片和文本框的高度一致 */
        height: 100%; /* 确保 item 的高度与 mainbox 一致 */
        justify-content: space-between; /* 确保图片和文本框分布在两端 */
        
        &.reverse {
            flex-direction: row-reverse; /* 反转布局 */
        }

        .imgbox {
            overflow: hidden; /* 防止图片超出容器 */
            width: 60%; /* 设置图片容器宽度 */
            height: 100%; /* 设置图片容器高度与 mainbox 一致 */
            margin-left: -20px; /* 向左移动容器 */
            transition: width 0.5s; /* 设置缩放动画过渡 */

            &:hover {
                width: 65%; /* 图片容器在鼠标悬浮时扩展宽度 */
            }

            &.reverse { 
                img {
                    margin-left: -10px; /* 向左移动图片，增加负值以实现向左修正 */
                }
            }

            img {
                width: 106%; /* 确保图片宽度填满容器 */
                object-fit: cover; /* 保持图片的宽高比 */
                filter: var(--img-brightness); /* 添加亮度过滤器 */
                transition: filter 0.5s ease; /* 添加过渡效果 */
            }
        }

        .textbox {
            padding: 10px 25px 10px 10px;  /* 内边距 */
            color: var(--font-color-grey); /* 文本颜色 */
            width: 40%; /* 固定文本框宽度 */
            display: flex; /* 让文本框内部内容也使用 flexbox */
            flex-direction: column; /* 使内容纵向排列 */
            justify-content: center; /* 垂直居中对齐 */
            align-items: center; /* 水平居中 */
            overflow-wrap: break-word; /* 添加文字换行 */
            word-wrap: break-word; /* 兼容性支持 */
            transition: all 0.5s; /* 添加过渡效果 */
            background-color: var(--foreground-color); /* 背景色 */


            .title {
                font-size: 48px; /* 设置标题字体大小 */
                font-weight: bold; /* 加粗标题 */
                margin: 0; /* 去掉默认边距 */
                text-align: center; /* 文字居中 */
                overflow-wrap: break-word; /* 添加文字换行 */
                word-wrap: break-word; /* 兼容性支持 */
            }

            .subtitle {
                font-size: 20px; /* 设置副标题字体大小 */
                margin: 5px 0; /* 设置上下边距 */
                text-align: center; /* 文字居中 */
                overflow-wrap: break-word; /* 添加文字换行 */
                word-wrap: break-word; /* 兼容性支持 */
            }
        }
    }
}

@media (max-width: 768px) {
    .mainbox {
        height: 310px;
        width: 90%;
        
        .item {
            .imgbox {
                img {
                    width: 120%;
                }
            }

            .textbox {
                .title {
                    font-size: 22px;
                }

                .subtitle {
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
