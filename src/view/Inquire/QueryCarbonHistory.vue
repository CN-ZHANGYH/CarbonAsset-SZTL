<template>
  <n-card title="碳排放记录">
    <CarbonSchedule/>
  </n-card>
</template>

<script lang="ts">
import CarbonSchedule from "../../components/Work/CarbonSchedule.vue"
import {defineComponent, ref} from "vue";
export default defineComponent({
  components: {
    CarbonSchedule,
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
