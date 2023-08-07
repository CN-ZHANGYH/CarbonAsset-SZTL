<template>
  <n-card title="排行榜">
    <n-tabs type="line" animated>
      <n-tab-pane name="碳排放排名" tab="碳排放排名">
        <CarbonEmission/>
      </n-tab-pane>
      <n-tab-pane name="碳积分排名" tab="碳积分排名">
        <CarbonIntegral/>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script lang="ts">
import CarbonEmission from "../../components/LeaderRanking/CarbonEmission.vue";
import CarbonIntegral from "../../components/LeaderRanking/CarbonIntegral.vue";

import {defineComponent, ref} from "vue";
export default defineComponent({
  components: {
    CarbonEmission,CarbonIntegral
  },
  setup() {
    return {
      inverted: ref(false),
    }
  }
})
</script>

<style scoped>
.n-card {
  height: 100vh;
  margin-bottom: 80px;
}
</style>
