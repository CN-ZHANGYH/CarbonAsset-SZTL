<template>
  <n-space vertical :size="12">
    <n-data-table
        :bordered="false"
        :columns="columns"
        :data="data"
        :pagination="paginationReactive"
    />
    <n-modal
        v-model:show="showModal"
        type="success"
        preset="dialog"
        title="确认资源排放"
        positive-text="确认"
        negative-text="取消"
        @positive-click="submitCallback"
        style="width: 500px"
    >
      <n-card hoverable style="margin-top: 5%">
        <n-alert type="success" :bordered="false" style="margin-bottom: 5%">
          请确认排放信息，确认排放后记录将上链
        </n-alert>
        <n-descriptions label-placement="left"  column="1" >
          <n-descriptions-item label="资源类型">
            {{desc.resourceType}}
          </n-descriptions-item>
          <n-descriptions-item label="排放方式">
            {{desc.emissionWay}}
          </n-descriptions-item>
          <n-descriptions-item label="排放描述">
            {{ desc.description }}
          </n-descriptions-item>
          <n-descriptions-item label="账户地址">
            {{ desc.enterpriseAddress }}
          </n-descriptions-item>
          <n-descriptions-item label="审批状态">
            <n-tag v-if="desc.isApprove == 1" type="success" bordered>允许</n-tag>
            <n-tag v-else type="error" bordered>禁止</n-tag>
          </n-descriptions-item>
          <n-descriptions-item label="排放数量">
            {{ desc.emissions }}
          </n-descriptions-item>
        </n-descriptions>
      </n-card>
    </n-modal>
  </n-space>

</template>

<script setup>
import {
  emissionExchange,
  getEnterpriseIsApplyEmission,
} from "../../api/emissionresource.js";
import {NButton, NTag} from "naive-ui";
const showModal = ref(false)
const data = ref([])
const desc = ref({})
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
const columns = reactive([
    {
        title: 'ID',
        key: 'emissionId'
    },
    {
        title: '资源类型',
        key: 'resourceType'
    },
    {
        title: '排放方式',
        key: 'emissionWay'
    },
    {
        title: '描述',
        key: 'description'
    },
    {
        title: '状态',
        key: 'isApprove',
        render(row){
            return h(
                NTag,
                {
                  bordered: false,
                  type: 'success',
                },
                {
                  default: () => '审核完成'
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
            type: 'info',
            bordered: false,
            size: 'small',
            onClick: () => emissionResource(row)
          },
          {
            default: () => '排放'
          }
      )
    }
  }

])
const enterpriseName = JSON.parse(localStorage.getItem("user")).nickName

getEnterpriseIsApplyEmission({
    page: paginationReactive.page,
    pageSize: paginationReactive.pageSize,
    enterprise: enterpriseName
}).then(res => {
    if (res.total != 0){
        data.value = res.rows
    }
    window.$message.success(res.msg)
})

function emissionResource(row){
  showModal.value = true
  desc.value = row
  console.log(desc.value)
}
function submitCallback(){
  emissionExchange({
    enterpriseAddress: desc.value.enterpriseAddress,
    emissionId: desc.value.emissionId,
    emissionLimit: desc.value.emissions
  }).then(res => {
    window.$message.success(res.msg)
  })
}
</script>

<style lang="less" scoped>
.n-space {
  height: 460px;
}
</style>
