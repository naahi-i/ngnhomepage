<template>
    <transition name="fade" appear>
        <div class="showcase-wrapper" ref="showcaseWrapper" @wheel="handleWheel" @touchstart="handleTouchStart"
            @touchend="handleTouchEnd" @mouseenter="disableScroll" @mouseleave="enableScroll">
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
                <span v-for="(item, index) in originalItems" :key="'dot-' + index"
                    :class="['dot', { 'active': index === currentDotIndex }]" @click="goToIndex(index)"></span>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Showcase from './ImgShowcase-template.vue';
import img1 from '../../img/win11-tan.png';
import img2 from '../../img/pln.png';
import img3 from '../../img/xdyd.png';
import img4 from '../../img/Tsukiyuki_Miyako.png';

// 保存原始的 showcaseItems
const originalItems = [
    { imageSrc: img1, title: 'Windows11-tan', subtitle2: 'win11娘可爱捏', isReversed: false, imgHeight: '100%', imgOffsetX: '-12px' },
    { imageSrc: img2, title: '普拉娜', subtitle2: '阿洛娜前辈？', isReversed: true, imgHeight: '140%', imgOffsetX: '-10px' },
    { imageSrc: img3, title: '喜多郁代', subtitle2: '喜多光环！', isReversed: false, imgHeight: '180%', imgOffsetX: '-8px' },
    { imageSrc: img4, title: '月雪宫子', subtitle2: '这里是RABBIT1、现在作战开始。', isReversed: true, imgHeight: '100%', imgOffsetX: '-15px' },
];

// 创建新的 showcaseItems，在开头和结尾添加元素副本
const showcaseItems = ref([
    originalItems[originalItems.length - 1], // 添加最后一个元素作为第一个
    ...originalItems,
    originalItems[0], // 添加第一个元素作为最后一个
]);

const currentIndex = ref(1); // 初始索引为1，对应原始数据的第一个元素
const isScrolling = ref(false); // 控制滚动是否正在进行
const itemWidth = ref(window.innerWidth); // 每个卡片的宽度，初始化为屏幕宽度

// 监听窗口大小变化，动态更新 itemWidth
window.addEventListener('resize', () => {
    itemWidth.value = window.innerWidth;
});

// 用于控制过渡效果的标志
const isTransitioning = ref(true);
const isAnimating = ref(false); // 用于跟踪动画状态

// 计算 showcase-items-wrapper 的样式
const wrapperStyle = computed(() => ({
    '--current-x': `${currentIndex.value * -itemWidth.value}px`, // 使用动态的 itemWidth 来控制横向滑动
    width: `${itemWidth.value * showcaseItems.value.length}px`, // 设置宽度为卡片总宽度
    transition: isTransitioning.value ? 'transform 0.8s ease' : 'none',
}));

// 计算当前激活的点阵索引
const currentDotIndex = computed(() => {
    if (currentIndex.value === 0) {
        return originalItems.length - 1;
    } else if (currentIndex.value === showcaseItems.value.length - 1) {
        return 0;
    }
    return currentIndex.value - 1;
});

// 记录起始的触摸位置
let startX = 0;

// 触摸开始事件处理函数
const handleTouchStart = (event: TouchEvent) => {
    event.preventDefault(); // 阻止默认的滚动行为
    startX = event.touches[0].clientX;
};

// 触摸结束事件处理函数，判断滑动方向并更新当前索引
const handleTouchEnd = (event: TouchEvent) => {
    if (isAnimating.value) return; // 动画进行中则忽略
    const endX = event.changedTouches[0].clientX;
    if (Math.abs(startX - endX) < 30) return; // 防止误触

    // 根据滑动方向更新索引
    currentIndex.value += startX > endX ? 1 : -1;

    isTransitioning.value = true;
    isAnimating.value = true; // 开始动画
    isScrolling.value = true;

    setTimeout(() => {
        adjustIndex();
        isAnimating.value = false; // 动画结束
        isScrolling.value = false;
    }, 800);
};

// 滚轮事件处理函数
const handleWheel = (event: WheelEvent) => {
    if (isAnimating.value || isScrolling.value) return; // 动画进行中或滚动中则忽略
    event.preventDefault();

    // 滚动到底部或顶部时不再处理
    if (
        (currentIndex.value === 0 && event.deltaY < 0) ||
        (currentIndex.value === showcaseItems.value.length - 1 && event.deltaY > 0)
    ) return; // 防止滚动越界

    // 根据滚轮方向更新索引
    currentIndex.value += event.deltaY > 0 ? 1 : -1;

    isTransitioning.value = true;
    isAnimating.value = true; // 开始动画
    isScrolling.value = true;

    setTimeout(() => {
        adjustIndex();
        isAnimating.value = false; // 动画结束
        isScrolling.value = false;
    }, 800);
};

// 跳转到指定的卡片
const goToIndex = (index: number) => {
    if (isAnimating.value) return; // 动画进行中则忽略
    currentIndex.value = index + 1;
    isTransitioning.value = true;
    isAnimating.value = true; // 开始动画

    setTimeout(() => {
        adjustIndex();
        isAnimating.value = false; // 动画结束
    }, 800);
};

// 监听滚动结束，调整索引实现无缝循环
const adjustIndex = () => {
    if (currentIndex.value === 0) {
        isTransitioning.value = false;
        currentIndex.value = showcaseItems.value.length - 2;
    } else if (currentIndex.value === showcaseItems.value.length - 1) {
        isTransitioning.value = false;
        currentIndex.value = 1;
    }
};

// 禁用页面滚动
const disableScroll = () => {
    document.body.style.overflow = 'hidden';
};

// 启用页面滚动
const enableScroll = () => {
    document.body.style.overflow = '';
};
</script>

<style scoped lang="less">
// .fade-enter-active,
// .fade-leave-active {
//     transition: opacity 0.8s ease, transform 0.8s cubic-bezier(.61, .15, .26, 1);
// }

// .fade-enter-from,
// .fade-leave-to {
//     opacity: 0;
//     transform: translateX(50vw); /* 横向的动画效果 */
// }

.showcase-wrapper {
    position: relative;
    overflow: hidden;
}

.showcase-items-wrapper {
    display: flex;
    flex-direction: row; /* 改为横向排列 */
    transform: translateX(var(--current-x, 0)); /* 使用 CSS 变量动态控制位置 */
    transition: transform 1.1s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dots-wrapper {
    position: absolute;
    bottom: 0;
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
