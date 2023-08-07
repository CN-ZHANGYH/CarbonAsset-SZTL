<template>
  <n-card>您所在的碳积分排名：2</n-card>
  <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :bordered="false"
  />
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { NButton, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import StepForm from "../Form/stepForm/stepForm.vue";

type Song = {
  no: number
  title: string
  length: string
}

const createColumns = ({
                         play
                       }: {
  play: (row: Song) => void
}): DataTableColumns<Song> => {
  return [
    {
      title: '排名',
      key: 'number'
    },
    {
      title: '企业名称',
      key: 'name'
    },
    {
      title: '企业地址',
      key: 'address'
    },
    {
      title:'碳积分',
      key: 'carbon'
    },
  ]
}

const data: Song[] = [
  { number: 1, name: '企业名称xxx', address: '00xxxxxxaasdasdadaskl1111',carbon:'100' },
  { number: 2, name: "企业名称xxx", address: '00xxxxxxaasdasdadaskl1111',carbon:'88' },
  { number: 3, name: '企业名称xxx', address: '00xxxxxxaasdasdadaskl1111',carbon:'77' }
]

export default defineComponent({
  components: {StepForm},
  setup () {
    const message = useMessage()
    return {
      data,
      columns: createColumns({
        play (row: Song) {
          // message.info(`Play ${row.title}`)
        }
      }),
    }
  }
})
</script>

<style lang="less" scoped>
.n-card {
  margin-bottom: 10px;
}
</style>
