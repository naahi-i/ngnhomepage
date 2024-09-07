<template>
    <span class="iconfont icon-search search" @click="showDialog = true"></span>
    <SearchDialog v-if="showDialog" @close-dialog="closeDialog"></SearchDialog>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { ref, onMounted } from 'vue'
import { useStore } from '../store'
const { state } = useStore()
const themeConfig = useData().theme.value

import SearchDialog from './Search-Dialog.vue'

const showDialog = ref(false)
const closeDialog = () => {
    showDialog.value = false
}
</script>

<style scoped lang="less">
.search {
    cursor: pointer;
    font-size: 38px;
    color: var(--font-color-grey);
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);

    &:hover {
        transform: translateY(-3px);
    }
}
</style>
