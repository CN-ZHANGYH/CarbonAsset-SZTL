<template>
  <div class="light-green" @click="handleGridItemClick">
    <n-card hoverable>
      <span>
        <n-icon size="40" color="#5CD578">
          <receipt-outline />
        </n-icon>
      </span>
      <p class="text-center">查看报告</p>
    </n-card>
  </div>
</template>


<script lang="ts">
import {defineComponent, ref} from "vue";
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router';
import { ReceiptOutline } from '@vicons/ionicons5'
export default defineComponent({
  components: {
    ReceiptOutline
  },
  setup() {
    const message = useMessage();
    const router = useRouter();
    const handleGridItemClick = () => {
      message.loading('前往查看碳报告');
      setTimeout(() => {
        router.push({ path: '/GenerateCarbon' });
      }, 5000);
    };
    return {
      inverted: ref(false),
      ReceiptOutline,
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
