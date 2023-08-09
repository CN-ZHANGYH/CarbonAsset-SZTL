<template>
    <n-carousel
            :key="effectRef"
            :effect="effectRef"
            :centered-slides="isCard"
            :slides-per-view="isCard ? 'auto' : 1"
            draggable
            style="height: 320px;margin-bottom: 20px"
    >
        <n-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
            <img
                    class="carousel-img"
                    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
            >
        </n-carousel-item>
        <n-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
            <img
                    class="carousel-img"
                    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
            >
        </n-carousel-item>
        <n-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
            <img
                    class="carousel-img"
                    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
            >
        </n-carousel-item>
        <n-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
            <img
                    class="carousel-img"
                    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
            >
        </n-carousel-item>
    </n-carousel>
    <n-grid :x-gap="12" :y-gap="8" :cols="4">
        <n-grid-item>
            <n-card class="card-container" hoverable>
                <img src="../../assets/img/city.png" alt="" style="width: 135px;">
                <div class="text">
                    <h1>冰箱</h1>
                    <h3>出售价格：¥50</h3>
                    <p>描述xxxxxxxxxxxx</p>
                </div>
                <div class="button">
                    <n-button>购买</n-button>
                </div>
            </n-card>
        </n-grid-item>
    </n-grid>

</template>


<script setup>
import {getAllSellerAssetList} from "../../api/asset.js";

const effectRef = ref("card");
const isCardRef = computed(() => effectRef.value === "card");
const isCard = isCardRef
const effects = reactive(
    ["slide", "fade", "card"]
)



getAllSellerAssetList().then(res => {
    console.log(res)
})
</script>

<style scoped lang="less">
.n-grid {
  height: 100vh;
}
.card-container {
  border-radius: 20px;
  height: 200px;
  img {
    width: 100px;
    height: 100px;
    float: right;
  }
  .text {
    line-height: 40px;
  }
  .n-button {
    margin-right: 10px;
    float: right;
  }
}

.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
