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
            style="height: 200px"
            >
            </n-data-table>
          <n-card style="margin-top: 2%">
            <h4>碳排放申请进度:</h4>
            <n-progress
                type="line"
                :percentage="applyProgress"
                :height="30"
                :indicator-placement="'inside'"
                processing
                style="margin-bottom: 20px"
                :color="themeVars.errorColor"
                :rail-color="changeColor(themeVars.errorColor, { alpha: 0.2 })"
            />
            <h4>碳额度出售进度:</h4>
            <n-progress
                type="line"
                :percentage="sellerProgress"
                :height="30"
                :indicator-placement="'inside'"
                processing
                style="margin-bottom: 20px"
                :color="themeVars.successColor"
                :rail-color="changeColor(themeVars.successColor, { alpha: 0.2 })"
            />
            <h4>完成碳排放进度:</h4>
            <n-progress
                type="line"
                :percentage="overProgress"
                :height="30"
                :indicator-placement="'inside'"
                processing
                style="margin-bottom: 20px"
                :color="themeVars.infoColor"
                :rail-color="changeColor(themeVars.infoColor, { alpha: 0.2 })"
            />
          </n-card>
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
import CarbonTrading from "../../components/Work/CarbonTrading.vue";
import CarbonPicture from "../../components/Work/CarbonPicture.vue";
import {getEnterpriseInfo, getNoticeInfo} from "../../api/enterprise.js";
import {getOwnerWorkProgress} from "../../api/data.js";
import {useThemeVars} from 'naive-ui'
import { changeColor } from "seemly";

const themeVars = useThemeVars()
const applyProgress = ref(0)
const sellerProgress = ref(0)
const overProgress = ref(0)
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

getOwnerWorkProgress({enterprise:enterprise}).then(res => {
  applyProgress.value = res.data[0]
  sellerProgress.value = res.data[1]
  overProgress.value = res.data[2]
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
