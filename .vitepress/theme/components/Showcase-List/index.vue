<template>
    <div class="Showcase-list">
        <div class="ImgShowcase">
            <div class="section">
                <h2 class="firstf-section-title">Img橱窗</h2>
                <ImgShowcase />
            </div>
            <div class="section">
                <h2 class="section-title">音乐</h2>
                <MusicShowcase />
            </div>
            <div class="section">
                <h2 class="section-title">游戏</h2>
                <GameShowcase />
            </div>
            <div class="section">
                <h2 class="section-title">SCHALE</h2>
                <ImgCard />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import ImgShowcase from './ImgShowcase/index.vue';
import ImgCard from './ImgCard.vue';
import MusicShowcase from './MusicShowcase.vue';
import GameShowcase from './GameShowcase.vue';
</script>

<style scoped lang="less">
.separator {
    height: 2px;
    background: linear-gradient(90deg,
            transparent,
            rgba(var(--blue-shadow-color), 0.15),
            transparent);
    margin: 40px 0;
    width: 100%;
    transition: background 0.5s ease;

    html[theme='dark'] & {
        background: linear-gradient(90deg,
                transparent,
                rgba(157, 124, 216, 0.15),
                transparent);
    }
}

.section {
    .firstf-section-title,
    .section-title {
        font-size: 2em;
        font-weight: 600;
        color: var(--text-color);
        text-align: center;
        transition: color 0.3s ease;

        &::after {
            content: '';
            display: block;
            width: 50px;
            height: 3px;
            background: var(--font-color-gold);
            margin: 10px auto;
            border-radius: 2px;
            transition: width 0.3s ease;
        }
    }

    .firstf-section-title {
        margin-top: 40px;
    }

    .section-title {
        margin-top: 70px;
    }
}

@media (max-width: 768px) {
    .section {
        .firstf-section-title,
        .section-title {
            font-size: 1em;
        }

        .firstf-section-title {
            margin-top: 10px;
        }

        .section-title {
            margin-top: 30px;
        }
    }
}
</style>
