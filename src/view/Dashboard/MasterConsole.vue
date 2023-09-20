<template>
  <div class="MasterConsole">
<!-- 数据   -->
    <n-grid x-gap="12" :cols="4">
      <n-gi>
          <n-card
              title="积分"
              :segmented="{
              content: true,
              footer: 'soft'
            }"
          >
            <template #header-extra>
              <n-tag type="success" :bordered="false">🗺️</n-tag>
            </template>
            <h1>{{enterpriseTotalCredit}}</h1>
            <template #footer>
              <div class="text-sn"><span>总积分：{{enterpriseTotalCredit}}</span> <span><n-button type="success" strong style="margin-left: 60px" @click="toSign">前往签到</n-button></span></div>
            </template>
          </n-card>
      </n-gi>

      <n-gi>
        <n-card
            title="碳排放量"
            :segmented="{
              content: true,
              footer: 'soft'
            }"
        >
          <template #header-extra>
            <n-tag type="info" :bordered="false">🌅</n-tag>
          </template>
          <h1>{{enterpriseTotalEmission}} tCO₂e</h1>
          <template #footer>
            <div class="text-sn"><span>总需碳排放量：{{enterpriseTotalEmission}}</span><span><n-button type="success" strong style="margin-left: 20px" @click="updateEmissionShow = true">更新</n-button></span></div>
          </template>
        </n-card>
      </n-gi>

      <n-gi>
        <n-card
            title="购买碳额度"
            :segmented="{
              content: true,
              footer: 'soft'
            }"
        >
          <template #header-extra>
            <n-tag type="success" :bordered="false">🌇</n-tag>
          </template>
          <h1>{{enterpriseEmissionLimit}}</h1>
          <template #footer>
            <div class="text-sn"><span>总购买碳额度：{{enterpriseEmissionLimit}}</span><n-button type="success" strong style="margin-left: 20px" @click="toBuy">购买碳额度</n-button></div>
          </template>
        </n-card>
      </n-gi>

      <n-gi>
        <n-card
            title="用户余额"
            :segmented="{
              content: true,
              footer: 'soft'
            }"
        >
          <template #header-extra>
            <n-tag type="warning" :bordered="false">🌈</n-tag>
          </template>
          <h1>¥ {{enterpriseBalance}}</h1>
          <template #footer>
            <div class="text-sn">
              <span>用户总余额：{{enterpriseBalance}}</span>
              <n-button type="success" strong style="margin-left: 20px" @click="updateBalanceShow = true">充值</n-button></div>
          </template>
        </n-card>
      </n-gi>

    </n-grid>

<!-- 碳排放量 / 出售碳排放订单量   -->
      <VisitTab/>

    <n-modal
        v-model:show="updateEmissionShow"
        class="custom-card"
        preset="card"
        title="更新碳额度"
        size="huge"
        style="width: 500px"
        :bordered="false"
    >
      <n-form ref="formRef" :model="form" label-width="80" label-placement="left" :rules="rules">
        <n-form-item label="企业地址" path="address">
          <n-input v-model:value="form.address" placeholder="请输入企业地址" disabled/>
        </n-form-item>
        <n-form-item label="总排放量" path="count">
          <n-input-number v-model:value="form.count" placeholder="请输入总需排放数量"/>
        </n-form-item>
      </n-form>
      <div style="text-align: center">
        <n-button style="margin-right: 20px" type="success" strong secondary @click="updateEmissions">更新</n-button>
        <n-button type="error" strong secondary @click="updateEmissionShow = false">取消</n-button>
      </div>
    </n-modal>

    <n-modal
        v-model:show="updateBalanceShow"
        class="custom-card"
        preset="card"
        title="用户充值界面"
        size="huge"
        style="width: 500px"
        :bordered="false"
    >
      <n-form ref="enterpriseFormRef" :model="enterpriseForm" label-width="80" label-placement="left" :rules="rules">
        <n-form-item label="企业地址" path="enterpriseName">
          <n-input v-model:value="enterpriseForm.enterpriseName" placeholder="请输入企业名称" disabled/>
        </n-form-item>
        <n-form-item label="更新余额" path="enterpriseBalance">
          <n-input-number v-model:value="enterpriseForm.enterpriseBalance" placeholder="请输入总用户余额"/>
        </n-form-item>
      </n-form>
      <div style="text-align: center">
        <n-button style="margin-right: 20px" type="success" strong secondary @click="updateBalances">确认</n-button>
        <n-button type="error" strong secondary @click="updateBalanceShow = false">取消</n-button>
      </div>
    </n-modal>

  </div>
