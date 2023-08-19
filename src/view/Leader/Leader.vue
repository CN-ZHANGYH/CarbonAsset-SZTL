<template>
  <n-card title="排行榜">
    <n-tabs type="line" animated>
      <n-tab-pane name="碳排放排名" tab="🌍碳排放排名">
        <CarbonEmission/>
      </n-tab-pane>
      <n-tab-pane name="碳积分排名" tab="⭐碳积分排名">
        <CarbonIntegral/>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup>
import CarbonEmission from "../../components/LeaderRanking/CarbonEmission.vue";
import CarbonIntegral from "../../components/LeaderRanking/CarbonIntegral.vue";

import {defineComponent, ref} from "vue";
</script>

<style scoped>
.n-card {
  height: auto;
  margin-bottom: 80px;
}
</style>
