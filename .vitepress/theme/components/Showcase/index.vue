<template>
    <div>
        <Showcase
            imageSrc=".vitepress\theme\components\img\win11-tan.jpg"
            title="Windows11-tan"
            subtitle1=""
            subtitle2="win11娘可爱捏"
            :isReversed="false"
            imgHeight="100%"
        />
        <Showcase
            imageSrc=".vitepress\theme\components\img\pln.jpg"
            title="普拉娜"
            subtitle1=""
            subtitle2="橱窗正在施工"
            :isReversed="true"
            imgHeight="140%"

        />
    </div>
</template>

<script setup lang="ts">
import Showcase from './Showcase.vue'; // 导入通用橱窗组件
</script>
