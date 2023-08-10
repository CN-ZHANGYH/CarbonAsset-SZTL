<template>
  <div>
    <n-result status="success" title="发送申请通过" description="等待监管机构进行审核" class="step-result">
      <template #default>
        <div class="information">
          <n-descriptions label-placement="left" column="1">
            <n-descriptions-item label="企业名称">
              {{enterprise}}
            </n-descriptions-item>
            <n-descriptions-item label="申请数量">
              {{enterpriseAddress}}
            </n-descriptions-item>
          </n-descriptions>
        </div>
      </template>
    </n-result>
  </div>
</template>

<script  setup>
const props = defineProps({
  enterprise: String,
  enterpriseAddress: Number
})

const {enterprise,enterpriseAddress} = toRefs(props)
</script>

<style lang="less" scoped>
  .step-result {
    max-width: 560px;
    margin: 40px auto 0;

    ::v-deep(.n-result-content) {
      background-color: #fafafa;
      padding: 24px 40px;
    }

    .information {
      line-height: 22px;

      .ant-row:not(:last-child) {
        margin-bottom: 24px;
      }
    }

    .money {
      font-family: 'Helvetica Neue', sans-serif;
      font-weight: 500;
      font-size: 20px;
      line-height: 14px;
    }
  }
</style>
