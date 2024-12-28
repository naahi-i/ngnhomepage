<template>
    <div class="ImgCard">
        <img src="../img/SCHALE.png" alt="S.H.C.A.L.E" draggable="false" loading="lazy" />
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="less">
.ImgCard {
    width: calc(65vw * 0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: var(--foreground-color);
    border-radius: 24px;
    box-shadow: 0 4px 8px rgba(var(--blue-shadow-color), 0.3); /* 调整阴影样式 */
    margin: 50px auto;

    img {
        width: 100%;
        height: auto;
        object-fit: contain; // contain 以保持图片比例
        transition: transform 0.5s ease;
        user-select: none;
        &:hover {
            transform: scale(1.02);
        }
    }
}

@media (max-width: 768px) {
    .ImgCard {
        width: 90vw;
        margin: 10px auto 20px;
        img {
            &:hover {
                transform: none;
            }
        }
    }
}
</style>
