<template>
  <n-space vertical :size="12">
    <n-data-table
        :bordered="false"
        :columns="columns"
        :data="data"
    />
  </n-space>
</template>

<script setup>

const data = reactive( [
  {
    key: 0,
    name: '电冰箱碳排放申请表',
    time: '2023-7-19',
    tags: ['成功'],
    details: {
      // 添加详细信息数据
    }
  },
  {
    key: 1,
    name: '电风扇碳排放申请表',
    time: '2023-7-20',
    tags: ['失败'],
    details: {
      // 添加详细信息数据
    }
  },
  {
    key: 2,
    name: '电热水器碳排放申请表',
    time: '2023-7-23',
    tags: ['失败'],
    details: {
      // 添加详细信息数据
    }
  },
  {
    key: 3,
    name: '电视机碳排放申请表',
    time: '2023-7-22',
    tags: ['失败'],
    details: {
      // 添加详细信息数据
    }
  },
  {
    key: 4,
    name: '洗衣机碳排放申请表',
    time: '2023-7-25',
    tags: ['失败'],
    details: {
      // 添加详细信息数据
    }
  },
  {
    key: 5,
    name: '电脑碳排放申请表',
    time: '2023-7-24',
    tags: ['失败'],
    details: {
      // 添加详细信息数据
    }
  }
])
</script>

<style lang="less" scoped>
.n-space {
  height: 460px;
}
</style>
