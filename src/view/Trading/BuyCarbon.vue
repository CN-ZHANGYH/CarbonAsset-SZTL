<template>
    <n-card title="购买碳额度" style="height: auto">
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
          <n-grid-item :span="10" :offset="2">
            <n-pagination
                v-model:page="queryParam.pageNum"
                v-model:page-size="queryParam.pageSize"
                show-size-picker
                :item-count="total"
                :page-sizes="pageSizes"
                :on-update-page="onChange"
                :on-update-page-size="onUpdatePageSize"
            />
          </n-grid-item>
              <n-grid-item  v-for="(item,index) in productList">
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
                      <n-button type="success" strong  style="margin-left: 30px;" @click="buySubmit(item)">购买</n-button>
                    </div>
                  </div>
                </div>
              </n-grid-item>
        </n-grid>
      <n-modal
          v-model:show="showModal"
          class="custom-card"
          preset="card"
          style="width: 600px"
          title="购买商品"
          size="huge"
          :bordered="false"
          :segmented="segmented"
      >
        <n-form :model="buyForm" label-placement="left" label-width="120px" :rules="rules">
          <n-form-item label="卖家账户地址">
            {{buyForm.sellerAddress}}
          </n-form-item>
          <n-form-item label="当前账户地址">
            {{buyForm.ownerAddress}}
          </n-form-item>
          <n-form-item label="购买数量" path="quality">
            <n-input-number v-model:value="buyForm.quality"  placeholder="请输入购买的数量"/>
          </n-form-item>
        </n-form>
        <div style="text-align: center">
          <n-button style="margin-right: 30px" type="success" size="large" strong secondary @click="handlerBuy">购买</n-button>
          <n-button type="error" size="large"  strong secondary @click="showModal = !showModal">取消</n-button>
        </div>
      </n-modal>
    </n-card>
</template>


<script setup>
import {getAllSellerAssetList} from "../../api/asset.js";
import {buyProduct, getEnterpriseInfo} from "../../api/enterprise.js";

const effectRef = ref("card");
const isCardRef = computed(() => effectRef.value === "card");
const isCard = isCardRef
const maxValue = ref(0)
const enterpriseAddress = ref("")
const show = ref(true)
const productList = ref([])
const total = ref()
const data = reactive({
  buyForm: {},
  queryParam: {
    pageNum: 1,
    pageSize: 10,
    enterpriseId: null,
    enterpriseAddress: null,
    assetQuantity: null,
    assetAmount: null,
    time: null,
    status: null,
    title: null,
    description: null,
    image: null
  },
})
const {queryParam,buyForm} = toRefs(data)

const pageSizes = [
  {
    label: "10 每页",
    value: 10
  },
  {
    label: "20 每页",
    value: 20
  },
  {
    label: "30 每页",
    value: 30
  }
];
const segmented = reactive({
  content: "soft",
  footer: "soft"
})
const showModal = ref(false)
const rules  = reactive({
  quality: {
    required: true,
    trigger: ['blur','change'],
    min: 1,
    type: 'number',
    message: "请输入购买数量,最小为1"
  }
})
// 获取企业信息
getEnterpriseInfo({enterprise: JSON.parse(localStorage.getItem("user")).nickName}).then(res => {
  enterpriseAddress.value = res.enterprise.enterprise_address
})

// 分页数据改变
const onChange = (page) => {
  queryParam.value.page = page
  getList()
}
const onUpdatePageSize = (pageSize) => {
  queryParam.value.pageSize = pageSize
  queryParam.value.page = 1
  getList()
}

// 分页数据刷新并获取
function getList(){
  window.$loadingBar.start()
  getAllSellerAssetList(queryParam.value).then(res => {
    productList.value = res.rows
    total.value = res.total
    window.$loadingBar.finish()
  })
}

getList()


function truncatedString(val){
    return val.substring(0, 15) + '...';
}

function buySubmit(item){
  showModal.value  = true
  buyForm.value.sellerAddress = item.enterpriseAddress
  buyForm.value.ownerAddress = enterpriseAddress.value
  maxValue.value = item.assetQuantity
  buyForm.value.assetId = item.assetId
}

function handlerBuy(){
  if (buyForm.value.quality > maxValue.value){
    window.$message.error("当前库存不足")
    showModal.value = false
    return
  }
  if (buyForm.value.sellerAddress == buyForm.value.ownerAddress){
    window.$message.error("当前不能购买自己的商品")
    showModal.value = false
    return

  }
  // 调用购买的操作
  buyProduct(buyForm.value).then(res => {
    window.$message.success(res.msg)
  })

}
</script>

<style scoped lang="less">

.n-grid {
  height: auto;
}
.hello {
    width: auto;
    height: 500px;
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
