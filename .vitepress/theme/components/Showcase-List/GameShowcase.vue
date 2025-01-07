<template>
    <div class="game-showcase">
        <div class="main-preview">
            <div class="preview-background">
                <transition name="slide">
                    <div class="preview-content" :key="currentGame.title">
                        <div class="game-image">
                            <img :src="currentGame.previewImage" :alt="currentGame.title" draggable="false"
                                loading="lazy">
                            <div class="preview-info">
                                <h2 :key="currentGame.title">{{ currentGame.title }}</h2>
                                <p :key="currentGame.description">{{ currentGame.description }}</p>
                                <button @click="playGame">Steam链接</button>
                            </div>
                        </div>
                        <div class="chibi-section">
                            <div class="chibi-container">
                                <template v-if="currentGame.miniImages?.length">
                                    <div v-for="(img, index) in currentGame.miniImages" :key="index" class="chibi-item">
                                        <img :src="img" :alt="`${currentGame.title}-${index + 1}`" draggable="false"
                                            loading="lazy">
                                    </div>
                                </template>
                                <div v-else class="chibi-item">
                                    <div class="placeholder">暂无小图展示</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <div class="games-wrapper">
            <div class="games-container">
                <div v-for="(game, index) in gameList" :key="index" class="game-item" @click="selectGame(index)"
                    :class="{ 'active': currentIndex === index }">
                    <img :src="game.previewImage" :alt="game.title" draggable="false">
                    <span class="game-title">{{ game.title }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import game1 from '../img/GameShowcase/Yard.jpg';
import game2 from '../img/GameShowcase/scp.jpg';
import game3 from '../img/GameShowcase/Aliya.jpg';
import mini1 from '../img/GameShowcase/Ghost2.png';
import mini2 from '../img/GameShowcase/Show My Cat.png';
import mini3 from '../img/GameShowcase/Hold Haa Lou Ling4.png';
import mini4 from '../img/GameShowcase/Hold Tlipoca1.png';
import mini5 from '../img/GameShowcase/Cat4.png';
import mini6 from '../img/GameShowcase/09.png';

interface Game {
    previewImage: string;
    title: string;
    description: string;
    miniImages?: string[]; // 新增小图数组属性
    Link: string; // 添加 Steam 链接属性
}

const gameList = ref<Game[]>([
    {
        previewImage: game1,
        title: "Yog-Sothoth's Yard",
        description: '犹格索托斯的庭院',
        miniImages: [mini1, mini2, mini3, mini4, mini5, mini6],
        Link: 'https://store.steampowered.com/app/2194530?snr=5000_5100__'
    },
    {
        previewImage: game2,
        title: "SCP: Secret Laboratory",
        description: 'SCP秘密实验室',
        Link: 'https://store.steampowered.com/app/700330?snr=5000_5100__'
    },
    {
        previewImage: game3,
        title: "彼方的她-Aliya ",
        description: '千年以外的对话',
        Link: 'https://store.steampowered.com/app/700330?snr=5000_5100__'
    },
]);

const currentIndex = ref(0);
const currentGame = ref(gameList.value[0]);

const selectGame = (index: number) => {
    currentIndex.value = index;
    currentGame.value = gameList.value[index];
};

const playGame = () => {
    window.open(currentGame.value.Link, '_blank');
};

// 添加虚拟列表优化
import { onMounted, onUnmounted } from 'vue'

// 防抖函数
const debounce = (fn: Function, delay: number) => {
    let timer: number | null = null
    return (...args: any[]) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => fn(...args), delay)
    }
}

