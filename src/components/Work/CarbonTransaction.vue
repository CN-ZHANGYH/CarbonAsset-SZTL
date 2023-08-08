<template>
  <n-space vertical :size="12">
    <n-data-table
        :bordered="false"
        :columns="columns"
        :data="txData"
    />
  </n-space>
</template>

<script setup>

import {getEnterpriseTxList} from "../../api/transaction.js";
const txData = ref([])
const columns = reactive(
    [
        {
            title: "交易ID",
            key: "transactionId"
        },
        {
            title: "交易名称",
            key: "transactionOrderName"
        },
        {
            title: "交易Hash",
            key: "txHash"
        },
        {
            title: "买家地址",
            key: "buyAddress"
        },
        {
            title: "卖家地址",
            key: "sellerAddress"
        },
        {
            title: "交易数量",
            key: "transactionQuantity"
        },
        {
            title: "交易时间",
            key: "transactionTime"
        }
    ]
)

const enterprise = JSON.parse(localStorage.getItem("user")).nickName
getEnterpriseTxList({enterprise: enterprise}).then(res => {
    txData.value = res.data
})

</script>

<style lang="less" scoped>
.n-space {
  height: 460px;
}
</style>
