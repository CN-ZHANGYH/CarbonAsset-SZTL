<template>
  <n-grid x-gap="12" :cols="4">
<!--    <n-gi :span="12">-->
<!--      <n-card style="height: 80px;border-radius: 20px" hoverable>-->
<!--        <n-descriptions column="4">-->
<!--          <n-descriptions-item label="拥有卡片">-->
<!--            {{total}}-->
<!--          </n-descriptions-item>-->
<!--          <n-descriptions-item label="我的收藏">-->
<!--            {{0}}-->
<!--          </n-descriptions-item>-->
<!--          <n-descriptions-item label="我的积分">-->
<!--            {{enterprise.enterprise_carbon_credits}}-->
<!--          </n-descriptions-item>-->
<!--          <n-descriptions-item label="更多">-->
<!--            {{10}}-->
<!--          </n-descriptions-item>-->
<!--        </n-descriptions>-->
<!--      </n-card>-->
<!--    </n-gi>-->
    <n-card>

    </n-card>
    <n-gi v-for="item in data">
        <div class="box_container">
          <div class="image-container">
            <img :src="item.url" class="img">
            <div class="image-overlay"></div>
          </div>
            <div class="box_main">
              <h2>{{item.name}}</h2>
              <p>卡片寄语：{{item.description}}</p>
              <div class="star">
                <span>卡片等级：</span><n-rate readonly :default-value="item.level" />
              </div>
              <button class="Btn" @click="collect(item)">
                <span class="leftContainer">
                  <svg fill="white" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path></svg>
                  <span class="like">喜爱人数</span>
                </span>
                 <span class="likeCount">{{item.liked}}</span>
              </button>
            </div>
          <div class="box_footer">
            <h4>兑换积分：{{item.credit}}</h4>
            <div>
              <n-button type="error" class="exchange" tertiary strong>
                兑换
              </n-button>
            </div>
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
  <n-modal
      v-model:show="showModal"
      type="success"
      preset="dialog"
      title="确认"
      positive-text="兑换"
      negative-text="取消"
      @positive-click="submitCallback"
      @negative-click="showModal = false"
  >
    <n-alert type="info" :bordered="false">
      请确认当前的积分是否足够兑换
    </n-alert>
    <n-descriptions column="1" label-placement="left" style="margin-top: 5%;margin-left: 10%">
      <n-descriptions-item label="企业名称">
        {{creditForm.userName}}
      </n-descriptions-item>
      <n-descriptions-item label="纪念卡名称">
        {{creditForm.cardName}}
      </n-descriptions-item>
    </n-descriptions>
  </n-modal>
</template>

<script setup>
import {getCardList} from "../../api/souvenir.js";
import {creditExchange, enterpriseCollectCard} from "../../api/credit.js";
import {getEnterpriseInfo} from "../../api/enterprise.js";
const showModal = ref(false)
const overlap = ref(false)
const data = ref([])
const item = ref({})
const total = ref(0)
const isCollect = ref(localStorage.getItem('isCollect') === 'true')
const enterprise = ref({})
const form = ref({
    pageNum: 1,
    pageSize: 8
})
const creditForm = ref({})
function getList(){
  window.$loadingBar.start()
  getCardList(form.value).then(res => {
    console.log(res)
    data.value = res.rows
    total.value = res.total
    window.$loadingBar.finish()
  })
}

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


function openEchange(item){
  creditForm.value.cardName = item.name
  creditForm.value.userName = JSON.parse(localStorage.getItem("user")).nickName
  creditForm.value.credit = item.credit
  showModal.value = true
}
function submitCallback(){
  creditExchange(creditForm.value).then(res => {
    window.$message.success(res.msg)
  })
}

onMounted(() => {
  getEnterpriseInfo({enterprise:JSON.parse(localStorage.getItem("user")).nickName}).then(res => {
    enterprise.value = res.enterprise
  })
})

function collect(item){
  isCollect.value = !isCollect.value
  enterpriseCollectCard({
        enterprise_id: enterprise.value.enterprise_id,
        card_id: item.id
    }).then(res => {
      window.$message.success(res.msg)
    })
}


</script>

<style scoped lang="less">
@import "../../assets/css/btnCarbon";
.box_container {
  width: 300px;
  height: 450px;
  background: #fff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: 40px;
  margin-top: 20px;
  margin-bottom: 10px;
}

//.box_title {
//  width: 280px;
//  height: 200px;
//  margin-top: 10px;
//  margin-bottom: 5px;
//  img {
//    border-radius: 20px;
//    width: 100%;
//    height: 100%;
//  }
//  img:hover {
//    transform: scale(1.1);
//  }
//}

.box_main {
  width: 260px;
  height: 180px;
  h2 {
    color: #000;
  }
  p {
    color: #B5B6BB;
    font-weight: 500;
    margin:9px 0;
  }
  .star {
    height: 25px;
    //background: pink;
    line-height: 25px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
}

.box_footer {
  width:260px;
  //background: pink;
  height: 60px;
  border-top: 2px solid #E8E8ED;
}

.box_footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box:hover {
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3); /* 鼠标经过时的阴影效果 */
}

.box_container:hover {
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3); /* 鼠标经过时的阴影效果 */
}

.image-container {
  margin-top: 10px;
  position: relative;
  width: 280px; /* 调整为实际大小 */
  height: 200px; /* 调整为实际大小 */
  overflow: hidden;
  border-radius: 25px; /* 添加圆角 */
}

.image-container img {
  width: 280px;
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

</style>