// 优化滚动处理
const handleScroll = debounce(() => {
    // 滚动处理逻辑
}, 16)

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="less">
.game-showcase {
    width: calc(65vw * 0.95);
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    user-select: none;

    .main-preview {
        background-color: var(--foreground-color);
        width: 100%;
        height: 720px; // 调整总高度
        border-radius: 24px;
        overflow: hidden;
        position: relative;
        box-shadow: 0 0px 8px rgba(var(--blue-shadow-color), 0.20);

        .preview-background {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
        }

        .preview-content {
            width: 100%;
            height: 100%;
            position: absolute;
            display: flex;
            flex-direction: column;
            background: transparent;
            will-change: opacity, transform;
            transform: translate3d(0, 0, 0);

            .game-image {
                position: relative;
                height: 480px; // 调整图片区域高度
                background: transparent;
                border-radius: 24px 24px 0 0;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    user-select: none;
                    filter: var(--img-brightness);
                }

                .preview-info {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 40px;
                    background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
                    color: white;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;

                    h2,
                    p {
                        backface-visibility: hidden;
                        -webkit-font-smoothing: antialiased;
                        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                    }

                    h2 {
                        font-size: 32px;
                        margin-bottom: 12px;
                        font-weight: 600;
                        letter-spacing: 0.5px;
                    }

                    p {
                        font-size: 18px;
                        opacity: 0.9;
                        margin-bottom: 20px;
                    }

                    button {
                        margin-top: 5px;
                        padding: 12px 28px;
                        border: none;
                        border-radius: 8px;
                        background: rgba(255, 255, 255, 0.9);
                        color: #000;
                        font-size: 16px;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        transform: skew(-5deg);

                        &:hover {
                            background: #fff;
                            transform: translateY(-2px) skew(-5deg);
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                        }
                    }
                }

                &::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 10px;
                    background: linear-gradient(to bottom, transparent, var(--foreground-color));
                    pointer-events: none;
                }
            }

            .chibi-section {
                flex: 1;
                padding: 20px 24px;
                background-color: var(--foreground-color);
                border-radius: 0 0 24px 24px;
                border-top: none;
                position: relative;
                height: 240px; // 添加固定高度
                overflow: hidden;

                h3 {
                    margin-bottom: 20px;
                    font-size: 1.5em;
                    color: var(--text-color);
                }

                .chibi-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                    border-radius: 15px;
                    max-height: 200px;
                    overflow-y: auto;
                    overflow-x: hidden;

                    // 自定义滚动条样式
                    &::-webkit-scrollbar {
                        width: 6px;
                    }

                    &::-webkit-scrollbar-track {
                        display: none;
                    }

                    &::-webkit-scrollbar-thumb {
                        background: rgba(var(--blue-shadow-color), 0.2);
                        border-radius: 3px;
                    }

                    .chibi-item {
                        flex: 1;
                        min-width: 200px;
                        height: 200px; // 固定项目高度
                        border-radius: 16px;
                        background: rgba(var(--blue-shadow-color), 0.05);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.3s ease;

                        .placeholder {
                            color: var(--text-color);
                            opacity: 0.5;
                            font-size: 1.2em;
                        }

                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: contain;
                            filter: var(--img-brightness);
                        }
                    }
                }
            }
        }
    }

    .games-wrapper {
        background-color: var(--foreground-color);
        border-radius: 24px;
        padding: 24px;
        box-shadow: 0 0px 8px rgba(var(--blue-shadow-color), 0.20);
        transition: background-color 0.5s ease;

        .games-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            contain: layout style;

            .game-item {
                height: 120px;
                border-radius: 16px;
                overflow: hidden;
                position: relative;
                cursor: pointer;
                transition: all 0.4s ease;

                &.active {
                    box-shadow: 0 0 0 3px var(--dot-active);
                    transform: translateY(-3px);
                }

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: var(--img-brightness);
                    transition: transform 0.4s ease;
                }

                .game-title {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 10px;
                    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
                    color: white;
                    font-size: 14px;
                    text-align: center;
                    transition: transform 0.3s ease;
                }

            }
        }
    }
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.6s ease;
    position: absolute;
    width: 100%;
    height: 100%;
}

.slide-enter-from {
    opacity: 0;
}

.slide-leave-to {
    opacity: 0;
}

@media (max-width: 768px) {
    .game-showcase {
        width: 90vw;
        margin: auto;
        gap: 6px;

        .main-preview {
            height: 445px;

            .preview-content {
                .game-image {
                    height: 300px;

                    .preview-info {
                        padding: 20px;

                        h2 {
                            font-size: 24px;
                            margin-bottom: 8px;
                        }

                        p {
                            font-size: 16px;
                            margin-bottom: 12px;
                        }

                        button {
                            padding: 8px 20px;
                            font-size: 14px;
                            border-radius: 6px;
                        }
                    }
                }

                .chibi-section {
                    height: 100px;
                    padding: 12px;

                    .chibi-container {
                        flex-wrap: nowrap;
                        overflow-x: auto;
                        overflow-y: hidden;
                        max-height: none;
                        gap: 12px;
                        -webkit-overflow-scrolling: touch;
                        scroll-snap-type: x mandatory;
                        scrollbar-width: none;

                        &::-webkit-scrollbar {
                            display: none;
                        }

                        .chibi-item {
                            min-width: 120px;
                            height: 120px;
                            border-radius: 12px;
                            scroll-snap-align: start;

                            .placeholder {
                                font-size: 1em;
                            }
                        }
                    }
                }
            }
        }

        .games-wrapper {
            padding: 12px;
            overflow-x: auto;
            scrollbar-width: none;

            &::-webkit-scrollbar {
                display: none;
            }

            .games-container {
                display: flex;
                flex-wrap: nowrap;
                gap: 12px;
                width: max-content;
                border-radius: 5px;

                .game-item {
                    width: 120px;
                    height: 80px;
                    flex-shrink: 0;

                    &.active {
                        box-shadow: 0 0 0 2px var(--dot-active);
                        transform: translateY(-1px);
                    }

                    .game-title {
                        font-size: 10px;
                    }
                }
            }
        }
    }
}
</style>
