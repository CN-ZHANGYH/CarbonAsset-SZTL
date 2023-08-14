<template>
  <div class="mt-4">
    <NRow :gutter="24">
      <NCol :span="24">
        <n-card content-style="padding: 0;" :bordered="false">
          <n-tabs type="line" size="large" :tabs-padding="20" pane-style="padding: 20px;">
            <n-tab-pane name="平台碳足迹数据">
              <EmissionChart />
            </n-tab-pane>
            <n-tab-pane name="碳交易">
              <SellChart />
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </NCol>
    </NRow>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import EmissionChart from "./EmissionChart.vue";
import SellChart from "./SellChart.vue";

export default defineComponent({
  components: {SellChart, EmissionChart},
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.mt-4 {
  margin-bottom: 80px;
}
</style>
