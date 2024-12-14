<template>
    <div class="text-drawing-animations">
        <div class="grid-background">
            <div id="text-container"></div>
        </div>
    </div>
</template>

<script>
import Vara from 'vara';

export default {
    name: 'HelloWorld',
    data() {
        return {
            hasRendered: false
        }
    },
    mounted() {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !this.hasRendered) {
                this.hasRendered = true;
                const fontSize = window.innerWidth <= 768 ? 40 : 100;
                new Vara("#text-container", "https://cdn.jsdelivr.net/gh/akzhy/Vara/fonts/Satisfy/SatisfySL.json", [
                    { text: "S.C.A.L.E" }  
                ], {
                    fontSize: fontSize,
                    color: "#000",
                    strokeWidth: 2,
                    duration: 4000,
                    autoAnimation: true,
                    textAlign: "center",
                    letterSpacing: 10
                });
                observer.disconnect(); // 渲染完成后停止观察
            }
        });
        
        observer.observe(this.$el);
    }
}
</script>

<style>
.text-drawing-animations {
    width: 60%; /* 修改宽度为卡片宽度 */
    height: auto; /* 高度自动 */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px; /* 修改内边距 */
    overflow: hidden; /* 超出部分隐藏 */
    background-color: var(--foreground-color); /* 白色背景 */
    border-radius: 24px; /* 圆角 */
    box-shadow: 0 4px 8px rgba(var(--blue-shadow-color), 0.3); /* 阴影 */
    transform: skew(-5deg); /* 倾斜容器 */
    position: relative; /* 添加相对定位 */
    margin: 80px auto 80px ;
}

.text-drawing-animations::after {
    content: '';
    position: absolute;
    bottom: -35px; /* 调整位置 */
    right: 20px; /* 调整位置 */
    width: 120px; /* 调整大小 */
    height: 120px; /* 调整大小 */
    background: url('../assets/gamelogo.png') no-repeat center center;
    background-size: contain;
    transform: skew(5deg); /* 修正倾斜 */
}

.grid-background {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px; /* 修改内边距 */
    background-image: linear-gradient(90deg, rgba(159, 219, 252, 0.25) 3%, transparent 0), /* 调整网格颜色 */
                          linear-gradient(1turn, rgba(159, 219, 252, 0.25) 3%, transparent 0); /* 调整网格颜色 */
    background-size: 20px 20px; /* 网格大小 */
    border-radius: 24px; /* 圆角 */
    position: relative; /* 添加相对定位 */
}

#text-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: skew(5deg); /* 修正倾斜 */
    text-align: center; /* 居中文本 */
    white-space: normal; /* 支持换行 */
    word-wrap: break-word; /* 长词语会换行 */
}

@media (max-width: 768px) {
    .text-drawing-animations {
        width: 75%; /* 调整宽度 */
        padding: 25px; /* 调整内边距 */
        margin: 20px auto; /* 调整外边距 */
    }

    .text-drawing-animations::after {
        width: 60px; /* 调整大小 */
        height: 60px; /* 调整大小 */
        right: 20px; /* 调整位置 */
        bottom: -15px; /* 调整位置 */
    }

    .grid-background {
        padding: 30px; /* 调整内边距 */
    }

    #text-container {
        font-size: 14px; /* 调整字体大小 */
    }
}
</style>
