<template>
  <n-layout>
    <n-layout-header style="height: 64px;" bordered>
      <NavHead/>
    </n-layout-header>
    <n-layout has-sider>
      <n-layout-sider
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :native-scrollbar="false"
          :inverted="inverted"
          bordered content-style="padding-top:5%;">
        <NavLeft/>
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;background: #F2F5F8;">
        <router-view></router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
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
.n-layout {
  height: 100vh;
}
.main {
  padding-left: 45px;
  padding-right: 45px;
  padding-top: 5.5%;
  background: #F2F5F8;
}
</style>
