<template>
  <div class="light-green" @click="handleGridItemClick">
    <n-card hoverable>
      <span>
        <n-icon size="40" color="#FF374C">
          <ribbon-outline />
        </n-icon>
      </span>
      <p class="text-center">排行榜</p>
    </n-card>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router';
import {RibbonOutline} from '@vicons/ionicons5'
const router = useRouter();
const handleGridItemClick = () => {
    window.$message.loading('正在前往排行榜');
    setTimeout(() => {
        router.push({ path: '/InquireQualification' });
    }, 5000);
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
