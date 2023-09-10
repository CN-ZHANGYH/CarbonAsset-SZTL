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
          <n-descriptions-item label="更多">
            {{10}}
          </n-descriptions-item>
        </n-descriptions>
      </n-card>
    </n-gi>
    <n-card>

    </n-card>
<!--    <n-gi v-for="item in data">-->
<!--        <div class="box_container">-->
<!--            <div class="box_title">-->
<!--                <h1 style="color: #121212">{{item.name}}</h1>-->
<!--                <n-popover :overlap="overlap" placement="right-start" trigger="click">-->
<!--                    <template #trigger>-->
<!--                        <h4 style="color:#848484;" @click="">View all</h4>-->
<!--                    </template>-->
<!--                    <div>-->
<!--                        <n-descriptions column="1" label-placement="left" style="width: 200px;height: 200px;margin-top: 10px;margin-left: 10px">-->
<!--                            <n-descriptions-item label="卡片名称">-->
<!--                              {{item.name}}-->
<!--                            </n-descriptions-item>-->
<!--                            <n-descriptions-item label="卡片寄语">-->
<!--                                {{item.description}}-->
<!--                            </n-descriptions-item>-->
<!--                            <n-descriptions-item label="卡片等级">-->
<!--                              <n-rate readonly :default-value="item.level" />-->
<!--                            </n-descriptions-item>-->
<!--                            <n-descriptions-item label="积分">-->
<!--                              {{item.credit}}-->
<!--                            </n-descriptions-item>-->
<!--                            <n-descriptions-item label="卡片寄语">-->
<!--                              {{item.description}}-->
<!--                            </n-descriptions-item>-->
<!--                        </n-descriptions>-->
<!--                    </div>-->
<!--                </n-popover>-->
<!--            </div>-->
<!--            <div class="box">-->
<!--                <div class="image-container">-->
<!--                    <img :src="item.url" class="img">-->
<!--                    <div class="image-overlay"></div>-->
<!--                </div>-->
<!--                <div class="box_text text_back">-->
<!--                    <n-rate readonly :default-value="item.level" />-->
<!--                    <h4>{{item.credit}} 积分</h4>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="box_button">-->
<!--                <n-button :bordered="false" type="success" class="back" @click="openEchange(item)">兑换</n-button>-->
<!--                <n-button class="heart" :bordered="false" type="info"  @click="collect(item)">-->
<!--                    <img src="../../assets/aixing.png" alt="添加收藏" >-->
<!--                </n-button>-->
<!--            </div>-->
<!--        </div>-->
<!--    </n-gi>-->

    <n-gi v-for="item in data">
        <div class="box_container">
            <div class="box_title">
              <img :src="item.url" alt="">
            </div>
            <div class="box_main">
              <h2>{{item.name}}</h2>
              <p>{{item.description}}</p>
            </div>
            <div class="box_footer"></div>
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
const isCollect = ref(false)
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
        card_id: item.id,
        isCollect: isCollect.value
    }).then(res => {
      if (res.code === 200) {
        document.querySelector('.heart').style.backgroundColor = 'red'; // 设置按钮背景颜色为红色
      }
        window.$message.success(res.msg)
      console.log(res)
    })
}
</script>

<style scoped lang="less">
.box_container {
  width: 300px;
  height: 400px;
  background: #fff;
  border-radius: 20px;
  margin: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.box_title {
  width: 280px;
  height: 140px;
  margin-top: 10px;
  margin-bottom: 5px;
  img {
    border-radius: 20px;
    width: 100%;
    height: 100%;
  }
}

.box_main {
  width: 260px;
  height: 160px;
  background: pink;
  h2 {
    color: #000;
  }
}

.box_footer {
  width: 280px;
  height: 80px;
  background: green;

}
</style>
