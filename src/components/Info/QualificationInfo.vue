<script setup>
const props = defineProps({
    qualification: Object
})

const {qualification} = toRefs(props)
</script>

<!--资质详细组件-->
<template>
    <n-descriptions label-placement="left" bordered column="1">
        <n-descriptions-item label="企业名称">
            {{qualification.qualificationName}}
        </n-descriptions-item>
        <n-descriptions-item label="社会信用代码">
            {{qualification.qualificationContent}}
        </n-descriptions-item>
        <n-descriptions-item label="企业公司地址">
            {{qualification.qualificationAddress}}
        </n-descriptions-item>
        <n-descriptions-item label="所属行业">
            {{qualification.qualificationIndustry}}
        </n-descriptions-item>
        <n-descriptions-item label="联系人">
            {{qualification.qualificationUserName}}
        </n-descriptions-item>
        <n-descriptions-item label="联系邮箱">
            {{qualification.qualificationUserEmail}}
        </n-descriptions-item>
        <n-descriptions-item label="碳额度">
            <n-tag type="info">{{qualification.qualificationEmissionLimit}}</n-tag>
        </n-descriptions-item>
        <n-descriptions-item label="上传时间">
            {{qualification.qualificationUploadTime}}
        </n-descriptions-item>
        <n-descriptions-item label="审核时间">
            {{qualification.qualificationAuditTime}}
            <n-tag v-if='qualification.qualificationAuditTime == null' type="error">暂未审核</n-tag>
        </n-descriptions-item>
        <n-descriptions-item label="监管机构地址">
            <n-tag type="success" strong v-if="qualification.qualificationVerifiedRegulator != '暂未认证'">{{qualification.qualificationVerifiedRegulator}}</n-tag>
            <n-tag type="error" strong v-if="qualification.qualificationVerifiedRegulator === '暂未认证'">{{qualification.qualificationVerifiedRegulator}}</n-tag>
        </n-descriptions-item>
        <n-descriptions-item label="资质图片">
            <img :src="qualification.qualificationUrl" alt="" style="width: 100px;height: 100px;">
        </n-descriptions-item>
    </n-descriptions>
</template>

<style scoped lang="less">

</style>
