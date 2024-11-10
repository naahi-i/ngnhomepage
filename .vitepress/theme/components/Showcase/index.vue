<template>
    <div class="showcase-wrapper" ref="showcaseWrapper" @wheel="handleWheel">
        <div class="showcase-items-wrapper" :style="wrapperStyle">
            <Showcase 
                v-for="(item, index) in showcaseItems" 
                :key="index" 
                :imageSrc="item.imageSrc" 
                :title="item.title"
                :subtitle1="item.subtitle1" 
                :subtitle2="item.subtitle2" 
                :isReversed="item.isReversed"
                :imgHeight="item.imgHeight" 
                :style="getCardStyle(index)"
            />
        </div>

        <!-- 添加未显示卡片的点点 -->
        <div class="dots-wrapper">
            <span 
                v-for="(item, index) in showcaseItems" 
                :key="'dot-' + index"
                :class="['dot', { 'active': index === currentIndex }]" 
                @click="goToIndex(index)"
            ></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Showcase from './Showcase.vue'; // 导入通用橱窗组件
import img1 from '../img/win11-tan.jpg';
import img2 from '../img/pln.jpg';

const showcaseItems = [
    { imageSrc: img1, title: 'Windows11-tan', subtitle1: '', subtitle2: 'win11娘可爱捏', isReversed: false, imgHeight: '100%' },
    { imageSrc: img2, title: '普拉娜', subtitle1: '', subtitle2: '橱窗正在施工', isReversed: true, imgHeight: '140%' },
];

const currentIndex = ref(0);  // 当前显示卡片的索引
const isScrolling = ref(false);  // 控制滚动是否正在进行
const itemHeight = 330;  // 每个 showcase 卡片的高度

// 计算 showcas-items-wrapper 的样式
const wrapperStyle = computed(() => ({
    transform: `translateY(${currentIndex.value * -itemHeight}px)`,
    transition: 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
    height: `${showcaseItems.length * itemHeight}px`,  // 设置动态高度
}));

// 处理滚轮事件
const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    if (isScrolling.value) return;  // 如果已经在滚动中，忽略新的滚动事件

    // 判断滚轮方向
    currentIndex.value = (currentIndex.value + (event.deltaY > 0 || event.deltaX > 0 ? 1 : -1) + showcaseItems.length) % showcaseItems.length;
    
    // 开始滚动
    isScrolling.value = true;

    // 结束滚动动画后解锁滚动
    setTimeout(() => {
        isScrolling.value = false;
    }, 700); // 与动画时长匹配，确保动画完成后才能滚动
};

// 跳转到指定的卡片
const goToIndex = (index: number) => {
    currentIndex.value = index;
};

// 获取每个卡片的动画样式
const getCardStyle = (index: number) => {
    const scale = index === currentIndex.value ? 1.1 : 0.95;
    const opacity = index === currentIndex.value ? 1 : 0.7;
    return {
        transform: `scale(${scale}) skew(-5deg)`,
        opacity,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        boxShadow: index === currentIndex.value ? '0 10px 20px rgba(0, 0, 0, 0.15)' : 'none',
    };
};
</script>

<style scoped lang="less">
.showcase-wrapper {
    position: relative;
    width: 100%;
    height: 350px;  /* 固定为单个卡片的高度 */
    overflow: hidden;
    margin: 0 auto;
}

.showcase-items-wrapper {
    display: flex;
    flex-direction: column;
}

.showcase-item {
    width: 100%;
    height: 330px;
    display: block;
    flex-shrink: 0;
}

.dots-wrapper {
    position: absolute;
    bottom: 10px;  /* 条形的位置调整到容器底部 */
    left: 50%;
    transform: translateX(-50%);  /* 水平居中 */
    display: flex;
    flex-direction: row;  /* 水平排列 */
    gap: 8px;  /* 条形之间的间距 */
    align-items: center;
}

.dot {
    width: 6px;  /* 默认的点宽度更小 */
    height: 6px;  /* 默认的点高度更小 */
    border-radius: 50%;  /* 圆形 */
    background-color: rgba(0, 0, 0, 0.2);  /* 更淡的颜色 */
    cursor: pointer;
    transition: width 0.3s ease, background-color 0.3s ease, border-radius 0.3s ease;  /* 平滑过渡 */
}

.dot.active {
    width: 18px;  /* 激活时的宽度更小 */
    height: 6px;  /* 激活时的高度 */
    border-radius: 10px;  /* 圆角条形 */
    background-color: var(--color-blue);  /* 激活时的颜色 */
}

@media (max-width: 768px) {
    .showcase-wrapper {
        height: 250px;
    }

    .showcase-item {
        height: 250px;
    }

    .dots-wrapper {
        right: 5px;
    }
}
</style>
