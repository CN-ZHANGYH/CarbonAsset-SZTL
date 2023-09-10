<template>
<!--  搜索 -->
    <n-row :gutter="12">
        <n-col :span="6" :offset="19">
          <div class="container">
            <n-input placeholder="请输入搜索内容" round  v-model:value="searchValue" clearable>
              <template #prefix>
                <n-button quaternary circle type="success" @click="search">
                  <template #icon>
                    <n-icon :component="Search" />
                  </template>
                </n-button>
              </template>
            </n-input>
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
import { Search } from '@vicons/ionicons5'
import {getEnterpriseTxList, getEnterpriseTxRecord} from "../../api/transaction.js";
import {NPopover, NTag} from "naive-ui";
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
            render(row) {
            return h(
                NTag,
                {
                  type: 'success',
                  bordered: false,
                },
                {
                  default: () =>  row.txHash
                }
            );
          }
        },
        {
            title: "买家地址",
            key: "buyAddress",
            render(row) {
              return h(
                  {

                  }
              );
            }
        },
        {
            title: "卖家地址",
            key: "sellerAddress",
            render: (row) => ellipsisText(row.sellerAddress, 20)
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

<style scoped lang="less">
@import "../../assets/css/search";
</style>
