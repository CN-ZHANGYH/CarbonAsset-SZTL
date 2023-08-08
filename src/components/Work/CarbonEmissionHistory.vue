<script setup>
import {getEnterpriseEmissionList} from "../../api/emissionresource.js";
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


function search(){

}
</script>

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
        />
    </n-space>
</template>

<style scoped lang="less">
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

</style>
