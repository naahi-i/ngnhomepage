<template>
    <div>
        <Showcase
            :imageSrc="img1"
            title="Windows11-tan"
            subtitle1=""
            subtitle2="win11娘可爱捏"
            :isReversed="false"
            imgHeight="100%"
        />
        <Showcase
            :imageSrc="img2"
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
import img1 from '../img/win11-tan.jpg'; // 引入图片
import img2 from '../img/pln.jpg'; 
</script>
