<script setup>
import {getEnterpriseEmissionList} from "../../api/emissionresource.js";

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
            key: "isApprove"
        },
        {
            title: "排放时间",
            key: "emissionTime"
        }
    ]
)
const nickName = JSON.parse(localStorage.getItem("user")).nickName
getEnterpriseEmissionList({enterprise: nickName}).then(res => {
    EmData.value = res.data
})
</script>

<template>
    <n-space vertical :size="12">
        <n-data-table
                :bordered="false"
                :columns="columns"
                :data="EmData"
        />
    </n-space>
</template>

<style scoped lang="less">

</style>
