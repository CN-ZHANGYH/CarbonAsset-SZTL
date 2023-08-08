<template>
  <n-card title="碳交易记录">
    <CarbonTransaction/>
  </n-card>
</template>

<script lang="ts">
import CarbonTransaction from "../../components/Work/CarbonTransaction.vue"
import {defineComponent, ref} from "vue";
export default defineComponent({
  components: {
      CarbonTransaction,
  },
  setup() {
    return {
      inverted: ref(false),
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
