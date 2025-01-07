<template>
    <div class="MusicCard">
        <div class="container-wrapper">
            <div class="mini-container" v-for="(item, index) in musicData" :key="index">
                <div class="music-content">
                    <!-- 专辑封面 -->
                    <div class="album-cover">
                        <img :src="item.cover" :alt="item.title" draggable="false" />
                    </div>
                    <!-- 音乐信息 -->
                    <div class="music-info">
                        <h3 class="title">{{ item.title }}</h3>
                        <p class="artist">{{ item.artist }}</p>
                        <!-- 跳转链接按钮 -->
                        <a :href="item.link" target="_blank" class="link-btn">
                            <i class="iconfont icon-link"></i>
                            <span>打开歌曲</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="isDarkMode" class="gradient-overlay"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStore } from '../../store'

const { state } = useStore()
const isDarkMode = computed(() => state.darkMode)

const musicData = ref([
    {
        title: "左手右手",
        artist: "橘猫烧鲷鱼",
        cover: "https://imgessl.kugou.com/stdmusic/20230115/20230115190109485431.jpg",
        link: "https://www.kugou.com/mixsong/7whk9h49.html?fromsearch=%E5%B7%A6%E6%89%8B%E5%8F%B3%E6%89%8B"
    },
    {
        title: "Dear Moments",
        artist: "赤尾ひかる",
        cover: "https://imgessl.kugou.com/stdmusic/20250101/20250101153640216055.jpg",
        link: "https://www.kugou.com/mixsong/4l4i0c47.html?fromsearch=dear%C2%A0moments"
    },
    {
        title: "你在我眼中绽放",
        artist: "云汐",
        cover: "https://imgessl.kugou.com/stdmusic/20250101/20250101183029303259.jpg",
        link: "https://www.kugou.com/mixsong/8mgurp84.html?fromsearch=%E4%BD%A0%E5%9C%A8%E6%88%91%E7%9C%BC%E4%B8%AD%E7%BB%BD%E6%94%BE"
    },
    {
        title: "阿拉斯加海湾",
        artist: "蓝心羽",
        cover: "https://imgessl.kugou.com/stdmusic/20201204/20201204170202620240.jpg",
        link: "https://www.kugou.com/mixsong/4p4uihc1.html?fromsearch=%E9%98%BF%E6%8B%89%E6%96%AF%E5%8A%A0%E6%B5%B7%E6%B9%BE"
    },
    {
        title: "这世界很美的吧",
        artist: "Zyboy忠宇",
        cover: "https://imgessl.kugou.com/stdmusic/20230921/20230921141215121637.jpg",
        link: "https://www.kugou.com/mixsong/96y7k1d2.html?fromsearch=%E8%BF%99%E4%B8%96%E7%95%8C%E5%BE%88%E7%BE%8E%E5%90%A7"
    },
    {
        title: "气象站台",
        artist: "Uu (刘梦妤)",
        cover: "https://imgessl.kugou.com/stdmusic/20210301/20210301155935530755.jpg",
        link: "https://www.kugou.com/mixsong/4vxwiaf3.html?fromsearch=%E6%B0%94%E8%B1%A1%E7%AB%99%E5%8F%B0"
    },
])

// 背景模糊
onMounted(() => {
    const containers = document.querySelectorAll('.mini-container')
    containers.forEach((container, index) => {
        const backgroundImage = musicData.value[index].cover;
        (container as HTMLElement).style.setProperty('--bg-image', `url(${backgroundImage})`)
    })
})
</script>

