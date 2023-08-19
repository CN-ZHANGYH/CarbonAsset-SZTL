<template>
  <n-card>
      <SellTrading style="height: 320px"/>
  </n-card>
</template>


<script lang="ts">
import SellTrading from "../../view/Dashboard/Chart/SellTrading.vue";
import {defineComponent, ref} from "vue";
export default defineComponent({
  components: {
    SellTrading
  },
  setup() {
    return {
      inverted: ref(false),

    }
  }
})
</script>

<style scoped lang='less'>
.n-card {
  height: 400px;
}
</style>
