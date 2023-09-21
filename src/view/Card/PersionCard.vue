<template>
  <n-grid x-gap="12" :cols="4">
    <n-gi :span="12">
      <n-card style="height: 80px;border-radius: 20px" hoverable>
        <n-descriptions column="4">
          <n-descriptions-item label="拥有卡片">
            {{total}}
          </n-descriptions-item>
          <n-descriptions-item label="我的收藏">
            {{0}}
          </n-descriptions-item>
          <n-descriptions-item label="我的积分">
            {{enterprise.enterprise_carbon_credits}}
          </n-descriptions-item>
          <n-descriptions-item label="已拥有/已收藏">
            <n-space><n-switch v-model:value="showPath" @change="changeSubmit"/></n-space>
          </n-descriptions-item>
        </n-descriptions>
      </n-card>
    </n-gi>
    <n-card>

    </n-card>

    <n-gi v-for="item in data">
      <div class="box_container">
        <div class="box_title">
          <h1 style="color: #121212;font-family: 'Heiti SC'">{{item.name}}</h1>
          <n-popover :overlap="overlap" placement="right-start" trigger="click">
            <template #trigger>
              <h4 style="color:#848484;" @click="">View all</h4>
            </template>
            <div>
              <n-descriptions column="1" label-placement="left" style="width: 200px;height: 200px;margin-top: 10px;margin-left: 10px">
                <n-descriptions-item label="卡片名称">
                  {{item.name}}
                </n-descriptions-item>
                <n-descriptions-item label="卡片寄语">
                  {{item.description}}
                </n-descriptions-item>
                <n-descriptions-item label="卡片等级">
                  <n-rate readonly :default-value="item.level" />
                </n-descriptions-item>
                <n-descriptions-item label="积分">
                  {{item.credit}}
                </n-descriptions-item>
              </n-descriptions>
            </div>
          </n-popover>
        </div>
        <div class="box">
          <div class="image-container">
            <img :src="item.url" class="img">
            <div class="image-overlay"></div>
          </div>
          <div class="box_text text_back">
            <n-rate readonly :default-value="item.level" />
          </div>
        </div>
        <div class="box_button">
          <n-button class="heart" :bordered="false" type="info" @click="listSubmit(item.id)">
            <img src="../../assets/aixing.png" alt="取消收藏">
          </n-button>
        </div>
      </div>
    </n-gi>

    <n-gi :span="12" :offset="1.5" style="margin-top: 5%">
      <n-pagination
          v-model:page="form.pageNum"
          v-model:page-size="form.pageSize"
          show-size-picker
          :item-count="total"
          :page-sizes="pageSizes"
          :on-update-page="onChange"
          :on-update-page-size="onUpdatePageSize"
      />
    </n-gi>
  </n-grid>
<!-- 收藏纪念卡 -->
  <n-modal
      v-model:show="showModal"
      class="custom-card"
      preset="card"
      style="width: 600px"
      title="注意"
      size="huge"
      :bordered="false"
      :segmented="segmented"
  >
    <n-alert type="info" :bordered="false">
      请确认是否收藏纪念卡
    </n-alert>
    <br>
    <div style="text-align: center">
      <n-button style="margin-right: 30px" type="success" size="large" strong secondary @click="handlerCollect">收藏</n-button>
      <n-button type="error" size="large"  strong secondary @click="showModal = !showModal">取消</n-button>
    </div>
  </n-modal>

<!-- 取消纪念卡 -->
  <n-modal
      v-model:show="showCancel"
      class="custom-card"
      preset="card"
      style="width: 600px"
      title="注意"
      size="huge"
      :bordered="false"
      :segmented="segmented"
  >
    <n-alert type="info" :bordered="false">
      请确认是否取消该纪念卡收藏
    </n-alert>
    <br>
    <div style="text-align: center">
      <n-button style="margin-right: 30px" type="success" size="large" strong secondary @click="handlerCancel">确定</n-button>
      <n-button type="error" size="large"  strong secondary @click="showCancel = !showCancel">取消</n-button>
    </div>
  </n-modal>
</template>

<script setup>
import {getCardList, getCardListByEnterpriseName} from "../../api/souvenir.js";
import {getEnterpriseCollectCard, getEnterpriseHasCardList} from "../../api/card.js";
const showModal = ref(false)
const showCancel = ref(false)
const overlap = ref(false)
const data = ref([])
const item = ref({})
const total = ref(0)
const form = ref({
  pageNum: 1,
  pageSize: 8
})
const enterprise = ref({})
const showPath=ref(false)

