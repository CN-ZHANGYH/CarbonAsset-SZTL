<template>
  <div style="height: 360px; position: relative">
    <n-layout position="absolute">
      <n-layout-header style="height: 64px;" bordered>
        <NavHead/>
      </n-layout-header>
      <n-layout has-sider position="absolute" class="container">
        <n-layout-sider
            show-trigger
            collapse-mode="width"
            :collapsed-width="64"
            :width="240"
            :native-scrollbar="false"
            :inverted="inverted"
            bordered content-style="padding-top:35%;">
          <NavLeft/>
        </n-layout-sider>
        <n-layout class="main">
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
