<template>
  <n-card title="企业上传资质流程图">
    <Stepts1/>
  </n-card>

  <n-card title="填写企业信息" class="write">
      <EnterpriseInformation v-if="showUploadQua"/>
      <QualificationInfo :qualification="qualification" v-if="showQueryQua"/>
  </n-card>
</template>

<script setup>
import Stepts1 from "../../components/Steps/Steps1.vue"
import EnterpriseInformation from "../../components/Form/EnterpriseInformation.vue"
import QualificationInfo from "../../components/Info/QualificationInfo.vue";
import {getQualificationInfo} from "../../api/qualification.js";
import {getEnterpriseInfo} from "../../api/enterprise.js";

const showUploadQua = ref(true)
const showQueryQua = ref(false)
const qualification = ref({})

onMounted(() => {
    const nickName = JSON.parse(localStorage.getItem("user")).nickName
    getEnterpriseInfo({enterprise: nickName}).then(res => {
        if (res.enterprise.enterprise_verified == 1){
            showUploadQua.value = false
            showQueryQua.value = true

            getQualificationInfo({enterprise: nickName}).then(res => {
                qualification.value = res.data
            })
        }
    })
})



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
