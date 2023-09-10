<template>
    <n-row :gutter="12">
      <n-col :span="6" :offset="17">
        <div class="container">
          <n-input type="text" class="input-box" placeholder="请输入"  v-model:value="searchValue"/>
          <n-button type="success" strong secondary class="button" @click="search">搜索</n-button>
        </div>

      </n-col>
    </n-row>
    <n-space vertical :size="12" style="height: auto">
      <n-data-table
          :bordered="false"
          :columns="columns"
          :data="data"
          :pagination="paginationReactive"
      />
    </n-space>
</template>

<script setup>
import {getEnterpriseSellerHistory, getEnterpriseSellerRecordOfValue} from "../../api/asset.js";
import {NButton, NTag} from "naive-ui";

const enterprise = JSON.parse(localStorage.getItem("user")).nickName
const data = ref([])
const searchValue = ref("")

const columns = reactive(
    [
      {
        title: "订单ID",
        key: "assetId"
      },
      {
        title: "订单名称",
        key: "title"
      },
      {
        title: "账户地址",
        key: "enterpriseAddress"
      },
      {
        title: "出售数量",
        key: "assetQuantity"
      },
      {
        title: "出售价钱",
        key: "assetAmount"
      },
      {
        title: "出售时间",
        key: "time"
      },
      {
        title: "订单状态",
        key: "status",
        render (row) {
          return h(
              NTag,
              {
                style: {
                  marginRight: '6px'
                },
                type: 'info',
                bordered: false
              },
              {
                default: () => row.status == 1 ? '出售中' : '售空'
              }
          )
        }
      },
      {
        title: '操作',
        key: 'action',
        render(row) {
          return h(
              NButton,
              {
                type: 'success',
                bordered: false,
                storage: true,
                secondary: true
              },
              {
                default: () => '编辑'
              }

          );
        }
      }
    ]
)

const paginationReactive = reactive({
  page: 1,
  pageSize: 10,
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
function search() {
  const enterprise = JSON.parse(localStorage.getItem("user")).nickName
  getEnterpriseSellerRecordOfValue({enterprise: enterprise,quality: searchValue.value}).then(res => {
    if (res.total != 0){
      data.value = res.rows
    }
    window.$message.success(res.msg)
  })
}

getEnterpriseSellerHistory({
  page: paginationReactive.page,
  pageSize: paginationReactive.pageSize,
  enterprise: enterprise
}).then(res => {
  if (res.total != 0){
    data.value = res.rows
  }
  window.$message.success(res.msg)
})
</script>

<style scoped lang="less">
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
</style>
