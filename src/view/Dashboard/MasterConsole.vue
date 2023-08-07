<template>
  <div class="MasterConsole">
<!-- 数据   -->
    <n-grid x-gap="12" :cols="4">
      <n-gi>
          <n-card
              title="积分"
              :segmented="{
              content: true,
              footer: 'soft'
            }"
          >
            <template #header-extra>
              <n-tag type="success">日</n-tag>
            </template>
            <h1>0</h1>
            <template #footer>
              <div class="text-sn">总积分：<span>11,991</span></div>
            </template>
          </n-card>
      </n-gi>

      <n-gi>
        <n-card
            title="碳排放量"
            :segmented="{
              content: true,
              footer: 'soft'
            }"
        >
          <template #header-extra>
            <n-tag type="info">周</n-tag>
          </template>
          <h1>11 tCO₂e</h1>
          <template #footer>
            <div class="text-sn">总碳排放量：<span>10,991</span> tCO₂e</div>
          </template>
        </n-card>
      </n-gi>

      <n-gi>
        <n-card
            title="购买碳额度"
            :segmented="{
              content: true,
              footer: 'soft'
            }"
        >
          <template #header-extra>
            <n-tag type="success">日</n-tag>
          </template>
          <h1>78</h1>
          <template #footer>
            <div class="text-sn">总购买碳额度：<span>100</span></div>
          </template>
        </n-card>
      </n-gi>

      <n-gi>
        <n-card
            title="出售碳排放订单量"
            :segmented="{
              content: true,
              footer: 'soft'
            }"
        >
          <template #header-extra>
            <n-tag type="info">周</n-tag>
          </template>
          <h1>8</h1>
          <template #footer>
            <div class="text-sn">出售总碳排放订单量：<span>10</span>个</div>
          </template>
        </n-card>
      </n-gi>

    </n-grid>

<!-- 碳排放量 / 出售碳排放订单量   -->
      <VisitTab/>

  </div>
</template>

<script lang="ts">
import VisitTab from "./Chart/VisitTab.vue"
import {defineComponent, ref} from "vue";
export default defineComponent({
  components: {
    VisitTab,
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
  margin-bottom: 30px;
}

</style>
