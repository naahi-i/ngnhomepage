<template>
    <div class="Showcase-list">
        <div class="ImgShowcase">
            <!-- <p>Image</p> -->
            <ImgShowcase />
            <ImgCard></ImgCard>
            <!-- <SignText></SignText> -->
        </div>
    </div>
</template>
<script setup lang="ts">
import ImgShowcase from './ImgShowcase/index.vue';
import SignText from './SignText.vue'
import ImgCard from './ImgCard.vue';
</script>

<style scoped lang="less">
// .Showcase-list {
//     margin: 50px auto;
// }
p {
    margin: 10px 0 20px 60px;
    font-size: 40px;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        left: -60px;
        bottom: -5px;
        width: 180px;
        height: 3px;
        background-color: var(--font-color-gold);
    }
}

@media (max-width: 768px) {
    p {
        margin: 0 0 10px 20px;
        font-size: 24px;
        &::after {
            left: -20px;
            width: 90px;
        }
    }
}
</style>