<style scoped lang="less">
.MusicCard {
    width: calc(65vw * 0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: var(--foreground-color);
    border-radius: 24px;
    box-shadow: 0 0px 8px rgba(var(--blue-shadow-color), 0.20);
    margin: auto;
    position: relative;
    user-select: none;
    -webkit-transition: -webkit-transform 0.3s ease-in-out, box-shadow 0.3s, background-color 0.5s ease;
    -moz-transition: transform 0.3s ease-in-out, box-shadow 0.3s, background-color 0.5s ease;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s, background-color 0.5s ease;
    transform: translateZ(0);
    will-change: transform;

    .container-wrapper {
        width: 100%;
        max-height: 620px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: flex-start;
        padding: 24px;
        gap: 24px;
        z-index: 1;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;
        scrollbar-width: none;
        /* 优化滚动性能 */
        overscroll-behavior: contain;
        scroll-behavior: smooth;

        /* 启用GPU加速 */
        transform: translateZ(0);
        will-change: transform;

        &::-webkit-scrollbar {
            display: none;
            /* Chrome, Safari, Edge */
        }
    }

    .mini-container {
        flex: 0 0 calc(33.33% - 16px);
        height: 280px;
        background-color: rgba(var(--blue-shadow-color), 0.03);
        border-radius: 16px;
        -webkit-transition: -webkit-transform 0.3s, background-color 0.5s ease;
        -moz-transition: transform 0.3s, background-color 0.5s ease;
        transition: transform 0.3s, background-color 0.5s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        /* 使用transform代替position来优化性能 */
        transform: translate3d(0, 0, 0);
        will-change: transform;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-size: cover;
            background-position: center;
            -webkit-filter: blur(25px);
            -moz-filter: blur(25px);
            filter: blur(25px);
            opacity: 0.15;
            z-index: 0;
            -webkit-transition: opacity 0.3s;
            -moz-transition: opacity 0.3s;
            transition: opacity 0.3s;
            background-image: var(--bg-image);
            /* 优化模糊效果性能 */
            will-change: opacity;
            backface-visibility: hidden;
        }

        &:hover {
            transform: translateY(-4px);
            background-color: rgba(var(--blue-shadow-color), 0.08);

            &::before {
                opacity: 0.25;
            }
        }

        .music-content {
            position: relative;
            z-index: 1;
            width: 100%;
            padding: 15px;
            cursor: default;

            .album-cover {
                position: relative;
                width: 120px;
                height: 120px;
                margin: 0 auto;
                border-radius: 8px;
                overflow: hidden;
                -webkit-transition: -webkit-transform 0.3s ease, box-shadow 0.3s ease;
                -moz-transition: transform 0.3s ease, box-shadow 0.3s ease;
                transition: transform 0.3s ease, box-shadow 0.3s ease;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    -webkit-transition: -webkit-transform 0.3s ease;
                    -moz-transition: transform 0.3s ease;
                    transition: transform 0.3s ease;
                }
            }

            .music-info {
                margin-top: 16px;
                text-align: center;

                .title {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 5px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                }

                .artist {
                    font-size: 14px;
                    color: var(--font-color-grey);
                    margin-bottom: 15px;
                }

                .link-btn {
                    display: inline-flex;
                    align-items: center;
                    padding: 8px 16px;
                    background: rgba(var(--blue-shadow-color), 0.08);
                    border-radius: 5px;
                    -webkit-transform: skew(-5deg);
                    -moz-transform: skew(-5deg);
                    transform: skew(-5deg);
                    -webkit-transition: all 0.3s ease;
                    -moz-transition: all 0.3s ease;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    color: var(--font-color);

                    span {
                        font-size: 14px;
                    }

                    &:hover {
                        background: rgba(var(--blue-shadow-color), 0.15);
                    }
                }
            }
        }
    }

    .loading {
        display: none;
    }
}

@media (max-width: 768px) {
    .MusicCard {
        width: 90vw;
        margin: 10px auto 30px;

        .container-wrapper::-webkit-scrollbar {
            display: none;
        }

        .container-wrapper {
            height: auto;
            max-height: none;
            min-height: auto;
            flex-wrap: nowrap;
            overflow-x: auto;
            overflow-y: hidden;
            padding: 0px;
            gap: 0px;
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
            scrollbar-width: none;
        }

        .mini-container {
            flex: 0 0 85%;
            min-width: 100%;
            height: 160px;
            -webkit-scroll-snap-align: center;
            -ms-scroll-snap-align: center;
            scroll-snap-align: center;
            margin: 0 4px;
            border-radius: 24px;
            background-color: rgba(var(--blue-shadow-color), 0.04);

            .music-content {
                display: flex;
                align-items: center;
                padding: 16px;
                gap: 20px;

                .album-cover {
                    width: 100px;
                    height: 100px;
                    margin: 0 0 0 10px;
                    flex-shrink: 0;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                .music-info {
                    flex: 1;
                    margin-top: -10px;
                    text-align: left;

                    .title {
                        font-size: 18px;
                        margin-bottom: 10px;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }

                    .artist {
                        font-size: 13px;
                        margin-bottom: 12px;
                        opacity: 0.8;
                    }

                    .link-btn {
                        padding: 8px 14px;
                        font-size: 15px;
                    }
                }
            }

            &:hover {
                transform: none;
            }
        }
    }
}
</style>
