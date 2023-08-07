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


<script lang="ts">
import {defineComponent, ref} from "vue";
import { useMessage } from 'naive-ui'
import {RocketOutline
} from '@vicons/ionicons5'
export default defineComponent({
  components: {
    RocketOutline
  },
  setup() {
    const message = useMessage();
    const handleGridItemClick = () => {
      message.success('签到成功！');
      message.success('当前积分为：999！');
      message.warning('签到已成功，请勿再次点击');
    };
    return {
      inverted: ref(false),
      RocketOutline,
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
