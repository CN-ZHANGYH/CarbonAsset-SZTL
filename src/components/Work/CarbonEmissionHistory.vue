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
        :data="EmData"
        :pagination="paginationReactive"
    />
  </n-space>
</template>

<script setup>
import {getEnterpriseEmissionList} from "../../api/emissionresource.js";
import {NTag} from "naive-ui";
const enterprise = JSON.parse(localStorage.getItem("user")).nickName
const searchValue = ref("")
const EmData = ref([])
const columns = reactive(
    [
        {
            title: "记录ID",
            key: "emissionId"
        },
        {
            title: "排放描述",
            key: "description"
        },
        {
            title: "排放方式",
            key: "emissionWay"
        },
        {
            title: "碳排放量",
            key: "emissions"
        },
        {
            title: "排放企业",
            key: "enterpriseAddress"
        },
        {
            title: "状态",
            key: "isApprove",
            render(row){
                return h(
                    NTag,
                    {
                      type: row.isApprove == 0 ? 'error' : 'info',
                      bordered: false
                    },
                    {
                      default: () => row.isApprove == 0 ? '审核中' : '审核通过'
                    }
                )
            }

        },
        {
            title: "排放时间",
            key: "emissionTime"
        }
    ]
)

function search(){

}

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


getEnterpriseEmissionList({
  page: paginationReactive.page,
  pageSize: paginationReactive.pageSize,
  enterprise: enterprise
}).then(res => {
  if (res.total != 0){
    EmData.value = res.rows
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
