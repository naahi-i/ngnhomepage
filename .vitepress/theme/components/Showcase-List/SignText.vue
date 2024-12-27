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
                const fontSize = window.innerWidth <= 768 ? 35 : 100;
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
    width: calc(65vw * 0.95);
    height: auto; /* 高度自动 */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden; /* 超出部分隐藏 */
    background-color: var(--foreground-color); /* 白色背景 */
    border-radius: 24px; /* 圆角 */
    box-shadow: 0 4px 8px rgba(var(--blue-shadow-color), 0.3); /* 阴影 */
    position: relative; /* 相对定位 */
    margin: 50px auto 50px;
}

.text-drawing-animations::after {
    content: '';
    position: absolute;
    bottom: -35px;
    right: 30px;
    width: 120px;
    height: 120px;
    background: url('../img/gamelogo.png') no-repeat center center;
    background-size: contain;
}

.grid-background {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(90deg, rgba(159, 219, 252, 0.25) 3%, transparent 0), /* 调整网格颜色 */
                          linear-gradient(1turn, rgba(159, 219, 252, 0.25) 3%, transparent 0); /* 调整网格颜色 */
    background-size: 20px 20px; /* 网格大小 */
    border-radius: 24px; /* 圆角 */
    position: relative; /* 添加相对定位 */
    margin: 50px;

}

#text-container {
    width: 100%;
    display: flex;
    margin: 50px;
    justify-content: center;
    align-items: center;
}

@media (max-width: 768px) {
    .text-drawing-animations {
        width: 90vw;
        margin: 20px auto 20px;
    }

    .text-drawing-animations::after {
        width: 60px;
        height: 60px;
        right: 20px;
        bottom: -15px;
    }

    .grid-background {
        margin: 25px 15px;
    }

    #text-container {
        margin: 25px 0;
        font-size: 14px;
    }
}
</style>
