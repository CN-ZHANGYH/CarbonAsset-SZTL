<template>
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
import { Search } from '@vicons/ionicons5'
import {getEnterpriseEmissionList, getEnterpriseEmissionResourceOfValue} from "../../api/emissionresource.js";
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
          key: "emissionTime",
          render(row) {
            return h(
                NTag,
                {
                  type: row.emissionTime == null ? 'error' : 'success',
                  bordered: false
                },
                {
                  default: () => row.emissionTime == null ? '暂无排放时间' : row.emissionTime
                }
            );
          }
        }
    ]
)


function search(){
  const enterprise  = JSON.parse(localStorage.getItem("user")).nickName
  getEnterpriseEmissionResourceOfValue({enterprise: enterprise,method: searchValue.value}).then(res => {
    if (res.total != 0){
      EmData.value = res.rows
      console.log(res.rows)
    }
    window.$message.success(res.msg)
  })
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
      console.log(res.rows)
  }
  window.$message.success(res.msg)
})

</script>

<style scoped lang="less">
@import "../../assets/css/search";
</style>
