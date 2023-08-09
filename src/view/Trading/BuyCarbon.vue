<template>
    <n-card title="购买碳额度" style="height: 100%">
        <n-grid :x-gap="10" :cols="5">
            <n-grid-item :span="13" :offset="0">
                <div style="text-align: center;">
                    <n-carousel
                        :key="effectRef"
                        :effect="effectRef"
                        :centered-slides="isCard"
                        :slides-per-view="isCard ? 'auto' : 1"
                        draggable
                        style="height: 320px;margin-bottom: 20px;"
                    >
                        <n-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
                            <img
                                class="carousel-img"
                                src="../../assets/img/img_3.png"
                            >
                        </n-carousel-item>
                        <n-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
                            <img
                                class="carousel-img"
                                src="../../assets/img/img_4.png"
                            >
                        </n-carousel-item>
                        <n-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
                            <img
                                class="carousel-img"
                                src="../../assets/img/img_5.png"
                            >
                        </n-carousel-item>
                        <n-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
                            <img
                                class="carousel-img"
                                src="../../assets/img/img_6.png"
                            >
                        </n-carousel-item>
                    </n-carousel>
                </div>
            </n-grid-item>
            <n-grid-item v-for="(item,index) in productList">
                <div class="hello">
                    <div class="box">
                        <div class="image-container">
                            <img :src="item.image" alt=""  class="img">
                            <div class="image-overlay"></div>
                        </div>
                        <div class="text">
                            <div>
                                <h3>{{item.title}}</h3>
                                <p style="color:#878B96">{{item.description}}</p>
                            </div>
                            <div style="margin-top: 10px">
                                <n-tag type="info" bordered="true">数量：{{item.assetQuantity}}</n-tag>
                                <n-tag type="info">单价：{{item.assetAmount}}</n-tag>
                            </div>
                        </div>
                        <div class="footer" style="display: flex; align-items: center;">
                            <img class="tou" style="margin-left: 20px" :src="item.image"/>
                            <div class="name" style="margin-left: 10px;">
                                <n-popover trigger="hover">
                                    <template #trigger>
                                        <h4 style="color:#5752ED;">{{ truncatedString(item.enterpriseAddress) }}</h4>
                                    </template>
                                    <span><n-button type="error" strong secondary>{{ item.enterpriseAddress }}</n-button></span>
                                </n-popover>

                                <h5 style="color: #8B93A1">{{ item.time }}</h5>
                            </div>
                            <n-button type="success" strong  style="margin-left: 30px;">购买</n-button>
                        </div>
                    </div>
                </div>
            </n-grid-item>
        </n-grid>
    </n-card>
</template>


<script setup>
import {getAllSellerAssetList} from "../../api/asset.js";

const effectRef = ref("card");
const isCardRef = computed(() => effectRef.value === "card");
const isCard = isCardRef
const productList = ref([])


getAllSellerAssetList().then(res => {
    productList.value = res.rows
    console.log(productList.value)
})

function truncatedString(val){
    return val.substring(0, 15) + '...';
}
</script>

<style scoped lang="less">

.n-grid {
  height: 90vh;
}
.hello {
    width: auto;
    height: 500px;
    //background: #ffffff;
    //padding: 10px;
}

.box {
    width: 300px;
    height: 400px;
    border-radius: 20px;
    border: 2px solid #EDEDF0;
    /* 添加其他样式属性 */
    transition: box-shadow 0.3s ease; /* 添加过渡效果 */
}
.text {
    height:150px;
    margin-top: 10px;
    padding: 0 30px;
}
.footer {
    height: 5px;
    display: flex;
    //background: #ffffff;
    align-items: center;
}
.tou {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid black;
}

.box:hover {
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3); /* 鼠标经过时的阴影效果 */
}


.image-container {
    position: relative;
    width: 300px; /* 调整为实际大小 */
    height: 200px; /* 调整为实际大小 */
    overflow: hidden;
    border-radius: 20px; /* 添加圆角 */
}

.image-container img {
    width: 300px;
    height: 200px;
    border-bottom: 1px solid;
    border-radius: inherit; /* 继承圆角 */
    transition: transform 0.3s ease;
}

.image-container img:hover {
    transform: scale(1.2);
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    /* 这里可以添加动画样式 */
    animation: your-animation 1s infinite;
}
.carousel-img {
    width: 100%;
    height: 100%;
}
</style>
