<template>
  <div>
    <n-result status="success" title="操作成功" description="预计一天审核结果出来" class="step-result">
      <template #default>
        <div class="information">
          <n-grid cols="2 s:2 m:3 l:3 xl:3 2xl:3" responsive="screen" class="my-1">
            <n-gi>企业名称：</n-gi>
            <n-gi>珠海市区块链有限公司</n-gi>
          </n-grid>
          <n-grid cols="2 s:2 m:3 l:3 xl:3 2xl:3" responsive="screen" class="my-1">
            <n-gi>地址id：</n-gi>
            <n-gi>0x7cf53f4db904ef5b8b21c940af7b5a335a134892</n-gi>
          </n-grid>
          <n-grid cols="2 s:2 m:3 l:3 xl:3 2xl:3" responsive="screen" class="my-1">
            <n-gi>申请碳排放额度：</n-gi>
            <n-gi><span class="money">98</span></n-gi>
          </n-grid>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-center">
          <n-button type="primary" @click="finish" class="mr-4">再转一笔</n-button>
<!--          <n-button @click="prevStep">查看账单</n-button>-->
        </div>
      </template>
    </n-result>
  </div>
</template>

<script lang="ts" setup>
  import { defineEmits } from 'vue';

  const emit = defineEmits(['finish', 'prevStep']);
  function prevStep() {
    emit('prevStep');
  }

  function finish() {
    emit('finish');
  }
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
