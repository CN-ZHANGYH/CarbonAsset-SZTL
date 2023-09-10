<template>
  <div class="light-green" @click="handleGridItemClick">
    <n-card hoverable>
            <span>
              <n-icon size="40" color="#817C77">
              <settings-outline />
            </n-icon>
            </span>
      <p class="text-center">个人设置</p>
    </n-card>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router';
import {SettingsOutline} from '@vicons/ionicons5'
const router = useRouter();
const handleGridItemClick = () => {
  window.$message.loading('正在前往个人设置中心');
  setTimeout(() => {
    router.push({ path: '/PersonalHome/InquireQualification' });
  }, 2000);
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
  border-radius: 15px;
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

