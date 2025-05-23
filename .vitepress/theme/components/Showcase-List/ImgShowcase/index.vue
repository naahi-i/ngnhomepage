<template>
    <div class="showcase-wrapper" ref="showcaseWrapper" 
        @wheel="handleWheel"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd">
        <div class="showcase-items-wrapper" :style="wrapperStyle">
            <Showcase v-for="(item, index) in showcaseItems" 
                :key="index" 
                :imageSrc="item.imageSrc" 
                :title="item.title"
                :subtitle2="item.subtitle2" 
                :isReversed="item.isReversed" 
                :imgHeight="item.imgHeight"
                :imgOffsetX="item.imgOffsetX" 
                :style="getCardStyle(index)"
            />
        </div>
        <div class="dots-wrapper">
            <span v-for="(item, index) in originalItems" :key="'dot-' + index"
                :class="['dot', { 'active': index === currentDotIndex }]" @click="goToIndex(index)"></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Showcase from './ImgShowcase-template.vue';
import img1 from '../../img/ImgShowcase/win11-tan.webp';
import img2 from '../../img/ImgShowcase/my.webp';
import img3 from '../../img/ImgShowcase/Cecilia.webp';
import img4 from '../../img/ImgShowcase/Tsukiyuki_Miyako.webp';
import img5 from '../../img/ImgShowcase/tlbk.webp';
import img6 from '../../img/ImgShowcase/Al1s.webp';

// 保存原始的 showcaseItems
const originalItems = [
    { imageSrc: img1, title: 'Windows11-tan', subtitle2: 'win11娘可爱捏', isReversed: false, imgHeight: '100%', imgOffsetX: '15px' },
    { imageSrc: img2, title: '百濑美月', subtitle2: '唔啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊', isReversed: true, imgHeight: '140%', imgOffsetX: '0px' },
    { imageSrc: img3, title: '塞西莉亚', subtitle2: '简直就是小天使', isReversed: false, imgHeight: '130%', imgOffsetX: '0px' },
    { imageSrc: img4, title: '月雪宫子', subtitle2: '这里是RABBIT1、现在作战开始。', isReversed: true, imgHeight: '100%', imgOffsetX: '-25px' },
    { imageSrc: img5, title: '特莉波卡', subtitle2: '是小死神', isReversed: false, imgHeight: '100%', imgOffsetX: '0px' },
    { imageSrc: img6, title: '爱丽丝', subtitle2: '邦邦咔邦！', isReversed: true, imgHeight: '100%', imgOffsetX: '0px' },
];

// 创建循环数组
const showcaseItems = ref([
    originalItems[originalItems.length - 1],
    ...originalItems,
    originalItems[0]
]);

const currentIndex = ref(1);  // 初始索引为1
const isScrolling = ref(false);
const isTransitioning = ref(true);
const itemHeight = ref(window.innerWidth <= 768 ? 260 : 410);

// 监听窗口大小变化
window.addEventListener('resize', () => {
    itemHeight.value = window.innerWidth <= 768 ? 260 : 410;
});

// 计算wrapper样式
const wrapperStyle = computed(() => ({
    transform: `translateY(${currentIndex.value * -itemHeight.value}px)`,
    transition: isTransitioning.value ? 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)' : 'none',
    height: `${showcaseItems.value.length * itemHeight.value}px`,
}));

// 调整卡片样式计算
const getCardStyle = (index: number) => ({
    transform: `scale(${index === currentIndex.value ? 1 : 0.9})`,
    opacity: index === currentIndex.value ? 1 : 0.5,
    transition: `transform ${isTransitioning.value ? '0.6s' : '0s'} cubic-bezier(0.25, 0.8, 0.25, 1), opacity ${isTransitioning.value ? '0.6s' : '0s'} cubic-bezier(0.25, 0.8, 0.25, 1)`,
    willChange: 'opacity'
});

// 更新滚轮处理函数
const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    if (isScrolling.value) return;

    isScrolling.value = true;
    currentIndex.value += event.deltaY > 0 ? 1 : -1;
    
    setTimeout(() => {
        adjustIndex();
        isScrolling.value = false;
    }, 600);
};

// 优化索引调整函数
const adjustIndex = () => {
    if (currentIndex.value === 0 || currentIndex.value === showcaseItems.value.length - 1) {
        requestAnimationFrame(() => {
            isTransitioning.value = false;
            currentIndex.value = currentIndex.value === 0 
                ? showcaseItems.value.length - 2 
                : 1;
            
            requestAnimationFrame(() => {
                isTransitioning.value = true;
            });
        });
    }
};

// 点击跳转函数
const goToIndex = (index: number) => {
    if (isScrolling.value) return;
    currentIndex.value = index + 1;
    isTransitioning.value = true;
};

// 计算当前点的索引
const currentDotIndex = computed(() => {
    if (currentIndex.value === 0) return originalItems.length - 1;
    if (currentIndex.value === showcaseItems.value.length - 1) return 0;
    return currentIndex.value - 1;
});

// 添加触摸相关的状态
const touchStartY = ref(0);
const touchStartX = ref(0);
const minSwipeDistance = 50; // 最小滑动距离

// 触摸开始
const handleTouchStart = (e: TouchEvent) => {
    touchStartY.value = e.touches[0].clientY;
    touchStartX.value = e.touches[0].clientX;
};

// 触摸移动
const handleTouchMove = (e: TouchEvent) => {
    if (isScrolling.value) return;
    e.preventDefault(); // 阻止页面滚动
};

// 优化触摸结束处理
const handleTouchEnd = (e: TouchEvent) => {
    if (isScrolling.value) return;

    const deltaY = e.changedTouches[0].clientY - touchStartY.value;
    const deltaX = e.changedTouches[0].clientX - touchStartX.value;

    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
        isScrolling.value = true;
        isTransitioning.value = true;
        currentIndex.value += deltaY < 0 ? 1 : -1;

        setTimeout(() => {
            adjustIndex();
            isScrolling.value = false;
        }, 600);
    }
};

</script>

<style scoped lang="less">
.showcase-wrapper {
    position: relative;
    overflow: hidden;
    width: 65vw;
    margin: -20px auto;
    height: 410px; // 固定容器高度
    mask: linear-gradient(to bottom, transparent, black 4%, black 97%, transparent);
}

.showcase-items-wrapper {
    display: flex;
    flex-direction: column; // 纵向排列
    will-change: transform;
    backface-visibility: hidden;
}

.dots-wrapper {
    position: absolute;
    right: 1%; // 右侧定位
    top: 50%; // 垂直居中
    transform: translateY(-50%); // 垂直居中对齐
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
}

.dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--dot);
    cursor: pointer;
    transition: height 0.3s, background-color 0.3s;

    &.active {
        width: 6px;
        height: 18px; // 垂直方向拉长
        border-radius: 10px;
        background-color: var(--dot-active);
    }
}

@media (max-width: 768px) {
    .showcase-wrapper {
        width: 100vw;
        height: 260px;
        margin: -20px auto;
        touch-action: none; // 禁用浏览器默认触摸行为
    }

    .dots-wrapper {
        right: 8px;
        gap: 4px;
    }

    .dot {
        width: 4px;
        height: 4px;

        &.active {
            width: 4px;
            height: 12px;
        }
    }
}
</style>
