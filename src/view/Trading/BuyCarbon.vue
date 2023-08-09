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
    <n-grid :x-gap="12" :cols="4">
        <n-grid-item v-for="(item,index) in productList">
            <div class="card-container" hoverable  >
                <div class="image-container">
                    <img :src="item.image" alt="">

                </div>
                <div>
                    <div class="text">
                        <h2>{{item.title}}</h2>
                        <h4>出售价格：<n-tag type="info">{{item.assetAmount}}</n-tag></h4>
                        <p>{{item.description}}</p>
                    </div>
                    <div class="button">
                        <span>数量：<n-tag type="success">{{item.assetQuantity}}</n-tag></span>
                        <n-button>购买</n-button>
                    </div>
                </div>
            </div>
        </n-grid-item>
    </n-grid>

</template>


<script setup>
import {getAllSellerAssetList} from "../../api/asset.js";

const effectRef = ref("card");
const isCardRef = computed(() => effectRef.value === "card");
const isCard = isCardRef
const productList = ref([])
const effects = reactive(
    ["slide", "fade", "card"]
)

getAllSellerAssetList().then(res => {
    productList.value = res.rows
    console.log(productList.value)
})
</script>

<style scoped lang="less">

.n-grid {
  height: 70vh;
}
.card-container {
  background-color: #fdfdfd;
  width: auto;
  border-radius: 20px;
  height: 200px;
  img {
    width: 200px;
    height: 200px;
    float: left;
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
