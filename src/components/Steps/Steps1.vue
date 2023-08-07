<template>
  <n-space vertical>
    <n-steps :current="(current as number)" :status="currentStatus">
      <n-step
          title="填写企业信息"
          description="填写注册信息、联系方式、企业资质"
      />
      <n-step
          title="等待系统审核"
          description="审核时间约为5个工作日"
      />
      <n-step
          title="完成企业认证"
          description="完成后可进行碳排放申请、碳交易出售购买等等"
      />
    </n-steps>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MdArrowRoundBack, MdArrowRoundForward } from '@vicons/ionicons4'
import { StepsProps } from 'naive-ui'

export default defineComponent({
  components: {
    MdArrowRoundBack,
    MdArrowRoundForward
  },
  setup () {
    const currentRef = ref<number | null>(1)
    return {
      currentStatus: ref<StepsProps['status']>('process'),
      current: currentRef,
      next () {
        if (currentRef.value === null) currentRef.value = 1
        else if (currentRef.value >= 4) currentRef.value = null
        else currentRef.value++
      },
      prev () {
        if (currentRef.value === 0) currentRef.value = null
        else if (currentRef.value === null) currentRef.value = 4
        else currentRef.value--
      }
    }
  }
})
</script>

<style lang="less" scoped>
.n-space {
  margin-top: 20px;
  margin-left: 20px;
}
</style>