</template>

<script setup>
import VisitTab from "./Chart/VisitTab.vue"
import {getEnterpriseInfo, updateEnterpriseTotalEmission,updateBalance} from "../../api/enterprise.js";
import {
  getQualificationInfo
} from "../../api/qualification.js";
import {useRouter} from "vue-router";
import {getTotalTxAndEmission} from "../../api/data.js";

const updateEmissionShow = ref(false)
const updateBalanceShow = ref(false)
const form = ref({})
const enterpriseForm = ref({})
const formRef = ref()
const enterpriseFormRef = ref()
const enterpriseTotalEmission = ref(0)
const enterpriseTotalCredit = ref(0)
const enterpriseOverEmission = ref(0)
const enterpriseEmissionLimit = ref(0)
const enterpriseBalance = ref(0)
const router = useRouter()
const rules = reactive({
  address:{
    required: true,
    trigger: ['blur','input'],
    message: "请输入企业账户地址"
  },
  count: {
    required: true,
    type: 'number',
    trigger: ['blur','change'],
    message: "请输总需排放数量"
  },
  enterpriseBalance: {
      required: true,
      type: 'number',
      trigger: ['blur','change'],
      message: "请输总用户余额"
    }
})

onMounted(() => {
  const enterprise = JSON.parse(localStorage.getItem("user")).nickName
  enterpriseForm.value.enterpriseName = enterprise
  getEnterpriseInfo({enterprise: enterprise}).then(res => {
    form.value.address = res.enterprise.enterprise_address
    enterpriseTotalEmission.value = res.enterprise.enterprise_total_emission
    enterpriseTotalCredit.value = res.enterprise.enterprise_carbon_credits
    enterpriseOverEmission.value = res.enterprise.enterprise_over_emission
    enterpriseBalance.value = res.enterprise.enterprise_balance

  })
  getQualificationInfo({enterprise: enterprise}).then(res => {
    enterpriseEmissionLimit.value = res.data.qualificationEmissionLimit
  })
})

function updateEmissions(){
  formRef.value?.validate((errors) => {
    if (!errors) {
      updateEnterpriseTotalEmission({
        address: form.value.address,
        count: form.value.count
      }).then(res => {
        window.$message.success(res.msg)
        updateEmissionShow.value = false
        setTimeout(()=>{
          window.location.reload();
        },250)
      })
    } else {
      window.$message.error("请输入总需排放数量")
    }
  });
}

function updateBalances() {
    enterpriseFormRef.value?.validate((errors) => {
    if(!errors){
      updateBalance(enterpriseForm.value).then(res => {
        window.$message.success(res.msg)
        updateBalanceShow.value = false
        enterpriseForm.value.enterpriseBalance = 0
        setTimeout(()=>{
          window.location.reload();
        },250)
      })
    }else {
        window.$message.error("请输入金额")
    }
  });
}

getTotalTxAndEmission().then(res => {
  console.log(res)
})

function toSign(){
  router.push("/PersonalHome/WorkConsole")
}

function toBuy(){
  router.push("/PersonalHome/BuyCarbon")
}
</script>

<style scoped lang='less'>
.n-card {
  margin-bottom: 30px;
  height: 221px;
  border-radius: 20px;
}
.text-sn{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.n-card:hover {
  border: 0px solid #fff;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
}
</style>
