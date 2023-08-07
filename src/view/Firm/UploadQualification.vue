<template>
  <n-card title="企业上传资质流程图">
    <Stepts1/>
  </n-card>

  <n-card title="填写企业信息" class="write">
    <EnterpriseInformation/>
  </n-card>
</template>

<script lang="ts">
import Stepts1 from "../../components/Steps/Steps1.vue"
import EnterpriseInformation from "../../components/Form/EnterpriseInformation.vue"
import {defineComponent, ref} from "vue";
export default defineComponent({
  components: {
    Stepts1,EnterpriseInformation
  },
  setup() {
    return {
      inverted: ref(false)
    }
  }
})
</script>

<style scoped lang='less'>
.n-card {
  height: 180px;
  margin-bottom: 25px;
}
.write {
  height: 450px;
  margin-bottom: 80px;
}
</style>
