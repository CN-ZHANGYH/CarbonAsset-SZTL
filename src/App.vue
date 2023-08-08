<template>
    <!-- 使用全局挂载消息组件-->
    <Message/>
    <RouterView></RouterView>
</template>

<script setup>
import Message from "./components/Util/Message.vue";
</script>

<style lang="less">
* {
  margin:0;
  padding: 0;
}
</style>
