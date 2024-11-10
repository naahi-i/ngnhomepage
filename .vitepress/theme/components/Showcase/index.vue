<template>
    <transition name="fade" appear>
        <div class="showcase-wrapper" ref="showcaseWrapper" @wheel="handleWheel" @touchstart="handleTouchStart"
            @touchend="handleTouchEnd">
            <div class="showcase-items-wrapper" :style="wrapperStyle">
                <Showcase v-for="(item, index) in showcaseItems" :key="index" :imageSrc="item.imageSrc"
                    :title="item.title" :subtitle1="item.subtitle1" :subtitle2="item.subtitle2"
                    :isReversed="item.isReversed" :imgHeight="item.imgHeight" :style="getCardStyle(index)" />
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

// 橱窗数据列表
const showcaseItems = [
    { imageSrc: img1, title: 'Windows11-tan', subtitle2: 'win11娘可爱捏', isReversed: false, imgHeight: '100%' },
    { imageSrc: img2, title: '普拉娜', subtitle2: '橱窗正在施工', isReversed: true, imgHeight: '140%' },
    { imageSrc: img3, title: '喜多郁代', subtitle2: '喜多光环！', isReversed: false, imgHeight: '180%' },
];

const currentIndex = ref(0); // 当前显示卡片的索引
const isScrolling = ref(false); // 控制滚动是否正在进行
const itemHeight = ref(350); // 默认设置为普通屏幕的高度

// 根据屏幕大小动态调整 itemHeight
const updateItemHeight = () => {
    itemHeight.value = window.innerWidth <= 768 ? 250 : 350; // 移动端时为250，其他为350
};

// 初始化时设置 itemHeight
updateItemHeight();

// 监听窗口大小变化，动态更新 itemHeight
window.addEventListener('resize', updateItemHeight);

// 计算 showcase-items-wrapper 的样式
const wrapperStyle = computed(() => ({
    '--current-y': `${currentIndex.value * -itemHeight.value}px`, // 使用动态的 itemHeight
    height: `${itemHeight.value * showcaseItems.length}px`, // 动态计算高度
}));

// 记录起始的触摸位置
let startY = 0;

// 触摸开始事件处理函数
const handleTouchStart = (event: TouchEvent) => {
    event.preventDefault(); // 阻止默认的滚动行为
    startY = event.touches[0].clientY;
};

// 触摸结束事件处理函数，判断滑动方向并更新当前索引
const handleTouchEnd = (event: TouchEvent) => {
    const endY = event.changedTouches[0].clientY;
    if (Math.abs(startY - endY) < 30) return; // 防止误触

    // 根据滑动方向更新索引
    currentIndex.value = (currentIndex.value + (startY > endY ? 1 : -1) + showcaseItems.length) % showcaseItems.length;

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

    // 根据滚轮方向更新索引
    currentIndex.value = (currentIndex.value + (event.deltaY > 0 ? 1 : -1) + showcaseItems.length) % showcaseItems.length;

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
        boxShadow: index === currentIndex.value ? '0 10px 20px rgba(0, 0, 0, 0.15)' : 'none',
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
    transform: translateY(50vh);
}

.showcase-wrapper {
    position: relative;
    width: 100%;
    height: 365px; /* 默认高度 */
    overflow: hidden;
    margin: 0 auto;
}

.showcase-items-wrapper {
    display: flex;
    flex-direction: column;
    transform: translateY(var(--current-y, 0)); // 使用 CSS 变量动态控制位置
    transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    height: calc(330px * 3); // 动态根据卡片数量设置
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
}

.dot.active {
    width: 18px;
    height: 6px;
    border-radius: 10px;
    background-color: var(--color-blue);
}

@media (max-width: 768px) {
    .showcase-wrapper {
        height: 260px;
    }

    .dots-wrapper {
        left: 50%;
    }
}
</style>
