<template>
  <n-card title="申请碳排放额度">
    <StepFrom/>
  </n-card>
</template>

<script >
import Step1 from "../../components/Form/stepForm/Step1.vue"
import StepFrom from "../../components/Form/stepForm/stepForm.vue"
import {defineComponent, ref} from "vue";
export default defineComponent({
  components: {
    Step1,StepFrom
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
  height: 600px;
  margin-bottom: 25px;
}

</style>
