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
              <n-tag type="success">日</n-tag>
            </template>
            <h1>{{enterpriseTotalCredit}}</h1>
            <template #footer>
              <div class="text-sn">总积分：<span>{{enterpriseTotalCredit}}</span> <span><n-button type="success" strong style="margin-left: 60px" @click="toSign">前往签到</n-button></span></div>
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
            <n-tag type="info">周</n-tag>
          </template>
          <h1>{{enterpriseOverEmission}} tCO₂e</h1>
          <template #footer>
            <div class="text-sn">总需碳排放量：<span>{{enterpriseTotalEmission}}</span> tCO₂e<span><n-button type="success" strong style="margin-left: 20px" @click="updateEmissionShow = true">更新</n-button></span></div>
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
            <n-tag type="success">日</n-tag>
          </template>
          <h1>{{enterpriseEmissionLimit}}</h1>
          <template #footer>
            <div class="text-sn">总购买碳额度：<span>{{enterpriseEmissionLimit}}</span></div>
          </template>
        </n-card>
      </n-gi>

      <n-gi>
        <n-card
            title="出售碳排放订单量"
            :segmented="{
              content: true,
              footer: 'soft'
            }"
        >
          <template #header-extra>
            <n-tag type="info">周</n-tag>
          </template>
          <h1>8</h1>
          <template #footer>
            <div class="text-sn">出售总碳排放订单量：<span>10</span>个</div>
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
  </div>
</template>

<script setup>
import VisitTab from "./Chart/VisitTab.vue"
import {getEnterpriseInfo, updateEnterpriseTotalEmission} from "../../api/enterprise.js";
import {getQualificationInfo} from "../../api/qualification.js";
import {useRouter} from "vue-router";

const updateEmissionShow = ref(false)
const form = ref({})
const formRef = ref()
const enterpriseTotalEmission = ref(0)
const enterpriseTotalCredit = ref(0)
const enterpriseOverEmission = ref(0)
const enterpriseEmissionLimit = ref(0)
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
  }
})

onMounted(() => {
  const enterprise = JSON.parse(localStorage.getItem("user")).nickName
  getEnterpriseInfo({enterprise: enterprise}).then(res => {
    console.log(res)
    form.value.address = res.enterprise.enterprise_address
    enterpriseTotalEmission.value = res.enterprise.enterprise_total_emission
    enterpriseTotalCredit.value = res.enterprise.enterprise_carbon_credits
    enterpriseOverEmission.value = res.enterprise.enterprise_over_emission

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
      })
    } else {
      window.$message.error("请输入总需排放数量")
    }
  });
}


function toSign(){
  router.push("/PersonalHome/WorkConsole")
}
</script>

<style scoped lang='less'>
.n-card {
  margin-bottom: 30px;
}

</style>
