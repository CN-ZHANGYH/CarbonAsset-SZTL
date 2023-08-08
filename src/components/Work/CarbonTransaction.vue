<template>
    <n-row :gutter="12">
        <n-col :span="6" :offset="17">
            <div class="container">
                <n-input type="text" class="input-box" placeholder="请输入"  v-model:value="searchValue"/>
                <n-button type="success" strong secondary class="button" @click="search">搜索</n-button>
            </div>

        </n-col>
    </n-row>
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
const searchValue = ref("")

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


function search(){

}


</script>

<style lang="less" scoped>
.n-space {
  height: 460px;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

</style>
