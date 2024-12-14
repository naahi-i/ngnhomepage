<template>
    <div class="container">
        <div class="test-box">
            <div class="bgimg">
                <img src="./test.png">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio >= 0.33) {
                console.log('组件三分之一进入视口');
                observer.unobserve(this.$el);
            }
        }, { threshold: [0.33] });
        observer.observe(this.$el);
    }
}
</script>

<style scoped lang="less">
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 80px auto;

    .test-box {
        display: flex;
        border-radius: 24px;
        justify-content: center;
        align-items: center;
        box-shadow: 0 4px 8px rgba(var(--blue-shadow-color), 0.3);
        width: 1100px;
        height: 300px;
        background-color: var(--foreground-color);
        padding: 50px;
        transform: skew(-5deg);

        .bgimg {
            border-radius: 24px;
            width: 100%;
            height: 100%;
            background-color: rgb(197, 147, 87);
        }
    }
}

@media (max-width: 768px) {
    .container {
        margin: 30px auto;

        .test-box {
            width: 75%;
            height: 200px;
            padding: 20px;
        }
    }

}
</style>