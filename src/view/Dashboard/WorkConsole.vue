<template>
  <div class="WorkConsole">
<!--  导航栏  -->
    <n-card title="工作台">
      愿您在新的一天的工作中享受到无尽的快乐和满足，迎接每一个挑战并取得巨大成功
    </n-card>

<!--  便捷操作  -->
    <Icon/>

<!--  动态通知  -->
    <n-grid cols="2 s:1 m:1 l:2 xl:2 2xl:2" responsive="screen" :x-gap="12" :y-gap="9" class="notification">
      <n-gi>
        <n-card
            title="申请碳排放量数据报告进度"
        >
            <n-data-table
            :data="nsData"
            :columns="columns"
            >
            </n-data-table>
        </n-card>

      </n-gi>
      <n-gi style="grid-column: span 1;">
        <CarbonTrading/>
        <CarbonPicture/>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup>
import Icon from "../../components/Nav/Icon.vue"
import CarbonSchedule from "../../components/Work/CarbonTransaction.vue"
import CarbonTrading from "../../components/Work/CarbonTrading.vue";
import CarbonPicture from "../../components/Work/CarbonPicture.vue";
import {getEnterpriseInfo, getNoticeInfo} from "../../api/enterprise.js";


const nsData = ref([])
const enterprise = JSON.parse(localStorage.getItem("user")).nickName
const columns = reactive([
    {
        title: '事件',
        key: 'title'
    },
    {
        title: '执行记录',
        key: 'description'
    },
    {
        title: '消息',
        key: 'msg'
    },
    {
        title: '时间',
        key: 'noticeTime'
    }
])
getEnterpriseInfo({enterprise: enterprise}).then(res => {
    getNoticeInfo({id: res.enterprise.enterprise_id}).then(res => {
        nsData.value = res.nsData
    })
})
</script>

<style scoped lang='less'>
.n-card {
  margin-bottom: 20px;
}
.notification {
  margin-bottom: 60px;
}
</style>
