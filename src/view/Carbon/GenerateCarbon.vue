<template>
  <n-grid x-gap="12" :cols="2">
    <n-gi>
      <n-card
          title="碳排放申请进度"
          :segmented="{
          content: true,
          footer: 'soft'
        }"
          >
        <template #footer></template>
        <ApplyCarbon/>
      </n-card>
    </n-gi>
    <n-gi>
      <n-card
          title="碳排放申请完成"
          :segmented="{
          content: true,
          footer: 'soft'
        }"
      >
        <template #footer></template>
        <SuccessCarbon/>
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script lang="ts">
import ApplyCarbon from "../../components/Carbon/ApplyCarbon.vue"
import SuccessCarbon  from "../../components/Carbon/SuccessCarbon.vue";
import {defineComponent, ref} from "vue";
export default defineComponent({
  components: {
    ApplyCarbon,SuccessCarbon
  },
  setup() {
    return {
      inverted: ref(false)
    }
  }
})
</script>

<style scoped lang="less">
.n-card {
  height: 800px;
  //margin-bottom: 100px;
}
</style>
