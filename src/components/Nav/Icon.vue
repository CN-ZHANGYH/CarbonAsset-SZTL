<template>
    <!--  便捷操作  -->
    <n-grid cols="1 s:2 m:3 l:8 xl:8 2xl:8" responsive="screen" :x-gap="16" :y-gap="8">
<!--  签到   -->
      <n-grid-item>
        <SignIn/>
      </n-grid-item>
<!--   企业资质   -->
      <n-grid-item>
        <Firm/>
      </n-grid-item>

<!--   查看报告  -->
      <n-grid-item>
        <Write/>
      </n-grid-item>

<!--   出售碳额度   -->
      <n-grid-item>
        <Sell/>
      </n-grid-item>

<!--   购买碳额度   -->
      <n-grid-item>
        <Buy/>
      </n-grid-item>

<!--  碳排放记录    -->
      <n-grid-item>
        <Record/>
      </n-grid-item>

<!--  排行榜   -->
      <n-grid-item>
        <Leaderboard/>
      </n-grid-item>
<!--  个人设置    -->
      <n-grid-item>
        <Settings/>

      </n-grid-item>
    </n-grid>
</template>

<script lang="ts">
import SignIn from "../Icon/SignIn.vue";
import Firm from "../Icon/Firm.vue";
import Write from "../Icon/Write.vue";
import Sell from "../Icon/Sell.vue";
import Buy from "../Icon/Buy.vue";
import Record from "../Icon/Record.vue";
import Leaderboard from "../Icon/Leaderboard.vue";
import Settings from "../Icon/Settings.vue";

import {defineComponent, ref} from "vue";
import {DesktopOutline,SettingsOutline,
} from '@vicons/ionicons5'

export default defineComponent({
  components: {
    DesktopOutline,
    SettingsOutline,
    SignIn,Firm,Write,Sell,Buy,Record,Leaderboard,Settings
  },
  setup() {
    const handleGridItemClick = () => {
      // 处理n-grid的点击事件
      console.log("n-grid被点击了！");
      // 进行其他操作
    };
    return {
      inverted: ref(false),
      DesktopOutline,
      SettingsOutline,
      handleGridItemClick
    }
  }
})
</script>

<style scoped lang='less'>
.n-card  {
  height: 108px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  margin-bottom: 20px;
  span{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text-center {
    margin-top: 10px; /* 调整图片与文字之间的垂直间距 */
  }
}
</style>
