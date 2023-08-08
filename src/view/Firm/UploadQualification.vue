<template>
  <n-card title="企业上传资质流程图">
      <Stepts1 :nowStep="nowStep"/>
  </n-card>

  <n-card title="填写企业信息" class="write">
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
        show.value = true
        if (res.enterprise.enterprise_verified == 1){
            getQualificationInfo({enterprise: nickName}).then(res => {
                qualification.value = res.data
                showUploadQua.value = false
                showQueryQua.value = true
                nowStep.value = 3
            })
        }else {
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
