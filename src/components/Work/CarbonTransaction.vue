<template>
<!--  搜索 -->
    <n-row :gutter="12">
        <n-col :span="6" :offset="17">
            <div class="container">
                <n-input type="text" class="input-box" placeholder="请输入"  v-model:value="searchValue"/>
                <n-button type="success" strong secondary class="button" @click="search">搜索</n-button>
            </div>

        </n-col>
    </n-row>
<!--  表单 -->
  <n-space vertical :size="12">
    <n-data-table
        :bordered="false"
        :columns="columns"
        :data="txData"
        :pagination="paginationReactive"
    >
    </n-data-table>
  </n-space>
</template>

<script setup>
import {getEnterpriseTxList, getEnterpriseTxRecord} from "../../api/transaction.js";
const txData = ref([])
const searchValue = ref("")

// 省略
function ellipsisText(text, maxLength) {
  if (text.length > maxLength) {
    const leftLength = Math.floor((maxLength - 3) / 2); // 左侧保留字符数
    const rightLength = maxLength - 3 - leftLength; // 右侧保留字符数
    return text.slice(0, leftLength) + "..." + text.slice(-rightLength);
  } else {
    return text;
  }
}

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
            key: "txHash",
            render: (row) => ellipsisText(row.txHash, 8)
        },
        {
            title: "买家地址",
            key: "buyAddress",
            render: (row) => ellipsisText(row.buyAddress, 10)
        },
        {
            title: "卖家地址",
            key: "sellerAddress",
            render: (row) => ellipsisText(row.sellerAddress, 10)
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

const paginationReactive = reactive({
  page: 1,
  pageSize: 13,
  showSizePicker: false,
  pageSizes: [10, 20, 30],
  onChange: (page) => {
    paginationReactive.page = page;
  },
  onUpdatePageSize: (pageSize) => {
    paginationReactive.pageSize = pageSize;
    paginationReactive.page = 1;
  }
});


getEnterpriseTxList({
  page: paginationReactive.page,
  pageSize: paginationReactive.pageSize,
  enterprise: enterprise
}).then(res => {
  if (res.total != 0) {
    txData.value = res.rows
  }
  window.$message.success(res.msg)
})

function search(){
  const enterprise = JSON.parse(localStorage.getItem("user")).nickName
  console.log(enterprise)
  getEnterpriseTxRecord({enterprise:enterprise,quality: searchValue.value}).then(res => {
    if (res.total != 0){
      txData.value = res.rows
    }
    window.$message.success(res.msg)
  })
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
