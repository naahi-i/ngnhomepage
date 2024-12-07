<template>
    <div class="text-drawing-animations">
        <div id="text-container"></div>
    </div>
</template>

<script>
import Vara from 'vara';

export default {
    name: 'HelloWorld',
    mounted() {
        new Vara("#text-container", "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json", [
            { text: "Hello, Vue!" }
        ], {
            fontSize: 80,
            color: "#000",
            strokeWidth: 2,
            duration: 3000,
            autoAnimation: true,
        });
    }
}
</script>

<style>
.text-drawing-animations {
    width: 300px; /* 固定宽度 */
    height: 300px; /* 固定高度 */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden; /* 超出部分隐藏 */
    margin: 0 auto; /* 居中对齐 */
}

#text-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>