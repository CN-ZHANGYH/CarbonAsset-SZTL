<template>
  <div class="light-green" @click="handleGridItemClick" >
    <n-card hoverable>
      <span>
        <n-icon size="40" color="#4488C6">
          <rocket-outline />
        </n-icon>
      </span>
      <p class="text-center">签到</p>
    </n-card>
  </div>
</template>


<script setup>
import {RocketOutline} from '@vicons/ionicons5'
import {addSign} from "../../api/enterprise.js";

const enterprise = JSON.parse(localStorage.getItem("user")).nickName
const handleGridItemClick = () => {
    addSign({enterprise: enterprise}).then(res => {
        window.$message.success(res.msg)
    })
};


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
