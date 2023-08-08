<template>
  <n-card title="出售碳资产">
    <n-data-table
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :bordered="false"
    />
  </n-card>
</template>

<script setup>

</script>

<style lang="less" scoped>
.n-card {
  height: 100vh;
  margin-bottom: 80px;
}
</style>
