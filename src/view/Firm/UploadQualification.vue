<template>
  <n-card title="企业上传资质流程图">
      <Stepts1 :nowStep="nowStep"/>
  </n-card>

  <n-card title="企业资质信息" class="write">
      <div style="margin-bottom: 10px">
          <n-alert title="完成认证" type="success" v-if="nowStep === 3">
              当前的资质已通过审核，您的资质已经上链
          </n-alert>
          <n-alert title="审核中" type="warning" v-if="nowStep === 2">
              当前的资质已经上传，等待审核中
          </n-alert>
          <n-alert title="未认证" type="error" v-if="nowStep === 1">
              当前企业未认证，需要完整资质认证之后解锁其他操作
          </n-alert>
      </div>
      <n-spin :show="show">
          <EnterpriseInformation v-if="showUploadQua"/>
          <QualificationInfo :qualification="qualification" v-if="showQueryQua"/>
      </n-spin>

  </n-card>
</template>

<script setup>
import Stepts1 from "../../components/Steps/Steps1.vue"
import EnterpriseInformation from "../../components/Form/EnterpriseInformation.vue"
import QualificationInfo from "../../components/Info/QualificationInfo.vue";
import {getQualificationInfo} from "../../api/qualification.js";
import {getEnterpriseInfo} from "../../api/enterprise.js";

const showUploadQua = ref(false)
const showQueryQua = ref(false)
const qualification = ref({})
const show = ref(false)
const nowStep = ref(1)

onMounted(() => {
    refQuaStatus()
})



function refQuaStatus(){
    const nickName = JSON.parse(localStorage.getItem("user")).nickName
    getEnterpriseInfo({enterprise: nickName}).then(res => {
        if (res.enterprise.enterprise_verified == 1){
            getQualificationInfo({enterprise: nickName}).then(qua => {
                qualification.value = qua.data
                showUploadQua.value = false
                showQueryQua.value = true
                nowStep.value = 3
            })
        }else {
            // 这里是企业的认证状态为 0 则是未认证的状态 但是企业上传了需要看到当前的信息以及进度
            getQualificationInfo({enterprise: nickName}).then(qua => {
                if (qua.qualificationVerifiedRegulator != ""){
                    qualification.value = qua.data
                    showUploadQua.value = false
                    showQueryQua.value = true
                    nowStep.value = 2
                }
            })
            showUploadQua.value = true
            showQueryQua.value = false
        }
        show.value = false
    })
}

refQuaStatus()

</script>

<style scoped lang='less'>
.n-card {
  height: 180px;
  margin-bottom: 25px;
}
.write {
  height: auto;
  margin-bottom: 80px;
}
</style>
