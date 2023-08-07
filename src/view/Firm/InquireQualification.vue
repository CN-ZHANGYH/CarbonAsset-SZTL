<template>
  <n-card title="企业基本信息" :segmented="{
      content: true,
      footer: 'soft'
    }">
    <Enterprise/>

    <n-divider />

    <ResetPassword/>

  </n-card>
</template>


<script lang="ts">
import Stepts1 from "../../components/Steps/Steps1.vue"
import ResetPassword from "../../components/Form/ResetPassword.vue"
import Enterprise from "../../components/Form/Enterprise.vue"
import {defineComponent, ref} from "vue";
export default defineComponent({
  components: {
    Stepts1,Enterprise
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
  height: 100vh;
  margin-bottom: 80px;
}
</style>
