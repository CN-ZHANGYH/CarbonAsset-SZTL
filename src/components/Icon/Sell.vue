<template>
  <div class="light-green" @click="handleGridItemClick">
    <n-card hoverable>
      <span>
        <n-icon size="40" color="#FDB357">
          <server-sharp />
        </n-icon>
      </span>
      <p class="text-center">出售碳额度</p>
    </n-card>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router';
import {ServerSharp} from '@vicons/ionicons5'
const router = useRouter();
const handleGridItemClick = () => {
    window.$message.loading('正在前往出售碳额度场景');
    setTimeout(() => {
        router.push({ path: '/PersonalHome/SellingCarbon' });
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
