<template>
  <n-space vertical :size="12">
    <n-data-table
        :bordered="false"
        :columns="columns"
        :data="data"
        :pagination="paginationReactive"
        style="height:680px"
    />
  </n-space>
</template>

<script setup>
import {getEnterpriseIsNotApplyEmission} from "../../api/emissionresource.js";
import {NTag} from "naive-ui";

const data = ref([])
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
                    type: 'error'
                },
                {
                    default: () => '审核中'
                }
            )
        }
    }

])
const enterpriseName = JSON.parse(localStorage.getItem("user")).nickName

getEnterpriseIsNotApplyEmission({
    page: paginationReactive.page,
    pageSize: paginationReactive.pageSize,
    enterprise: enterpriseName
}).then(res => {
    if (res.total != 0){
        data.value = res.rows
    }
    window.$message.success(res.msg)
})




</script>

<style lang="less" scoped>
.n-space {
  height: 460px;
}
</style>
