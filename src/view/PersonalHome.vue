<template>
  <div style="height: 100vh; position: relative">
    <n-layout position="absolute">
      <n-layout-header bordered>
        <NavHead/>
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 75px; bottom: 64px;">
        <n-layout-sider
            bordered
            show-trigger
            collapse-mode="width"
            :collapsed-width="64"
            :width="240"
            :native-scrollbar="false"
            :inverted="inverted"
        >
          <NavLeft/>
        </n-layout-sider>
        <n-layout content-style="padding: 24px;background: #F2F5F8;" :native-scrollbar="false">
          <router-view></router-view>
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</template>

<script lang="ts">
import NavHead from "../components/Nav/NavHead.vue";
import NavLeft from "../components/Nav/NavLeft.vue";

import {defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    NavHead,
    NavLeft,
  },
  setup() {
    return {
      inverted: ref(false),
    }
  }
})
</script>

<style lang="less" scoped>
.n-layout .n-layout--absolute-positioned {
  height: 100vh;
}
</style>