const itemId = ref(0)


function getList() {
  window.$loadingBar.start()
  getCardList(form.value).then(res => {
    console.log(res)
    data.value = res.rows
    total.value = res.total
    window.$loadingBar.finish()
  })
}

// 页数
const pageSizes = [
  {
    label: "8 每页",
    value: 8
  },
  {
    label: "16 每页",
    value: 16
  },
  {
    label: "24 每页",
    value: 24
  }
];
// 分页数据改变
const onChange = (page) => {
  form.value.page = page
  getList()
}
const onUpdatePageSize = (pageSize) => {
  form.value.pageSize = pageSize
  form.value.page = 1
  getList()
}
getList()
function listSubmit(id) {
  showModal.value = true;
  console.log(id);
  this.itemId = id;
}
function handlerCollect(){
  showModal.value  = false
  const enterprise_id = JSON.parse(localStorage.getItem("user")).nickName;
  const card_id = itemId.value;
  getEnterpriseCollectCard({enterprise_id,card_id}).then(res => {
    console.log(res)
  })
  // console.log('确定收藏',enterprise_id,card_id);
}

function CancelSubmit(itemId) {
  showCancel.value = true;
  console.log(itemId);
}
function handlerCancel(){
  showCancel.value  = false
  console.log('取消收藏',itemId.value);
  // getEnterpriseCollectCard()
}


function changeSubmit(){
  const enterprise = JSON.parse(localStorage.getItem("user")).nickName
  if (showPath.value){
    getEnterpriseHasCardList({enterprise: enterprise}).then(res => {
      data.value = res.data
    })
  }else {
    getCardListByEnterpriseName({name:enterprise}).then(res => {
      data.value = res.data
    })
  }
}

onMounted(()=> {
  const enterprise = JSON.parse(localStorage.getItem("user")).nickName
  getCardListByEnterpriseName({name:enterprise}).then(res => {
    console.log(res.data)
    data.value = res.data
  })
})
</script>

<style scoped lang="less">
.box_container {
  position: relative;
  width: 250px;
  height: 320px;
  margin-top:7%;
  background: #fff;
  padding: 25px;
  border-radius: 30px;
  margin-left: 40px;
  transition: box-shadow 0.3s ease; /* 添加过渡效果 */
}

.box_title {
  display: flex;
  justify-content: space-between;
  align-items:flex-end;
  margin-bottom: 20px;
}

.box {
  display: flex;
  justify-content: center;
  height: 240px;
  width: 200px;
  margin-left: 10%;
  border-radius: 23px;
  background: #E9E9E9;
  transition: box-shadow 0.3s ease; /* 添加过渡效果 */
}

.box_text {
  position:absolute;
  top: 50%;
  display: flex;
  justify-content: space-between;
}

.text_back {
  top: 76%;
  h4 {
    color:#121212;
    margin-left: 10px;
  }
  h4:first-child {
    margin-right: 40px;
  }
}

.box_button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -20px;
  .back {
    width: 90px;
    height: 40px;
    border-radius: 18px;
    border:0px;
    background-color: #000;
    color: #fff;
    margin-right: 10px;
  }

  .heart {
    position: relative;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 15px;
    background: #0DB7B7;
    img {
      position: absolute;
      left: 50%;
      transform: translate(-50%,0%);
      height: 15px;
      width: 15px;
      transition: box-shadow 0.1s ease; /* 添加过渡效果 */

    }
    img:hover {
      height: 16px;
      width: 16px;
    }
  }
}

.image-container {
  position: relative;
  width: 200px; /* 调整为实际大小 */
  height: 180px; /* 调整为实际大小 */
  overflow: hidden;
  border-radius: 25px; /* 添加圆角 */
}

.box:hover {
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3); /* 鼠标经过时的阴影效果 */
}

.box_container:hover {
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3); /* 鼠标经过时的阴影效果 */
}

.image-container img {
  width: 200px;
  height: 180px;
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

.popover-grid {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-gap: 12px;
  justify-content: center;
  align-items: center;
}

.float {
  position:fixed;
  left: 95%;
  top: 20%;
  width: 80px;
  height: 80px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px #ddd;
  .text {
    text-align: center;
    font-size: 16px;
    font-weight: 800;
  }
}
#favorite-btn:active {
  background-color: #19AAA9;
  color: white;
}
</style>

