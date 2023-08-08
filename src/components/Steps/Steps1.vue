<template>
  <n-space vertical>
      <n-steps :current="nowStep" status="process">
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

<script setup>
const props = defineProps({
    nowStep: Number
})
const {nowStep} = toRefs(props)

</script>

<style lang="less" scoped>
.n-space {
  margin-top: 20px;
  margin-left: 20px;
}
</style>
