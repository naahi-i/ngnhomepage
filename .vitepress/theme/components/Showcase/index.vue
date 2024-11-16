<template>
    <transition name="fade" appear>
        <div class="showcase-wrapper" ref="showcaseWrapper" @wheel="handleWheel" @touchstart="handleTouchStart"
            @touchend="handleTouchEnd">
            <div class="showcase-items-wrapper" :style="wrapperStyle">
                <Showcase
                    v-for="(item, index) in showcaseItems"
                    :key="index"
                    :imageSrc="item.imageSrc"
                    :title="item.title"
                    :subtitle2="item.subtitle2"
                    :isReversed="item.isReversed"
                    :imgHeight="item.imgHeight"
                    :imgOffsetX="item.imgOffsetX"
                />
            </div>
            <div class="dots-wrapper">
                <span v-for="(item, index) in showcaseItems" :key="'dot-' + index"
                    :class="['dot', { 'active': index === currentIndex }]" @click="goToIndex(index)"></span>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Showcase from './Showcase.vue';
import img1 from '../img/win11-tan.jpg';
import img2 from '../img/pln.jpg';
import img3 from '../img/xdyd.jpg';
import img4 from '../img/Tsukiyuki_Miyako.jpg';

// 橱窗数据列表
const showcaseItems = [
    { imageSrc: img1, title: 'Windows11-tan', subtitle2: 'win11娘可爱捏', isReversed: false, imgHeight: '100%', imgOffsetX: '-12px' },
    { imageSrc: img2, title: '普拉娜', subtitle2: '橱窗正在施工', isReversed: true, imgHeight: '140%', imgOffsetX: '-10px' },
    { imageSrc: img3, title: '喜多郁代', subtitle2: '喜多光环！', isReversed: false, imgHeight: '180%', imgOffsetX: '-8px' },
    { imageSrc: img4, title: '月雪宫子', subtitle2: '这里是RABBIT1、现在作战开始。', isReversed: true, imgHeight: '100%', imgOffsetX: '-15px' },
];

const currentIndex = ref(0); // 当前显示卡片的索引
const isScrolling = ref(false); // 控制滚动是否正在进行
const itemWidth = ref(0); // 每个卡片的宽度，初始化为 0

// 根据屏幕大小动态调整 itemWidth
const updateItemWidth = () => {
    itemWidth.value = window.innerWidth; // 设置卡片宽度为屏幕的宽度
};

// 初始化时设置 itemWidth
updateItemWidth();

// 监听窗口大小变化，动态更新 itemWidth
window.addEventListener('resize', updateItemWidth);

// 计算 showcase-items-wrapper 的样式
const wrapperStyle = computed(() => ({
    '--current-x': `${currentIndex.value * -itemWidth.value}px`, // 使用动态的 itemWidth 来控制横向滑动
    width: `${itemWidth.value * showcaseItems.length}px`, // 设置宽度为卡片总宽度
}));

// 记录起始的触摸位置
let startX = 0;

// 触摸开始事件处理函数
const handleTouchStart = (event: TouchEvent) => {
    event.preventDefault(); // 阻止默认的滚动行为
    startX = event.touches[0].clientX;
};

// 触摸结束事件处理函数，判断滑动方向并更新当前索引
const handleTouchEnd = (event: TouchEvent) => {
    const endX = event.changedTouches[0].clientX;
    if (Math.abs(startX - endX) < 30) return; // 防止误触

    // 根据滑动方向更新索引
    if (startX > endX && currentIndex.value < showcaseItems.length - 1) {
        currentIndex.value++; // 向右滑动
    } else if (startX < endX && currentIndex.value > 0) {
        currentIndex.value--; // 向左滑动
    }

    // 开始滚动
    isScrolling.value = true;
    // 结束滚动动画后解锁滚动
    setTimeout(() => {
        isScrolling.value = false;
    }, 700); // 与动画时长匹配，确保动画完成后才能滚动
};

// 滚轮事件处理函数
const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    if (isScrolling.value) return; // 如果已经在滚动中，忽略新的滚动事件

    // 滚动到底部或顶部时不再处理
    if (
        (currentIndex.value === 0 && event.deltaY < 0) ||
        (currentIndex.value === showcaseItems.length - 1 && event.deltaY > 0)
    ) {
        return; // 防止滚动越界
    }

    // 根据滚轮方向更新索引
    if (event.deltaY > 0 && currentIndex.value < showcaseItems.length - 1) {
        currentIndex.value++; // 向下滚动
    } else if (event.deltaY < 0 && currentIndex.value > 0) {
        currentIndex.value--; // 向上滚动
    }

    // 开始滚动
    isScrolling.value = true;
    // 结束滚动动画后解锁滚动
    setTimeout(() => {
        isScrolling.value = false;
    }, 700);
};

// 跳转到指定的卡片
const goToIndex = (index: number) => {
    currentIndex.value = index;
};

// 获取每个卡片的动画样式
const getCardStyle = (index: number) => {
    const scale = index === currentIndex.value ? 1 : 0.85;
    const opacity = index === currentIndex.value ? 1 : 0.7;
    return {
        transform: `scale(${scale}) skew(-5deg)`, 
        opacity,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
    };
};
</script>

<style scoped lang="less">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.8s ease, transform 0.8s cubic-bezier(.61, .15, .26, 1);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateX(50vw); /* 横向的动画效果 */
}

.showcase-wrapper {
    position: relative;
    width: 100%;
    height: 400px; /* 固定高度 */
    overflow: hidden;
    margin: 0 auto;
}

.showcase-items-wrapper {
    display: flex;
    flex-direction: row; /* 改为横向排列 */
    transform: translateX(var(--current-x, 0)); /* 使用 CSS 变量动态控制位置 */
    transition: transform 1.1s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dots-wrapper {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    align-items: center;
}

.dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: width 0.3s ease, background-color 0.3s ease, border-radius 0.3s ease;
    &.active{
        width: 18px;
        height: 6px;
        border-radius: 10px;
        background-color: var(--color-blue);
    }
}

@media (max-width: 768px) {
    .showcase-wrapper {
        height: 300px;
    }
    
    .showcase-items-wrapper {
        transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .dots-wrapper {
        gap: 6px;
    }
    
    .dot {
        width: 5px;
        height: 5px;
    }
}
</style>
