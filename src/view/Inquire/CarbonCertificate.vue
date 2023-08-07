<template>
  <n-grid x-gap="12" :cols="4">
    <n-gi>
      <n-card title="电冰箱">
        <div class="img">
          <img src="../../assets/img/carbon.png" class="carbon">
          <img src="../../assets/img/冰箱.png" class="tu">
        </div>
        <div class="tag">
          <n-tag type="success">
            碳标识
          </n-tag>
          <n-tag type="info">
            碳足迹认证
          </n-tag>
        </div>
        认证时间：2022-7-29
      </n-card>
    </n-gi>
    <n-gi>
      <n-card title="填写碳排放申请信息">
        <div class="center">
          <img src="../../assets/img/carbon.png" class="carbonimg">
          <p>申请认证成功则获取碳证书</p>
          <n-button>立即前往</n-button>
        </div>
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CheckmarkCircle } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      CheckmarkCircle
    }
  }
})
</script>

<style scoped lang="less">
.n-grid {
  height: 100vh;
}
.n-card {
  height: 300px;
}
.img {
  position: relative;
  .tu {
    height: 150px;
    width: 220px;
  }
  .carbon {
    position: absolute;
    top: 0;
    left: 0;
    height: 60px;
    width: 60px;
  }
}
.tag {
  margin-top: 10px;
  margin-bottom: 5px;
  .n-tag {
    margin-right: 8px;
  }
}
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  .carbonimg {
    height: 100px;
    width: 100px;
    margin-bottom: 20px
  }
  p {
    margin-bottom: 10px;
  }
}
</style>
